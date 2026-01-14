
-- Create table for subscribers if not exists
create table if not exists newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  active boolean default true,
  created_at timestamptz default now()
);

-- Establish the webhook/trigger to call the edge function on new post
-- Note: In Supabase Dashboard, you typically set up a Database Webhook.
-- SQL-based triggers for HTTP calls (pg_net) exist but often UI is preferred.
-- However, for completeness, we can define the detailed trigger logic if pg_net is available,
-- OR simply rely on the existence of the table and the User manually connecting the Webhook in the Dashboard.
-- I will create the table here. Connection usually requires dashboard for "Edge Function Webhooks".
