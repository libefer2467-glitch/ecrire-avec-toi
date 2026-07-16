import { NextResponse } from "next/server";
import { makeFunctionReference } from "convex/server";
import { Resend } from "resend";
import { getConvexClient } from "@/lib/convexServer";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

const CONTACT_INBOX = "libe.fer2467@gmail.com";

/**
 * Recibe un mensaje del formulario de contacto.
 * Si Convex está configurado, lo guarda en la tabla contactMessages.
 * Si RESEND_API_KEY está configurada, además reenvía el mensaje por
 * correo a CONTACT_INBOX (best-effort: si falla, no rompe la respuesta).
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

  let stored = false;
  const client = getConvexClient();
  if (client) {
    try {
      await client.mutation(
        makeFunctionReference<"mutation">("contact:sendMessage"),
        { name, email, message }
      );
      stored = true;
    } catch (err) {
      console.error("[api/contact] Error al guardar en Convex:", err);
    }
  } else {
    console.log("[api/contact] Convex no configurado. Mensaje de:", name, email);
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Écrire avec toi <onboarding@resend.dev>",
        to: CONTACT_INBOX,
        replyTo: email,
        subject: `Nuevo mensaje de contacto — ${name}`,
        text: `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`,
      });
    } catch (err) {
      console.error("[api/contact] Error al enviar correo con Resend:", err);
    }
  }

  return NextResponse.json({ ok: true, stored });
}
