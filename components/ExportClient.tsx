"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Formulario mínimo para descargar los resultados del test en CSV (Excel).
 * Pide la clave de exportación y la envía al endpoint /api/export, que la
 * valida en el servidor. La clave NO se guarda en ningún lado del cliente.
 */
export function ExportClient() {
  const [key, setKey] = useState("");

  const download = () => {
    if (!key.trim()) return;
    // El navegador descarga el archivo gracias a la cabecera del endpoint.
    window.location.href = `/api/export?key=${encodeURIComponent(key.trim())}`;
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-3xl border border-line bg-paper p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-ink">
          Descargar resultados del test
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
          Solo para las autoras. Ingresa la clave de exportación para descargar
          todas las respuestas (anónimas) en un archivo que abre en Excel.
        </p>

        <label className="mt-6 block text-sm font-medium text-ink">
          Clave de exportación
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && download()}
            className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none focus:border-terracota focus:ring-2 focus:ring-terracota/40"
            placeholder="••••••••"
            autoComplete="off"
          />
        </label>

        <button
          type="button"
          onClick={download}
          disabled={!key.trim()}
          className="mt-6 w-full rounded-full bg-terracota px-6 py-3.5 font-semibold text-white shadow-md transition enabled:hover:bg-terracota-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          Descargar CSV (Excel) ↓
        </button>

        <p className="mt-4 text-xs text-ink-soft">
          Si la clave es incorrecta verás un mensaje &ldquo;No autorizado&rdquo;.
          El archivo incluye una fila por cada persona que completó el test, con
          la fecha, su inteligencia dominante, los puntajes y las 40 respuestas.
        </p>

        <p className="mt-3 text-center text-xs text-ink-soft">
          ¿Buscas promedios y gráficos para la tesis?{" "}
          <Link href="/reporte" className="font-semibold text-terracota-ink hover:underline">
            Ver reporte grupal →
          </Link>
        </p>
      </div>
    </div>
  );
}
