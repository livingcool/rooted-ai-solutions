-- Enable RLS on documents table if not already enabled
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create a basic policy for documents table (allowing read access for now)
CREATE POLICY "Anyone can read documents" 
ON public.documents 
FOR SELECT 
USING (true);

-- Fix the function search path issue by recreating the function properly
-- First drop the trigger, then function, then recreate
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON public.contact_submissions;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate the trigger
CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();