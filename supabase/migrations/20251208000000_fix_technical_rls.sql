-- Allow public (anon) users to insert into technical_assessments
-- This is required because candidates are authenticated via a custom flow (access code) 
-- and interact with Supabase as 'anon' users.

DROP POLICY IF EXISTS "Candidates can submit technical assessments" ON "public"."technical_assessments";

CREATE POLICY "Candidates can submit technical assessments"
ON "public"."technical_assessments"
FOR INSERT
TO anon
WITH CHECK (true);

-- Also allow them to update their own submission if needed (optional, but good for retries)
-- For now, just INSERT is critical based on the error.
