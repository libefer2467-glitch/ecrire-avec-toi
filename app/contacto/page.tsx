"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactoPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <header className="text-center">
        <h1 className="font-display text-4xl font-black text-ink">Contacto</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          ¿Tienes dudas o comentarios sobre la plataforma? Escríbenos y te
          responderemos.
        </p>
      </header>

      {status === "ok" ? (
        <div className="mt-10 rounded-3xl border border-verde-ande/30 bg-verde-ande-soft p-8 text-center">
          <span className="text-4xl" aria-hidden="true">
            ✅
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold text-verde-ande">
            ¡Mensaje enviado!
          </h2>
          <p className="mt-2 text-ink-soft">
            Gracias por escribirnos. Hemos recibido tu consulta.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-5 rounded-full border border-line bg-paper px-6 py-2.5 font-semibold text-ink hover:bg-cream-2"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="mt-10 space-y-5 rounded-3xl border border-line bg-paper p-8 shadow-sm"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-ink">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={update("name")}
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none focus:border-terracota"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-ink">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={update("email")}
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none focus:border-terracota"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-ink">
              Mensaje
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={update("message")}
              className="mt-2 w-full resize-y rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none focus:border-terracota"
              placeholder="Escribe tu consulta…"
            />
          </div>

          {status === "error" && (
            <p className="rounded-xl bg-terracota/10 px-4 py-3 text-sm text-terracota-ink">
              No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-terracota px-6 py-3.5 font-semibold text-white shadow-md transition enabled:hover:bg-terracota-ink disabled:opacity-60"
          >
            {status === "sending" ? "Enviando…" : "Enviar mensaje"}
          </button>
        </form>
      )}
    </div>
  );
}
