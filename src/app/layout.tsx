import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cuerpodecristoacentejo.com"),
  title: {
    default: "Iglesia Cristiana Cuerpo de Cristo · Tenerife",
    template: "%s · Cuerpo de Cristo",
  },
  description:
    "Iglesia cristiana en Tenerife, parte de la ONG Remar. Cultos, evangelización, reparto de alimentos y entrega de víveres cada domingo. Dona por Bizum y ayúdanos a llevar esperanza.",
  keywords: [
    "iglesia cristiana Tenerife",
    "Cuerpo de Cristo",
    "Remar Canarias",
    "reparto de alimentos",
    "donar Bizum ONG",
    "evangelización Tenerife",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    title: "Iglesia Cristiana Cuerpo de Cristo · Tenerife",
    description:
      "Fe que se convierte en ayuda real. Cultos, acción social y reparto de alimentos en Tenerife, junto a la ONG Remar.",
    siteName: "Cuerpo de Cristo",
    images: [
      {
        url: "/logo.png",
        width: 1000,
        height: 500,
        alt: "Iglesia Cristiana Cuerpo de Cristo · Tenerife",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iglesia Cristiana Cuerpo de Cristo · Tenerife",
    description:
      "Fe que se convierte en ayuda real. Cultos, acción social y reparto de alimentos en Tenerife, junto a la ONG Remar.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#C8A96E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
