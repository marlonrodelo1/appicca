import Stripe from "stripe";

// Cliente de Stripe para el servidor. La clave secreta NUNCA sale de aquí:
// vive solo en variables de entorno (STRIPE_SECRET_KEY), nunca en el frontend.
if (!process.env.STRIPE_SECRET_KEY) {
  // No lanzamos en import para no romper el build si aún no está la env;
  // las rutas devolverán un 500 controlado si falta.
  console.warn("[stripe] Falta STRIPE_SECRET_KEY en el entorno.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
