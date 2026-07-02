-- =====================================================================
-- Iglesia Cuerpo de Cristo — Web pública (Fase 2)
-- Tablas para agenda, novedades y formularios, con RLS.
-- Ejecuta este archivo en el SQL Editor de Supabase (o vía MCP).
-- =====================================================================

-- ---------- EVENTOS (agenda) ----------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  location text,
  mode text not null default 'presencial' check (mode in ('presencial', 'online')),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

drop policy if exists "events_public_read" on public.events;
create policy "events_public_read" on public.events
  for select using (is_published = true);

-- ---------- NOVEDADES / testimonios ----------
create table if not exists public.novedades (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null,
  title text not null,
  excerpt text,
  body text,
  image_url text,
  published_at timestamptz not null default now(),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.novedades enable row level security;

drop policy if exists "novedades_public_read" on public.novedades;
create policy "novedades_public_read" on public.novedades
  for select using (is_published = true);

-- ---------- MENSAJES DE CONTACTO ----------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Cualquiera (anon) puede enviar; solo el admin (service role) lee.
drop policy if exists "contact_anon_insert" on public.contact_messages;
create policy "contact_anon_insert" on public.contact_messages
  for insert to anon, authenticated with check (true);

-- ---------- SOLICITUDES DE ALIMENTO ----------
create table if not exists public.food_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  code text not null,
  created_at timestamptz not null default now()
);

alter table public.food_requests enable row level security;

drop policy if exists "food_anon_insert" on public.food_requests;
create policy "food_anon_insert" on public.food_requests
  for insert to anon, authenticated with check (true);

-- ---------- SOLICITUDES DE APADRINAMIENTO ----------
create table if not exists public.sponsorship_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.sponsorship_requests enable row level security;

drop policy if exists "sponsorship_anon_insert" on public.sponsorship_requests;
create policy "sponsorship_anon_insert" on public.sponsorship_requests
  for insert to anon, authenticated with check (true);

-- =====================================================================
-- DATOS DE EJEMPLO (los mismos del diseño). Bórralos cuando cargues los reales.
-- =====================================================================

insert into public.events (title, starts_at, location, mode) values
  ('Culto de oración',              '2026-07-03 20:00:00+01', 'Templo · La Cuesta',       'presencial'),
  ('Escuela dominical y culto',     '2026-07-06 11:30:00+01', 'Templo · La Cuesta',       'presencial'),
  ('Entrega de víveres',            '2026-07-06 13:00:00+01', 'Templo · La Cuesta',       'presencial'),
  ('Culto de oración (en directo)', '2026-07-10 20:00:00+01', 'Radio Solidaria Acentejo', 'online'),
  ('Salida de evangelización',      '2026-07-12 10:00:00+01', 'La Laguna, Tenerife',      'presencial'),
  ('Culto dominical',               '2026-07-13 11:30:00+01', 'Templo · La Cuesta',       'presencial'),
  ('Evangelización por los pueblos','2026-07-19 10:00:00+01', 'Norte de Tenerife',        'presencial'),
  ('Culto en directo',              '2026-07-20 11:30:00+01', 'Radio Solidaria Acentejo', 'online')
on conflict do nothing;

insert into public.novedades (slug, category, title, excerpt, published_at) values
  ('un-domingo-mas-repartiendo-esperanza', 'Acción social', 'Un domingo más repartiendo esperanza',
   'Decenas de familias del barrio recibieron su bolsa de mercado tras el culto dominical.', '2025-06-28'),
  ('salida-evangelizacion-norte', 'Evangelización', 'Salida de evangelización por el norte',
   'Visitamos varios pueblos, oramos por el lugar y compartimos el evangelio con los vecinos.', '2025-06-21'),
  ('aqui-encontre-una-familia', 'Testimonio', '“Aquí encontré una familia”',
   'El testimonio de quien llegó buscando comida y encontró fe, apoyo y una comunidad.', '2025-06-14')
on conflict (slug) do nothing;
