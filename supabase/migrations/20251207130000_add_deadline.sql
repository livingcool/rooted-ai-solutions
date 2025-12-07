-- Add communication_deadline to applications table
ALTER TABLE public.applications 
ADD COLUMN IF NOT EXISTS communication_deadline TIMESTAMP WITH TIME ZONE;
