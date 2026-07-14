import { makeFunctionReference } from "convex/server";
import { getConvexClient } from "@/lib/convexServer";
import { QUESTIONS } from "@/lib/mckenzie";
import { INTELLIGENCES, INTELLIGENCES_BY_ID } from "@/lib/intelligences";
import { levelForScore, LEVEL_LABEL } from "@/lib/scoring";
import type { IntelligenceId } from "@/lib/intelligences";

/**
 * Exporta TODOS los resultados del test a un archivo CSV (abre en Excel).
 *
 * Protección: requiere la clave correcta en ?key=... comparada con la
 * variable de entorno EXPORT_SECRET (solo del servidor, nunca se expone).
 * Sin esa clave, responde 401. Así solo las autoras pueden descargar los
 * datos, aunque el resto de la web sea pública.
 *
 * Uso: /api/export?key=LA_CLAVE
 *
 * Formato: separado por punto y coma (;) para que Excel en español lo
 * abra ya acomodado en columnas.
 */
export async function GET(req: Request) {
  const secret = process.env.EXPORT_SECRET;
  const key = new URL(req.url).searchParams.get("key");

  if (!secret) {
    return new Response(
      "Exportación no configurada: falta la variable EXPORT_SECRET.",
      { status: 503 }
    );
  }
  if (key !== secret) {
    return new Response("No autorizado.", { status: 401 });
  }

  const client = getConvexClient();
  if (!client) {
    return new Response("Convex no está configurado.", { status: 503 });
  }

  let rows: Array<{
    scoresByIntelligence: Record<string, number>;
    dominant: string;
    dominantIds?: string[];
    answers?: Record<string, number>;
    createdAt: number;
  }>;
  try {
    rows = await client.query(
      makeFunctionReference<"query">("results:allResults"),
      {}
    );
  } catch (err) {
    console.error("[api/export] Error al leer de Convex:", err);
    return new Response("Error al leer los datos.", { status: 500 });
  }

  const SEP = ";";
  const nameOf = (id: string) =>
    INTELLIGENCES_BY_ID[id as IntelligenceId]?.name ?? id;

  // ----- Encabezados -----
  const header = [
    "N°",
    "fecha",
    "resultado (inteligencia dominante)",
    ...INTELLIGENCES.map((i) => `${i.name} (0-5)`),
    ...INTELLIGENCES.map((i) => `nivel ${i.name}`),
    ...QUESTIONS.map((q) => `P${q.id}`),
  ];

  // Escapa un valor para CSV con separador ';'.
  const escape = (val: string | number): string => {
    const s = String(val);
    return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  // Fecha legible en formato local (día/mes/año hora:min).
  const fmtDate = (ms: number) =>
    new Date(ms).toLocaleString("es-BO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const lines = [header.join(SEP)];
  rows.forEach((r, idx) => {
    // Resultado legible: nombre(s) de la(s) inteligencia(s) dominante(s).
    const domIds = r.dominantIds?.length ? r.dominantIds : [r.dominant];
    const resultado = domIds.map(nameOf).join(" / ");

    const cells: (string | number)[] = [
      idx + 1,
      fmtDate(r.createdAt),
      resultado,
      ...INTELLIGENCES.map((i) => r.scoresByIntelligence[i.id] ?? ""),
      ...INTELLIGENCES.map((i) => {
        const score = r.scoresByIntelligence[i.id];
        return typeof score === "number" ? LEVEL_LABEL[levelForScore(score)] : "";
      }),
      ...QUESTIONS.map((q) => {
        const a = r.answers?.[String(q.id)];
        // 1 = Verdadero, 0 = Falso (vacío si no se guardó).
        return a === undefined ? "" : a === 1 ? "V" : "F";
      }),
    ];
    lines.push(cells.map(escape).join(SEP));
  });

  // BOM para que Excel reconozca los acentos correctamente.
  const csv = "﻿" + lines.join("\r\n");
  const fecha = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="resultados-ecrire-${fecha}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
