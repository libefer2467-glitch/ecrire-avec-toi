import { makeFunctionReference } from "convex/server";
import { getConvexClient } from "@/lib/convexServer";
import { QUESTIONS } from "@/lib/mckenzie";
import { INTELLIGENCES } from "@/lib/intelligences";

/**
 * Exporta TODOS los resultados del test a un archivo CSV (abre en Excel).
 *
 * Protección: requiere la clave correcta en ?key=... comparada con la
 * variable de entorno EXPORT_SECRET (solo del servidor, nunca se expone).
 * Sin esa clave, responde 401. Así solo las autoras pueden descargar los
 * datos, aunque el resto de la web sea pública.
 *
 * Uso: /api/export?key=LA_CLAVE
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

  // ----- Encabezados del CSV -----
  const header = [
    "fecha",
    "inteligencia_dominante",
    ...INTELLIGENCES.map((i) => `punt_${i.id}`),
    ...QUESTIONS.map((q) => `q${q.id}`),
  ];

  const escape = (val: string | number): string => {
    const s = String(val);
    // Encierra en comillas si contiene coma, comilla o salto de línea.
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const lines = [header.join(",")];
  for (const r of rows) {
    const cells: (string | number)[] = [
      new Date(r.createdAt).toISOString(),
      r.dominant,
      ...INTELLIGENCES.map((i) => r.scoresByIntelligence[i.id] ?? ""),
      ...QUESTIONS.map((q) => r.answers?.[String(q.id)] ?? ""),
    ];
    lines.push(cells.map(escape).join(","));
  }

  // BOM (﻿) para que Excel reconozca los acentos correctamente.
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
