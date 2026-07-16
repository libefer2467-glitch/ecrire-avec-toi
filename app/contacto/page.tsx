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

      <a
        href="https://wa.me/59160742801"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: "#25D366" }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 32 32" className="h-6 w-6 fill-white">
            <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.31.657 4.463 1.794 6.293L4 29l7.897-1.75A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75a9.7 9.7 0 0 1-4.95-1.357l-.355-.21-4.687 1.04 1.008-4.583-.232-.373A9.68 9.68 0 0 1 5.25 15c0-5.93 4.823-10.75 10.754-10.75S26.75 9.07 26.75 15 21.935 24.75 16.004 24.75Zm5.42-7.36c-.297-.148-1.755-.867-2.027-.966-.272-.099-.47-.148-.668.148-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.253-.462-2.386-1.472-.882-.787-1.478-1.76-1.651-2.057-.173-.297-.018-.457.13-.605.134-.133.297-.347.446-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.149-.668-1.611-.916-2.206-.241-.579-.486-.5-.668-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.478 0 1.462 1.065 2.874 1.213 3.072.148.198 2.096 3.2 5.078 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.755-.717 2.002-1.41.247-.693.247-1.287.173-1.41-.074-.124-.272-.198-.57-.347Z" />
          </svg>
        </span>
        <span>
          <span className="block font-display text-lg font-bold text-ink">
            Escríbenos por WhatsApp
          </span>
          <span className="block text-sm text-ink-soft">+591 6074 2801</span>
        </span>
        <span className="ml-auto shrink-0 text-sm font-semibold text-ink-soft">
          Abrir chat ↗
        </span>
      </a>

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
