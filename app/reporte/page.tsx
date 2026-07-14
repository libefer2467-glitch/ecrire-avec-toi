import type { Metadata } from "next";
import { ReportClient } from "@/components/ReportClient";

// Página privada de reporte: no debe aparecer en buscadores.
export const metadata: Metadata = {
  title: "Reporte grupal",
  robots: { index: false, follow: false },
};

export default function ReportePage() {
  return <ReportClient />;
}
