-- Add resume_text column to applications table
ALTER TABLE public.applications 
ADD COLUMN resume_text TEXT;

-- Comment for documentation
COMMENT ON COLUMN public.applications.resume_text IS 'Extracted text content from the resume PDF/Doc';
