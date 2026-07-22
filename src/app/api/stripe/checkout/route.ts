import type { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe-server";

// Importe mínimo/máximo aceptado (en euros) para evitar valores absurdos.
const MIN_EUR = 1;
const MAX_EUR = 5000;

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json(
      { error: "Pagos no configurados todavía." },
      { status: 500 },
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const euros = Number(body?.amount);
    const motivo: string =
      typeof body?.motivo === "string" && body.motivo.trim()
        ? body.motivo.trim().slice(0, 120)
        : "Donativo general";

    if (!Number.isFinite(euros) || euros < MIN_EUR || euros > MAX_EUR) {
      return Response.json(
        { error: `Introduce un importe entre ${MIN_EUR} y ${MAX_EUR} €.` },
        { status: 400 },
      );
    }

    const origin =
      req.headers.get("origin") ?? new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      submit_type: "donate",
      // Pide el nombre del donante (opcional), ademas del correo.
      name_collection: {
        individual: { enabled: true, optional: true },
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(euros * 100),
            product_data: {
              name: "Donativo · Iglesia Cuerpo de Cristo",
              description: motivo,
            },
          },
        },
      ],
      // Al completar el pago, Stripe redirige la ventana a la página de gracias.
      return_url: `${origin}/donar/gracias?session_id={CHECKOUT_SESSION_ID}`,
      metadata: { motivo },
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("[stripe] checkout error", err);
    return Response.json(
      { error: "No se pudo iniciar el pago. Inténtalo de nuevo." },
      { status: 500 },
    );
  }
}
