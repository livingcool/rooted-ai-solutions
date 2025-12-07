-- Allow public read access to applications (needed for candidate login/interview page)
-- Note: In a production environment with high security needs, consider using an Edge Function 
-- to fetch data with validation instead of exposing the table directly.
CREATE POLICY "Public can view applications" 
ON public.applications FOR SELECT 
USING (true);

-- Allow public read access to interviews
CREATE POLICY "Public can view interviews" 
ON public.interviews FOR SELECT 
USING (true);
