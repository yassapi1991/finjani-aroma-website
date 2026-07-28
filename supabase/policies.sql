alter table public.categories enable row level security;
alter table public.products enable row level security;

-- Keep the script idempotent.
drop policy if exists categories_public_read_active on public.categories;
drop policy if exists categories_service_role_all on public.categories;
drop policy if exists products_public_read_active on public.products;
drop policy if exists products_service_role_all on public.products;

-- Public website can only read active categories/products.
create policy categories_public_read_active
  on public.categories
  for select
  to anon, authenticated
  using (is_active = true);

create policy products_public_read_active
  on public.products
  for select
  to anon, authenticated
  using (is_active = true);

-- Server-side API (service role key) can read/write everything.
create policy categories_service_role_all
  on public.categories
  for all
  to service_role
  using (true)
  with check (true);

create policy products_service_role_all
  on public.products
  for all
  to service_role
  using (true)
  with check (true);
