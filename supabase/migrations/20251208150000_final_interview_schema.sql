-- Create Final Interviews table
CREATE TABLE IF NOT EXISTS public.final_interviews (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id uuid REFERENCES public.applications(id) ON DELETE CASCADE,
    
    -- Scheduling
    interview_token text UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
    scheduled_at timestamptz,
    status text DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed', 'Analyzed', 'Offer', 'Rejected')),
    
    -- AI Context
    project_questions jsonb, -- AI generated questions based on tech submission
    
    -- AI Results
    transcript text,
    ai_confidence_score numeric,
    ai_role_fit_score numeric,
    ai_feedback text,
    ai_recommendation text CHECK (ai_recommendation IN ('Strong Hire', 'Hire', 'No Hire')),
    
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.final_interviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Candidates can view their own final interview"
    ON public.final_interviews FOR SELECT
    USING (application_id IN (
        SELECT id FROM public.applications WHERE email = auth.jwt() ->> 'email'
    ));

CREATE POLICY "Admins can view all final interviews"
    ON public.final_interviews FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- Create Bucket for Video Recordings
INSERT INTO storage.buckets (id, name, public) 
VALUES ('final-interviews', 'final-interviews', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Candidates can upload final interview video"
    ON storage.objects FOR INSERT
    WITH CHECK ( bucket_id = 'final-interviews' );
