create table if not exists blog_posts (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  excerpt text,
  cover_image text,
  content text,
  author text,
  category text,
  read_time text,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

alter table blog_posts enable row level security;

-- Allow public read access
create policy "Public Read" on blog_posts
  for select
  using (true);

-- Allow public insert/update (Note: For production, this should be restricted to authenticated admins)
create policy "Public Insert" on blog_posts
  for insert
  with check (true);

create policy "Public Update" on blog_posts
  for update
  using (true);
