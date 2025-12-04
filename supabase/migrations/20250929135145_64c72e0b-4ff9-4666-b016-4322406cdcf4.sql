-- Fix security vulnerability: Remove public access to documents table
-- and restrict to authenticated users only

-- Drop the existing insecure policy that allows public read access
DROP POLICY IF EXISTS "Anyone can read documents" ON public.documents;

-- Create a new secure policy that requires authentication
CREATE POLICY "Only authenticated users can read documents" 
ON public.documents 
FOR SELECT 
TO authenticated
USING (auth.uid() IS NOT NULL);

-- If documents should be admin-only instead, use this alternative:
-- CREATE POLICY "Only admins can read documents" 
-- ON public.documents 
-- FOR SELECT 
-- TO authenticated
-- USING (public.has_role(auth.uid(), 'admin'));