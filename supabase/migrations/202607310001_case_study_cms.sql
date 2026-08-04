create extension if not exists pgcrypto;

create table if not exists public.cms_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  category text not null default '',
  year text not null default '',
  location text not null default '',
  summary text not null default '',
  brief_title text not null default '',
  brief_body text not null default '',
  overview_title text not null default '',
  overview_body text not null default '',
  scope text[] not null default '{}',
  theme text not null default 'default',
  status text not null default 'draft' check (status in ('draft', 'published')),
  hero_image_path text not null default '',
  gallery jsonb not null default '[]'::jsonb check (jsonb_typeof(gallery) = 'array'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists case_studies_status_idx on public.case_studies(status);
create index if not exists case_studies_updated_at_idx on public.case_studies(updated_at desc);

alter table public.cms_users enable row level security;
alter table public.case_studies enable row level security;

grant select on public.case_studies to anon;
grant select, insert, update, delete on public.case_studies to authenticated;
grant select on public.cms_users to authenticated;

create policy "Published case studies are public"
on public.case_studies for select
to anon
using (status = 'published');

create policy "Editors can view all case studies"
on public.case_studies for select
to authenticated
using (exists (
  select 1 from public.cms_users
  where cms_users.user_id = (select auth.uid())
));

create policy "Editors can create case studies"
on public.case_studies for insert
to authenticated
with check (exists (
  select 1 from public.cms_users
  where cms_users.user_id = (select auth.uid())
));

create policy "Editors can update case studies"
on public.case_studies for update
to authenticated
using (exists (
  select 1 from public.cms_users
  where cms_users.user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.cms_users
  where cms_users.user_id = (select auth.uid())
));

create policy "Editors can delete case studies"
on public.case_studies for delete
to authenticated
using (exists (
  select 1 from public.cms_users
  where cms_users.user_id = (select auth.uid())
));

create policy "Editors can see their membership"
on public.cms_users for select
to authenticated
using (user_id = (select auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'case-study-images',
  'case-study-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Editors can upload case study images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'case-study-images'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = (select auth.uid())
  )
);

create policy "Editors can update case study images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'case-study-images'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = (select auth.uid())
  )
)
with check (
  bucket_id = 'case-study-images'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = (select auth.uid())
  )
);

create policy "Editors can delete case study images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'case-study-images'
  and exists (
    select 1 from public.cms_users
    where cms_users.user_id = (select auth.uid())
  )
);
