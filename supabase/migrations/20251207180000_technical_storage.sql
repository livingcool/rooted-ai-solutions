-- Create storage bucket for technical submissions
INSERT INTO storage.buckets (id, name, public)
VALUES ('technical-submissions', 'technical-submissions', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: Public can upload technical submissions
DROP POLICY IF EXISTS "Public can upload technical submissions" ON storage.objects;
CREATE POLICY "Public can upload technical submissions"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'technical-submissions' );

-- Policy: Admins can view technical submissions
DROP POLICY IF EXISTS "Admins can view technical submissions" ON storage.objects;
CREATE POLICY "Admins can view technical submissions"
ON storage.objects FOR SELECT
USING ( bucket_id = 'technical-submissions' AND public.has_role(auth.uid(), 'admin') );
