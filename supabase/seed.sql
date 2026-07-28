insert into public.categories (name, is_active)
values
  ('Café en Grains', true),
  ('Gelato Italiano', true),
  ('Tartes Glacées', true)
on conflict (name) do update set is_active = excluded.is_active;

insert into public.products (category, type, name, description, origin, price, image_url, is_active)
values
  ('Café en Grains', 'Spécial', 'Café Spécial', 'Blend signature Finjani Aroma, rond et aromatique, pensé pour une extraction riche en espresso.', 'Blend Maison', 34, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', true),
  ('Café en Grains', 'Moka', 'Café Moka', 'Profil fruité et cacao, inspiré des grands mokas, avec une finale élégante.', 'Éthiopie', 37, '/products/cafe-moka.jpg', true),
  ('Café en Grains', 'Arabia', 'Café Arabia', 'Grains délicats et parfumés pour une tasse soyeuse, notes florales et douceur équilibrée.', 'Arabia Blend', 46, '/products/cafe-arabia.jpg', true),
  ('Café en Grains', 'Marocain', 'Café Marocain', 'Recette inspirée du patrimoine marocain, épices fines et caractère chaleureux.', 'Maroc', 40, '/products/cafe-marocain.jpg', true),
  ('Café en Grains', 'Arabia Saoudia', 'Café Arabia Saoudia', 'Assemblage oriental premium aux notes de cardamome et safran, intense et raffiné.', 'Arabie Saoudite', 62, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80', true),
  ('Café en Grains', 'Chamia', 'Café Chamia', 'Sélection d''inspiration levantine, épicée et profonde, pour les amateurs de profils rares.', 'Levant', 94, '/products/cafe-chamia.jpg', true),
  ('Gelato Italiano', 'Vanille', 'Gelato Vanille', 'Vanille premium à texture dense et crémeuse, finition douce et élégante.', 'Atelier Finjani', 15, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80', true),
  ('Gelato Italiano', 'Pistache', 'Gelato Pistache', 'Pistache torréfiée au style italien, goût intense et texture veloutée.', 'Italie', 17, 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=80', true),
  ('Tartes Glacées', 'Chocolat', 'Tarte Glacée Chocolat', 'Cœur glacé chocolat noir et biscuit fin, finition premium signée Finjani.', 'Atelier Finjani', 140, 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80', true)
on conflict do nothing;
