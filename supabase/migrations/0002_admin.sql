-- =====================================================================
-- Iglesia Cuerpo de Cristo — Panel admin (Fase 3)
-- Da acceso de lectura/escritura a los usuarios autenticados.
-- Los usuarios admin se crean manualmente en Supabase → Authentication → Users
-- (no hay registro público en la web).
-- =====================================================================

-- Novedades: admin (authenticated) gestiona todo
drop policy if exists "novedades_admin_all" on public.novedades;
create policy "novedades_admin_all" on public.novedades
  for all to authenticated using (true) with check (true);

-- Eventos: admin gestiona todo
drop policy if exists "events_admin_all" on public.events;
create policy "events_admin_all" on public.events
  for all to authenticated using (true) with check (true);

-- Bandeja de solicitudes: admin puede leer
drop policy if exists "contact_admin_read" on public.contact_messages;
create policy "contact_admin_read" on public.contact_messages
  for select to authenticated using (true);

drop policy if exists "food_admin_read" on public.food_requests;
create policy "food_admin_read" on public.food_requests
  for select to authenticated using (true);

drop policy if exists "sponsorship_admin_read" on public.sponsorship_requests;
create policy "sponsorship_admin_read" on public.sponsorship_requests
  for select to authenticated using (true);
