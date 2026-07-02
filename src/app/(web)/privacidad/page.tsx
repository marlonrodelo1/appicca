import type { Metadata } from "next";
import LegalShell from "@/components/web/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function PrivacidadPage() {
  return (
    <LegalShell title="Política de privacidad">
      <p>
        En la {site.legalName} tratamos los datos que nos facilitas a través de
        los formularios (contacto, solicitud de alimento o apadrinamiento) con la
        única finalidad de atender tu petición y ponernos en contacto contigo.
      </p>
      <p>
        No cedemos tus datos a terceros ajenos a la actividad de la iglesia y la
        red de Remar, salvo obligación legal. Puedes ejercer tus derechos de
        acceso, rectificación y supresión escribiendo a {site.email}.
      </p>
      <p>
        No publicamos imágenes ni datos de menores sin el consentimiento expreso
        de sus responsables legales.
      </p>
    </LegalShell>
  );
}
