create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('Café', 'Gelato', 'Tarte Glacée')),
  type text not null,
  name text not null,
  description text not null,
  origin text not null,
  price numeric(10,2) not null check (price > 0),
  image_url text not null,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Public can read products"
  on public.products
  for select
  using (true);
