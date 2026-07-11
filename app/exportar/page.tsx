import type { Metadata } from "next";
import { ExportClient } from "@/components/ExportClient";

// Página privada de descarga: no debe aparecer en buscadores.
export const metadata: Metadata = {
  title: "Descargar resultados",
  robots: { index: false, follow: false },
};

export default function ExportarPage() {
  return <ExportClient />;
}
