import { NextResponse } from "next/server";
import { makeFunctionReference } from "convex/server";
import { getConvexClient } from "@/lib/convexServer";

/**
 * Guarda un resultado anónimo del test.
 * Si Convex está configurado, lo persiste; si no, solo lo registra en
 * el log del servidor (la app funciona igual sin backend).
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const client = getConvexClient();
  if (client) {
    try {
      await client.mutation(
        makeFunctionReference<"mutation">("results:saveResult"),
        body as Record<string, unknown>
      );
      return NextResponse.json({ ok: true, stored: true });
    } catch (err) {
      console.error("[api/results] Error al guardar en Convex:", err);
      return NextResponse.json({ ok: true, stored: false });
    }
  }

  console.log("[api/results] Convex no configurado. Resultado anónimo recibido.");
  return NextResponse.json({ ok: true, stored: false });
}
