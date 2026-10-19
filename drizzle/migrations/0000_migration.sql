create type public.app_role as enum ('admin', 'editor');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.is_editor(_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role in ('admin','editor'))
$$;

create policy "Users see own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create or replace function public.claim_first_admin()
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then return false; end if;
  if exists (select 1 from public.user_roles) then
    return public.is_editor(auth.uid());
  end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin');
  return true;
end $$;
revoke execute on function public.claim_first_admin() from anon, public;
grant execute on function public.claim_first_admin() to authenticated;

create type public.post_category as enum ('news', 'event', 'report', 'press');

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category public.post_category not null default 'news',
  title_it text not null,
  title_uk text not null default '',
  title_en text,
  excerpt_it text not null default '',
  excerpt_uk text not null default '',
  excerpt_en text,
  body_it text not null default '',
  body_uk text not null default '',
  body_en text,
  cover_url text,
  event_date date,
  event_time text,
  location text,
  map_url text,
  registration_url text,
  published boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.posts to anon;
grant select, insert, update, delete on public.posts to authenticated;
grant all on public.posts to service_role;
alter table public.posts enable row level security;
create policy "Public reads published posts" on public.posts for select to anon, authenticated using (published = true);
create policy "Editors read all posts" on public.posts for select to authenticated using (public.is_editor(auth.uid()));
create policy "Editors insert posts" on public.posts for insert to authenticated with check (public.is_editor(auth.uid()));
create policy "Editors update posts" on public.posts for update to authenticated using (public.is_editor(auth.uid())) with check (public.is_editor(auth.uid()));
create policy "Editors delete posts" on public.posts for delete to authenticated using (public.is_editor(auth.uid()));

create or replace function public.touch_updated_at() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;
create trigger posts_touch before update on public.posts for each row execute function public.touch_updated_at();

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('contact','volunteer','member','partner','newsletter')),
  name text check (name is null or char_length(name) <= 200),
  email text not null check (char_length(email) between 3 and 255),
  phone text check (phone is null or char_length(phone) <= 50),
  message text check (message is null or char_length(message) <= 5000),
  locale text,
  consent boolean not null,
  created_at timestamptz not null default now()
);
grant insert on public.submissions to anon;
grant insert, select, delete on public.submissions to authenticated;
grant all on public.submissions to service_role;
alter table public.submissions enable row level security;
create policy "Anyone submits with consent" on public.submissions for insert to anon, authenticated with check (consent = true);
create policy "Editors read submissions" on public.submissions for select to authenticated using (public.is_editor(auth.uid()));
create policy "Editors delete submissions" on public.submissions for delete to authenticated using (public.is_editor(auth.uid()));

create policy "Editors read post images" on storage.objects for select to authenticated using (bucket_id = 'post-images' and public.is_editor(auth.uid()));
create policy "Editors upload post images" on storage.objects for insert to authenticated with check (bucket_id = 'post-images' and public.is_editor(auth.uid()));
create policy "Editors update post images" on storage.objects for update to authenticated using (bucket_id = 'post-images' and public.is_editor(auth.uid()));
create policy "Editors delete post images" on storage.objects for delete to authenticated using (bucket_id = 'post-images' and public.is_editor(auth.uid()));

