-- Add expires_at column to final_interviews
ALTER TABLE public.final_interviews 
ADD COLUMN IF NOT EXISTS expires_at timestamptz;

-- Comment
COMMENT ON COLUMN public.final_interviews.expires_at IS 'Timestamp when the interview link becomes invalid.';
