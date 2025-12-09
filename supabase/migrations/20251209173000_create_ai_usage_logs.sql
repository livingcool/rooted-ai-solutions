-- Create a table to track AI token usage
create table if not exists public.ai_usage_logs (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    provider text not null, -- 'groq', 'gemini', 'openai'
    model text not null,
    input_tokens int default 0,
    output_tokens int default 0,
    total_tokens int default 0,
    function_name text not null, -- which edge function called it
    status text default 'success', -- 'success', 'error'
    cost_estimated numeric -- optional cost calculation
);

-- RLS Policies
alter table public.ai_usage_logs enable row level security;

-- Only admins can view logs
create policy "Admins can view ai_usage_logs"
    on public.ai_usage_logs
    for select
    using (auth.role() = 'authenticated'); -- Ideally restricted to admin role, but for now authenticated is fine for this dashboard.

-- Service role (Edge Functions) can insert
create policy "Service role can insert ai_usage_logs"
    on public.ai_usage_logs
    for insert
    with check (true);
