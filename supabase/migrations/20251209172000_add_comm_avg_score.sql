-- Add communication_average_score column to applications table
-- This stores the calculated average across all interview responses

ALTER TABLE public.applications
ADD COLUMN IF NOT EXISTS communication_average_score INTEGER;

COMMENT ON COLUMN public.applications.communication_average_score IS 'Average communication score (0-100) across all interview questions. Used for admin review and decision-making.';

-- Create index for efficient filtering/sorting by score
CREATE INDEX IF NOT EXISTS applications_comm_avg_score_idx ON public.applications(communication_average_score);
