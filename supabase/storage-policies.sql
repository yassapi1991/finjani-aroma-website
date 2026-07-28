-- Storage RLS for product images.
drop policy if exists product_images_public_read on storage.objects;
drop policy if exists product_images_service_role_insert on storage.objects;
drop policy if exists product_images_service_role_update on storage.objects;
drop policy if exists product_images_service_role_delete on storage.objects;

create policy product_images_public_read
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'product-images');

create policy product_images_service_role_insert
  on storage.objects
  for insert
  to service_role
  with check (bucket_id = 'product-images');

create policy product_images_service_role_update
  on storage.objects
  for update
  to service_role
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');

create policy product_images_service_role_delete
  on storage.objects
  for delete
  to service_role
  using (bucket_id = 'product-images');
