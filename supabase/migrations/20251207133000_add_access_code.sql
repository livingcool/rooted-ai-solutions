-- Add access_code to applications table
ALTER TABLE public.applications 
ADD COLUMN IF NOT EXISTS access_code TEXT;
