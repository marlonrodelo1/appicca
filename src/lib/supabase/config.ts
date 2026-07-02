// URL y clave PÚBLICA (publishable) de Supabase.
// La publishable key está pensada para ir en el navegador: no es un secreto.
// Se puede sobrescribir con variables de entorno (p. ej. desde Doppler).
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://rhnrybjrjwscuywrabun.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_i8B2NnG7F64LZyTISFUaWg_UdzE2LQR";
