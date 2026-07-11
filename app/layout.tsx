import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Écrire avec toi — Escritura en francés e Inteligencias Múltiples",
    template: "%s · Écrire avec toi",
  },
  description:
    "Plataforma educativa para estudiantes de francés que aplica la teoría de las Inteligencias Múltiples de Howard Gardner a la producción escrita. Universidad Mayor de San Simón (UMSS).",
  authors: [{ name: "Libertad Fernández" }, { name: "María Cruz Quiroz" }],
  keywords: [
    "inteligencias múltiples",
    "francés",
    "escritura",
    "Howard Gardner",
    "UMSS",
    "estrategias didácticas",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:bg-azul-noche focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
