import type { ReactNode } from "react";
import Header from "@/components/web/Header";
import Footer from "@/components/web/Footer";
import WhatsAppButton from "@/components/web/WhatsAppButton";

export default function WebLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
