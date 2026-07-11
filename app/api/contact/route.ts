import { NextResponse } from "next/server";
import { makeFunctionReference } from "convex/server";
import { getConvexClient } from "@/lib/convexServer";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

/**
 * Recibe un mensaje del formulario de contacto.
 * Si Convex está configurado, lo guarda en la tabla contactMessages;
 * si no, lo registra en el log del servidor. (Sin envío de correo:
 * las autoras leen las consultas desde el panel de Convex.)
 */
export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "missing fields" },
      { status: 400 }
    );
  }

  const client = getConvexClient();
  if (client) {
    try {
      await client.mutation(
        makeFunctionReference<"mutation">("contact:sendMessage"),
        { name, email, message }
      );
      return NextResponse.json({ ok: true, stored: true });
    } catch (err) {
      console.error("[api/contact] Error al guardar en Convex:", err);
      return NextResponse.json({ ok: true, stored: false });
    }
  }

  console.log("[api/contact] Convex no configurado. Mensaje de:", name, email);
  return NextResponse.json({ ok: true, stored: false });
}
