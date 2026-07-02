import type { Metadata } from "next";
import LegalShell from "@/components/web/LegalShell";

export const metadata: Metadata = { title: "Política de cookies" };

export default function CookiesPage() {
  return (
    <LegalShell title="Política de cookies">
      <p>
        Este sitio utiliza únicamente cookies técnicas necesarias para su
        funcionamiento. No empleamos cookies de publicidad ni de seguimiento de
        terceros.
      </p>
      <p>
        Si en el futuro se incorporan herramientas de analítica, se solicitará tu
        consentimiento previo mediante un banner de cookies conforme a la
        normativa vigente (LSSI-CE y RGPD).
      </p>
    </LegalShell>
  );
}
