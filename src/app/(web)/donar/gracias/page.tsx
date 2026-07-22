import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/web/ui";
import { Check, Heart } from "@/components/web/icons";
import { stripe } from "@/lib/stripe-server";

export const metadata: Metadata = {
  title: "Gracias por tu donativo",
  robots: { index: false },
};

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let paid = false;
  let amountLabel = "";
  let email: string | null = null;

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const s = await stripe.checkout.sessions.retrieve(session_id);
      paid = s.payment_status === "paid";
      email = s.customer_details?.email ?? null;
      if (s.amount_total != null) {
        amountLabel = (s.amount_total / 100).toLocaleString("es-ES", {
          style: "currency",
          currency: (s.currency ?? "eur").toUpperCase(),
        });
      }
    } catch {
      /* mostramos el mensaje neutro de abajo */
    }
  }

  return (
    <Section bg="linear-gradient(160deg,#FBF7F0,#F7F5F1)">
      <Container
        max={640}
        style={{ padding: "80px 28px", textAlign: "center" }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: paid ? "#E7F5E7" : "#F1F7FB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 22px",
          }}
        >
          {paid ? (
            <Check size={34} color="#2E7D1F" stroke={2.2} />
          ) : (
            <Heart size={32} color="#7BB8D9" stroke={2} />
          )}
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 40,
            lineHeight: 1.08,
            margin: "0 0 12px",
          }}
        >
          {paid ? "¡Gracias por tu donativo!" : "Gracias por tu interés"}
        </h1>

        <p
          style={{
            fontSize: 16.5,
            lineHeight: 1.65,
            color: "#6B7280",
            margin: "0 auto 26px",
            maxWidth: 480,
          }}
        >
          {paid ? (
            <>
              Hemos recibido tu aportación
              {amountLabel ? (
                <>
                  {" "}
                  de <strong style={{ color: "#12233F" }}>{amountLabel}</strong>
                </>
              ) : null}
              . Se destina íntegramente a la ayuda a las familias y a los más
              necesitados.
              {email ? ` Te hemos enviado el recibo a ${email}.` : ""}
            </>
          ) : (
            "Si querías completar un donativo y no llegó a procesarse, puedes intentarlo de nuevo cuando quieras. Gracias por acompañarnos."
          )}
        </p>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#12233F",
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            padding: "13px 26px",
            borderRadius: 999,
            textDecoration: "none",
          }}
        >
          Volver al inicio
        </Link>
      </Container>
    </Section>
  );
}
