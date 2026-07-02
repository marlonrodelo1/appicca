import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";
import { es } from "date-fns/locale";

/** Cliente público de solo lectura (sin cookies). Para datos públicos. */
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}

export type Evento = {
  dia: string;
  fecha: string;
  hora: string;
  titulo: string;
  lugar: string;
  modo: "presencial" | "online";
};

export type Novedad = {
  cat: string;
  fecha: string;
  titulo: string;
  extracto: string;
};

// ---- Datos de ejemplo (fallback si no hay Supabase o no hay filas) ----
export const SAMPLE_EVENTOS: Evento[] = [
  { dia: "JUE", fecha: "3 JUL", hora: "20:00", titulo: "Culto de oración", lugar: "Templo · La Cuesta", modo: "presencial" },
  { dia: "DOM", fecha: "6 JUL", hora: "11:30", titulo: "Escuela dominical y culto", lugar: "Templo · La Cuesta", modo: "presencial" },
  { dia: "DOM", fecha: "6 JUL", hora: "13:00", titulo: "Entrega de víveres", lugar: "Templo · La Cuesta", modo: "presencial" },
  { dia: "JUE", fecha: "10 JUL", hora: "20:00", titulo: "Culto de oración (en directo)", lugar: "Radio Solidaria Acentejo", modo: "online" },
  { dia: "SÁB", fecha: "12 JUL", hora: "10:00", titulo: "Salida de evangelización", lugar: "La Laguna, Tenerife", modo: "presencial" },
  { dia: "DOM", fecha: "13 JUL", hora: "11:30", titulo: "Culto dominical", lugar: "Templo · La Cuesta", modo: "presencial" },
  { dia: "SÁB", fecha: "19 JUL", hora: "10:00", titulo: "Evangelización por los pueblos", lugar: "Norte de Tenerife", modo: "presencial" },
  { dia: "DOM", fecha: "20 JUL", hora: "11:30", titulo: "Culto en directo", lugar: "Radio Solidaria Acentejo", modo: "online" },
];

export const SAMPLE_NOVEDADES: Novedad[] = [
  { cat: "Acción social", fecha: "28 JUN 2025", titulo: "Un domingo más repartiendo esperanza", extracto: "Decenas de familias del barrio recibieron su bolsa de mercado tras el culto dominical." },
  { cat: "Evangelización", fecha: "21 JUN 2025", titulo: "Salida de evangelización por el norte", extracto: "Visitamos varios pueblos, oramos por el lugar y compartimos el evangelio con los vecinos." },
  { cat: "Testimonio", fecha: "14 JUN 2025", titulo: "“Aquí encontré una familia”", extracto: "El testimonio de quien llegó buscando comida y encontró fe, apoyo y una comunidad." },
];

function up(s: string) {
  return s.replace(/\./g, "").toUpperCase();
}

/** Próximos eventos publicados. Cae a SAMPLE_EVENTOS si falla. */
export async function getEventos(): Promise<Evento[]> {
  try {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("events")
      .select("title, starts_at, location, mode")
      .eq("is_published", true)
      .order("starts_at", { ascending: true })
      .limit(20)
      .abortSignal(AbortSignal.timeout(4000));

    if (error || !data || data.length === 0) return SAMPLE_EVENTOS;

    return data.map((e) => {
      const d = new Date(e.starts_at as string);
      return {
        dia: up(format(d, "EEE", { locale: es })),
        fecha: `${format(d, "d", { locale: es })} ${up(format(d, "LLL", { locale: es }))}`,
        hora: format(d, "HH:mm"),
        titulo: e.title as string,
        lugar: (e.location as string) ?? "",
        modo: (e.mode as "presencial" | "online") ?? "presencial",
      };
    });
  } catch {
    return SAMPLE_EVENTOS;
  }
}

/** Últimas novedades publicadas. Cae a SAMPLE_NOVEDADES si falla. */
export async function getNovedades(limit = 3): Promise<Novedad[]> {
  try {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("novedades")
      .select("category, title, excerpt, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(limit)
      .abortSignal(AbortSignal.timeout(4000));

    if (error || !data || data.length === 0) return SAMPLE_NOVEDADES;

    return data.map((n) => ({
      cat: n.category as string,
      fecha: up(format(new Date(n.published_at as string), "d LLL yyyy", { locale: es })),
      titulo: n.title as string,
      extracto: (n.excerpt as string) ?? "",
    }));
  } catch {
    return SAMPLE_NOVEDADES;
  }
}
