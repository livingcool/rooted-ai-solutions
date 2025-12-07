-- Create technical_assessments table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.technical_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    project_description TEXT,
    deadline TIMESTAMP WITH TIME ZONE,
    video_url TEXT,
    github_url TEXT,
    issues_faced TEXT,
    tech_stack TEXT,
    process_flow TEXT,
    cost_analysis TEXT,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.technical_assessments ENABLE ROW LEVEL SECURITY;

-- Add technical_problem_statement to jobs table
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS technical_problem_statement TEXT;

-- Add new columns to technical_assessments table (idempotent)
ALTER TABLE public.technical_assessments 
ADD COLUMN IF NOT EXISTS improvement_suggestions TEXT,
ADD COLUMN IF NOT EXISTS ai_usage_analysis TEXT,
ADD COLUMN IF NOT EXISTS issues_faced TEXT,
ADD COLUMN IF NOT EXISTS tech_stack TEXT,
ADD COLUMN IF NOT EXISTS process_flow TEXT;

-- Policies (Drop first to avoid errors if they exist)
DROP POLICY IF EXISTS "Public can view technical assessments" ON public.technical_assessments;
CREATE POLICY "Public can view technical assessments" ON public.technical_assessments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can update technical assessments" ON public.technical_assessments;
CREATE POLICY "Public can update technical assessments" ON public.technical_assessments FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Admins can manage technical assessments" ON public.technical_assessments;
CREATE POLICY "Admins can manage technical assessments" ON public.technical_assessments FOR ALL USING (public.has_role(auth.uid(), 'admin'));
