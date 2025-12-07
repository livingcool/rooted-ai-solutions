-- Insert seed job
INSERT INTO public.jobs (title, description, requirements, type, location, is_active)
VALUES (
    'AI Automation Engineer – Intern/Junior',
    'Launch Your AI Career. Join our passionate team and grow with us as we transform businesses through intelligent automation.',
    ARRAY['Python', 'LangChain', 'Groq', 'PostgreSQL', 'Pinecone', 'Supabase'],
    'Full-time',
    'Remote / Hybrid',
    true
);
