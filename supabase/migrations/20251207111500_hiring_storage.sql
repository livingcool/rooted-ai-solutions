-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: Public can upload resumes
CREATE POLICY "Public can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'resumes' );

-- Policy: Admins can view resumes
CREATE POLICY "Admins can view resumes"
ON storage.objects FOR SELECT
USING ( bucket_id = 'resumes' AND public.has_role(auth.uid(), 'admin') );
