-- Add documentation_url column to technical_assessments table
-- Supports PDF, DOC, DOCX, PPT, PPTX formats

ALTER TABLE technical_assessments 
ADD COLUMN IF NOT EXISTS documentation_url TEXT;

COMMENT ON COLUMN technical_assessments.documentation_url IS 'Storage path for technical assessment documentation (PDF/DOC/PPT)';

-- Create storage bucket for technical documentation if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('technical-documentation', 'technical-documentation', false)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for technical-documentation bucket
CREATE POLICY "Authenticated users can upload documentation"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'technical-documentation');

CREATE POLICY "Admins can read all documentation"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'technical-documentation');

CREATE POLICY "Users can read their own documentation"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'technical-documentation');
