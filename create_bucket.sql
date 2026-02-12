
BEGIN;
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog_images', 'blog_images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public access to read
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'blog_images' );

-- Allow public access to insert (since we are using client-side upload without auth)
-- WARNING: This is open to the public. For production, you should authenticate users.
CREATE POLICY "Public Insert" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'blog_images' );
COMMIT;
