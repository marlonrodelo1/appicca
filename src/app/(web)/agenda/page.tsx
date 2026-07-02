import type { Metadata } from "next";
import { Section } from "@/components/web/ui";
import AgendaList from "@/components/web/AgendaList";
import { getEventos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Próximos cultos, salidas de evangelización y eventos de la Iglesia Cuerpo de Cristo en Tenerife.",
};

export const revalidate = 300;

export default async function AgendaPage() {
  const eventos = await getEventos();
  return (
    <Section bg="#FFFFFF">
      <AgendaList eventos={eventos} />
    </Section>
  );
}
