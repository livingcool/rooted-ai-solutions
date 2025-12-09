-- Add missing columns to interviews table for enhanced communication assessment
-- Supports the refactored analyze-interview function with detailed scoring

-- Add status column to track interview processing state
ALTER TABLE public.interviews 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Pending';

-- Add communication-specific score (separate from ai_score which is overall)
ALTER TABLE public.interviews 
ADD COLUMN IF NOT EXISTS communication_score INTEGER;

-- Add detailed strengths array (JSON format)
ALTER TABLE public.interviews 
ADD COLUMN IF NOT EXISTS ai_strengths TEXT[];

-- Add detailed weaknesses array (JSON format)
ALTER TABLE public.interviews 
ADD COLUMN IF NOT EXISTS ai_weaknesses TEXT[];

-- Add comments
COMMENT ON COLUMN public.interviews.status IS 'Processing status: Pending, Analyzed, Requires Review';
COMMENT ON COLUMN public.interviews.communication_score IS 'Communication-specific score (0-100) for clarity, structure, confidence';
COMMENT ON COLUMN public.interviews.ai_strengths IS 'Array of identified communication strengths';
COMMENT ON COLUMN public.interviews.ai_weaknesses IS 'Array of identified areas for improvement';

-- Create index on status for efficient filtering
CREATE INDEX IF NOT EXISTS interviews_status_idx ON public.interviews(status);
