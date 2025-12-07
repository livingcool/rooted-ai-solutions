-- Create jobs table
CREATE TABLE public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[],
    type TEXT NOT NULL, -- Full-time, Part-time, etc.
    location TEXT NOT NULL, -- Remote, Hybrid, etc.
    salary_range TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on jobs
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Policies for jobs
CREATE POLICY "Public can view active jobs" 
ON public.jobs FOR SELECT 
USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage jobs" 
ON public.jobs FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Create applications table
CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    resume_url TEXT NOT NULL,
    cover_letter TEXT,
    portfolio_url TEXT,
    status TEXT DEFAULT 'Applied',
    ai_score INTEGER,
    ai_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on applications
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Policies for applications
CREATE POLICY "Public can submit applications" 
ON public.applications FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all applications" 
ON public.applications FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update applications" 
ON public.applications FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON public.applications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
