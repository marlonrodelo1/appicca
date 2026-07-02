import type { Metadata } from "next";
import LegalShell from "@/components/web/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Aviso legal" };

export default function AvisoLegalPage() {
  return (
    <LegalShell title="Aviso legal">
      <p>
        Este sitio web pertenece a la {site.legalName}, entidad religiosa sin
        ánimo de lucro con sede en Tenerife (Islas Canarias), en alianza con la
        ONG Remar.
      </p>
      <p>
        El acceso y uso de este sitio implica la aceptación de las presentes
        condiciones. Los contenidos tienen carácter informativo y divulgativo de
        las actividades de la iglesia.
      </p>
      <p>
        Para cualquier cuestión relacionada con este aviso, puedes escribir a{" "}
        {site.email}.
      </p>
    </LegalShell>
  );
}
