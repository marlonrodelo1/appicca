// Datos de la iglesia. Edita aquí cuando tengas los valores reales
// (código Bizum, teléfono, dirección, redes).
export const site = {
  name: "Cuerpo de Cristo",
  legalName: "Iglesia Cristiana Cuerpo de Cristo",
  tagline: "Iglesia Cristiana · Remar",
  location: "Templo · La Cuesta, Tenerife (Islas Canarias)",
  bizumCode: "14506",
  phone: "+34 000 000 000",
  whatsapp: "34619038221",
  email: "info@cuerpodecristo.es",
  radioUrl: "https://www.youtube.com/@RadioSolidariaAcentejo",
  radioName: "Radio Solidaria Acentejo",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=La+Cuesta+Tenerife",
  social: {
    facebook: "#",
    instagram: "#",
  },
  schedule: {
    thursday: "Jueves · 20:00 — Culto de oración",
    sunday: "Domingos · 11:30 — Escuela dominical y culto",
    viveres: "Domingos · Entrega de víveres",
    evangelizacion: "Sábados · Evangelización",
  },
} as const;

export const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/actividades", label: "Qué hacemos" },
  { href: "/accion-social", label: "Acción social" },
  { href: "/agenda", label: "Agenda" },
  { href: "/contacto", label: "Contacto" },
] as const;
