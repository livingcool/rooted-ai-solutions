-- Create technical_assessments table
CREATE TABLE IF NOT EXISTS public.technical_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    project_description TEXT NOT NULL,
    deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    video_url TEXT,
    github_url TEXT,
    issues_faced TEXT,
    tech_stack TEXT,
    process_flow TEXT,
    cost_analysis TEXT,
    status TEXT DEFAULT 'Pending', -- Pending, Submitted, Reviewed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.technical_assessments ENABLE ROW LEVEL SECURITY;

-- Policies
-- Public (candidates) can view their own assessment (via ID or access code logic in Edge Function, but for now allow public read if they have ID)
-- Actually, we need to allow them to UPDATE it when submitting.
-- And allow them to SELECT it to see the project description.

CREATE POLICY "Public can view technical assessments" 
ON public.technical_assessments FOR SELECT 
USING (true);

CREATE POLICY "Public can update technical assessments" 
ON public.technical_assessments FOR UPDATE 
USING (true);

CREATE POLICY "Admins can manage technical assessments" 
ON public.technical_assessments FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_technical_assessments_updated_at
    BEFORE UPDATE ON public.technical_assessments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
