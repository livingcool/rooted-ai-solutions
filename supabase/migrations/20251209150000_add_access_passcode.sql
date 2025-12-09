-- Add access_passcode column to final_interviews
ALTER TABLE public.final_interviews 
ADD COLUMN IF NOT EXISTS access_passcode text;

-- Comment
COMMENT ON COLUMN public.final_interviews.access_passcode IS 'Unique 8-char alphanumeric code for candidate login.';
