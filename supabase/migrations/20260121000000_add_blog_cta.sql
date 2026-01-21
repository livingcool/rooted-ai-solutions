-- Add CTA fields to blog_posts
alter table blog_posts 
add column if not exists cta_title text,
add column if not exists cta_description text,
add column if not exists cta_button_text text,
add column if not exists cta_link text;
