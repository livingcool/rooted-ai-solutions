-- Allow public delete access
create policy "Public Delete" on blog_posts
  for delete
  using (true);
