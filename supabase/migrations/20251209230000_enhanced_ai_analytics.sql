-- Enhanced AI Usage Logging with Analytics Support
-- Adds metadata column for additional tracking data and creates analytics views

-- Add metadata column to ai_usage_logs for flexible data storage
ALTER TABLE ai_usage_logs
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS ai_usage_logs_function_name_idx ON ai_usage_logs(function_name);
CREATE INDEX IF NOT EXISTS ai_usage_logs_model_idx ON ai_usage_logs(model);
CREATE INDEX IF NOT EXISTS ai_usage_logs_created_at_idx ON ai_usage_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS ai_usage_logs_metadata_idx ON ai_usage_logs USING gin(metadata);

-- Create materialized view for daily usage aggregation
CREATE MATERIALIZED VIEW IF NOT EXISTS ai_usage_daily_summary AS
SELECT 
    DATE(created_at) as usage_date,
    provider,
    model,
    function_name,
    COUNT(*) as call_count,
    SUM(input_tokens) as total_input_tokens,
    SUM(output_tokens) as total_output_tokens,
    SUM(total_tokens) as total_tokens,
    COUNT(CASE WHEN status = 'success' THEN 1 END) as successful_calls,
    COUNT(CASE WHEN status = 'error' THEN 1 END) as failed_calls
FROM ai_usage_logs
GROUP BY DATE(created_at), provider, model, function_name;

-- Create unique index for refreshing materialized view
CREATE UNIQUE INDEX IF NOT EXISTS ai_usage_daily_summary_unique_idx 
ON ai_usage_daily_summary(usage_date, provider, model, function_name);

-- Create view for Whisper-specific metrics
CREATE OR REPLACE VIEW whisper_usage_summary AS
SELECT 
    DATE(created_at) as usage_date,
    model,
    function_name,
    COUNT(*) as transcription_count,
    SUM(input_tokens) as total_audio_seconds,
    SUM(output_tokens) as total_characters_transcribed,
    ROUND(AVG(input_tokens)::numeric, 2) as avg_audio_duration_seconds,
    ROUND(AVG(output_tokens)::numeric, 2) as avg_transcription_length
FROM ai_usage_logs
WHERE provider = 'groq' 
  AND model LIKE 'whisper%'
  AND metadata->>'type' = 'transcription'
GROUP BY DATE(created_at), model, function_name;

-- Create view for cost analysis (using current Groq pricing)
CREATE OR REPLACE VIEW ai_cost_analysis AS
SELECT 
    DATE(created_at) as usage_date,
    provider,
    model,
    function_name,
    COUNT(*) as api_calls,
    SUM(input_tokens) as input_tokens,
    SUM(output_tokens) as output_tokens,
    SUM(total_tokens) as total_tokens,
    -- Groq text pricing: $0.59 per 1M input, $0.79 per 1M output
    CASE 
        WHEN provider = 'groq' AND model NOT LIKE 'whisper%' THEN
            (SUM(input_tokens) * 0.59 / 1000000.0) + (SUM(output_tokens) * 0.79 / 1000000.0)
        -- Whisper pricing: $0.111 per hour = $0.00003083 per second
        WHEN provider = 'groq' AND model LIKE 'whisper%' THEN
            SUM(input_tokens) * 0.00003083
        ELSE 0
    END as estimated_cost_usd
FROM ai_usage_logs
GROUP BY DATE(created_at), provider, model, function_name;

-- Function to refresh daily summary (call this periodically)
CREATE OR REPLACE FUNCTION refresh_ai_usage_summary()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY ai_usage_daily_summary;
END;
$$ LANGUAGE plpgsql;

-- Create table for daily limit alerts
CREATE TABLE IF NOT EXISTS ai_usage_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    alert_type TEXT NOT NULL,  -- 'warning' | 'critical' | 'exceeded'
    model TEXT NOT NULL,
    current_usage BIGINT NOT NULL,
    limit_value BIGINT NOT NULL,
    usage_percentage NUMERIC(5,2) NOT NULL,
    alert_date DATE NOT NULL,
    acknowledged BOOLEAN DEFAULT FALSE,
    acknowledged_at TIMESTAMPTZ,
    acknowledged_by UUID REFERENCES auth.users(id)
);

-- Index for querying unacknowledged alerts
CREATE INDEX IF NOT EXISTS ai_usage_alerts_unack_idx 
ON ai_usage_alerts(alert_date DESC, acknowledged) 
WHERE NOT acknowledged;

-- Function to check and create alerts for daily limits
CREATE OR REPLACE FUNCTION check_daily_limits()
RETURNS TABLE(model TEXT, usage BIGINT, limit_value BIGINT, percentage NUMERIC) AS $$
DECLARE
    today DATE := CURRENT_DATE;
BEGIN
    -- Check Qwen model (500K tokens/day)
    RETURN QUERY
    SELECT 
        'qwen/qwen3-32b'::TEXT,
        COALESCE(SUM(total_tokens), 0)::BIGINT,
        500000::BIGINT,
        ROUND((COALESCE(SUM(total_tokens), 0) / 500000.0 * 100)::numeric, 2)
    FROM ai_usage_logs
    WHERE DATE(created_at) = today
      AND model = 'qwen/qwen3-32b';
    
    -- Check Whisper (28,800 seconds/day = 8 hours)
    RETURN QUERY
    SELECT 
        'whisper-large-v3'::TEXT,
        COALESCE(SUM(input_tokens), 0)::BIGINT,
        28800::BIGINT,
        ROUND((COALESCE(SUM(input_tokens), 0) / 28800.0 * 100)::numeric, 2)
    FROM ai_usage_logs
    WHERE DATE(created_at) = today
      AND model LIKE 'whisper%';
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE ai_usage_alerts IS 'Stores alerts when AI usage approaches or exceeds daily limits';
COMMENT ON FUNCTION check_daily_limits() IS 'Returns current usage vs limits for models with daily caps';
COMMENT ON FUNCTION refresh_ai_usage_summary() IS 'Refreshes the daily summary materialized view';
