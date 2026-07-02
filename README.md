# Iglesia Cristiana Cuerpo de Cristo — Web pública

Web pública de la Iglesia Cristiana Cuerpo de Cristo (Tenerife), parte de la ONG
Remar. Escaparate de actividades y acción social, con donación por **Bizum**,
agenda, novedades, formularios de contacto/alimento/apadrinamiento y un **panel
de administración**.

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Supabase (Postgres + Auth + RLS)
- Despliegue: Docker (output `standalone`) en Dokploy

## Estructura
- `src/app/(web)/` — sitio público (inicio, quiénes somos, actividades, acción
  social, donar, agenda, contacto, legales).
- `src/app/admin/` — panel de administración (login + gestión de novedades,
  eventos y bandeja de solicitudes).
- `src/lib/site.ts` — datos de la iglesia (Bizum, teléfono, dirección, redes).
  **Edita aquí los valores reales.**
- `src/lib/data.ts` — lectura de agenda y novedades desde Supabase (con datos de
  ejemplo como respaldo).
- `supabase/migrations/` — esquema de base de datos (ejecutar en orden).

## Variables de entorno
Crea `.env.local` (no se versiona):

```
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

## Desarrollo
```bash
npm install
npm run dev      # http://localhost:3000
```

## Base de datos (Supabase)
Ejecuta las migraciones en el SQL Editor de Supabase, en orden:
1. `supabase/migrations/0001_web_public.sql` — tablas, RLS y datos de ejemplo.
2. `supabase/migrations/0002_admin.sql` — permisos del panel admin.

Crea el usuario admin en **Authentication → Users → Add user**. Ese email y
contraseña son el acceso a `/admin`.

## Despliegue (Dokploy + Doppler)
Las variables `NEXT_PUBLIC_*` se incrustan en **build time**, por lo que deben
pasarse como **build args** al construir la imagen. El `Dockerfile` ya los
recibe (`ARG`/`ENV`).

En Dokploy:
1. Aplicación tipo **Dockerfile**, conectada a este repo de GitHub.
2. En **Build Args**, define:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Los valores se toman de **Doppler** (config de producción). Puedes:
   - Sincronizar Doppler → Dokploy (integración), o
   - Usar `doppler run -- docker build ...` en tu pipeline.

El contenedor arranca con `node server.js` en el puerto `3000`.
