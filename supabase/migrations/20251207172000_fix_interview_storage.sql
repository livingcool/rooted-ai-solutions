-- Ensure interview-recordings bucket exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('interview-recordings', 'interview-recordings', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Ensure interviews table exists
CREATE TABLE IF NOT EXISTS public.interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    transcription TEXT,
    ai_score INTEGER,
    ai_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- Policies for interviews table
DROP POLICY IF EXISTS "Public can insert interviews" ON public.interviews;
CREATE POLICY "Public can insert interviews" ON public.interviews FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view interviews" ON public.interviews;
CREATE POLICY "Admins can view interviews" ON public.interviews FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Storage policies for interview-recordings
DROP POLICY IF EXISTS "Public can upload interview recordings" ON storage.objects;
CREATE POLICY "Public can upload interview recordings"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'interview-recordings' );

DROP POLICY IF EXISTS "Public can view interview recordings" ON storage.objects;
CREATE POLICY "Public can view interview recordings"
ON storage.objects FOR SELECT
USING ( bucket_id = 'interview-recordings' );
