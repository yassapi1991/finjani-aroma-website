create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  type text not null,
  name text not null,
  description text not null,
  origin text not null,
  price numeric(10,2) not null check (price > 0),
  image_url text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_category_fk
    foreign key (category)
    references public.categories(name)
    on update cascade
    on delete restrict
);

create index if not exists categories_is_active_idx on public.categories(is_active);
create index if not exists products_category_idx on public.products(category);
create index if not exists products_is_active_idx on public.products(is_active);
create index if not exists products_created_at_idx on public.products(created_at desc);

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
before update on public.categories
for each row
execute function public.set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

alter table public.products enable row level security;
alter table public.categories enable row level security;

create policy "Public can read products"
  on public.products
  for select
  using (true);

create policy "Public can read categories"
  on public.categories
  for select
  using (true);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;
