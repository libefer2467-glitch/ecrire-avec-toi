import { NextResponse } from "next/server";
import { makeFunctionReference } from "convex/server";
import { getConvexClient } from "@/lib/convexServer";
import { INTELLIGENCES } from "@/lib/intelligences";
import { MAX_SCORE_PER_INTELLIGENCE } from "@/lib/mckenzie";

/**
 * Devuelve las estadísticas grupales del test (para el reporte de la tesis).
 * Misma protección que /api/export: requiere ?key=EXPORT_SECRET.
 */
export async function GET(req: Request) {
  const secret = process.env.EXPORT_SECRET;
  const key = new URL(req.url).searchParams.get("key");

  if (!secret) {
    return NextResponse.json(
      { error: "Reporte no configurado: falta EXPORT_SECRET." },
      { status: 503 }
    );
  }
  if (key !== secret) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const client = getConvexClient();
  if (!client) {
    return NextResponse.json({ error: "Convex no está configurado." }, { status: 503 });
  }

  let stats: {
    total: number;
    sums: Record<string, number>;
    dominantCount: Record<string, number>;
    levelCounts: Record<string, { dominante: number; media: number; poca: number }>;
  };
  try {
    stats = await client.query(
      makeFunctionReference<"query">("results:groupStats"),
      {}
    );
  } catch (err) {
    console.error("[api/report] Error al leer de Convex:", err);
    return NextResponse.json({ error: "Error al leer los datos." }, { status: 500 });
  }

  const perIntelligence = INTELLIGENCES.map((intel) => {
    const sum = stats.sums[intel.id] ?? 0;
    const avgRaw = stats.total > 0 ? sum / stats.total : 0;
    const avgPercentage =
      stats.total > 0
        ? Math.round((avgRaw / MAX_SCORE_PER_INTELLIGENCE) * 100)
        : 0;
    const levels = stats.levelCounts[intel.id] ?? { dominante: 0, media: 0, poca: 0 };
    const dominantCount = stats.dominantCount[intel.id] ?? 0;
    const dominantPct =
      stats.total > 0 ? Math.round((dominantCount / stats.total) * 100) : 0;
    return {
      id: intel.id,
      name: intel.name,
      colorVar: intel.colorVar,
      avgRaw: Math.round(avgRaw * 10) / 10,
      avgPercentage,
      dominantCount,
      dominantPct,
      levels,
    };
  });

  return NextResponse.json(
    { total: stats.total, perIntelligence },
    { headers: { "Cache-Control": "no-store" } }
  );
}
