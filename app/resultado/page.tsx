"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RadarChart, type RadarDatum } from "@/components/RadarChart";
import {
  INTELLIGENCES,
  INTELLIGENCES_BY_ID,
  type IntelligenceId,
} from "@/lib/intelligences";
import { MAX_SCORE_PER_INTELLIGENCE } from "@/lib/mckenzie";
import { RESULT_STORAGE_KEY } from "@/lib/resultStorage";
import type { StoredResult } from "@/lib/scoring";

export default function ResultPage() {
  const [result, setResult] = useState<StoredResult | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(RESULT_STORAGE_KEY);
      if (raw) setResult(JSON.parse(raw) as StoredResult);
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const downloadPdf = async () => {
    if (!pdfRef.current) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        backgroundColor: "#fbf6ec",
        ignoreElements: (el) => el.classList.contains("no-pdf"),
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 48;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 24;
      pdf.addImage(imgData, "PNG", 24, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 48;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 24;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 24, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      const filenameName = result?.name
        ? result.name.trim().toLowerCase().replace(/\s+/g, "-")
        : "resultado";
      pdf.save(`inteligencias-multiples-${filenameName}.pdf`);
    } catch {
      /* si falla, no rompemos la página */
    } finally {
      setDownloading(false);
    }
  };

  // Sin resultado guardado
  if (loaded && !result) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <span className="text-5xl" aria-hidden="true">
          🧭
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink">
          Aún no tienes un resultado
        </h1>
        <p className="mt-3 text-ink-soft">
          Realiza el test para descubrir tu perfil de inteligencias múltiples y
          tus estrategias de escritura en francés.
        </p>
        <Link
          href="/test"
          className="mt-6 inline-block rounded-full bg-terracota px-7 py-3.5 font-semibold text-white shadow-md hover:bg-terracota-ink"
        >
          Hacer el test →
        </Link>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center text-ink-soft">
        Cargando tu resultado…
      </div>
    );
  }

  const dominant = INTELLIGENCES_BY_ID[result.dominant];

  const radarData: RadarDatum[] = INTELLIGENCES.map((intel) => ({
    label: intel.shortName,
    value: Math.round(
      (result.scoresByIntelligence[intel.id] / MAX_SCORE_PER_INTELLIGENCE) * 100
    ),
    colorVar: intel.colorVar,
  }));

  // Ranking ordenado desc
  const ranking = INTELLIGENCES.map((intel) => ({
    intel,
    raw: result.scoresByIntelligence[intel.id],
    pct: Math.round(
      (result.scoresByIntelligence[intel.id] / MAX_SCORE_PER_INTELLIGENCE) * 100
    ),
  })).sort((a, b) => b.raw - a.raw);

  const coDominant = result.dominantIds.filter(
    (id) => id !== result.dominant
  ) as IntelligenceId[];

  return (
    <div className="pb-16">
      <div ref={pdfRef}>
      {/* ====== Banda superior con color dominante ====== */}
      <section
        className="border-b border-line"
        style={{ backgroundColor: dominant.softVar }}
      >
        <div className="mx-auto max-w-4xl px-4 py-12 text-center">
          {result.name && (
            <p className="mb-1 text-sm font-medium text-ink-soft">
              Resultado de <span className="font-semibold text-ink">{result.name}</span>
            </p>
          )}
          <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: dominant.inkVar }}>
            Tu inteligencia dominante
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="text-5xl" aria-hidden="true">
              {dominant.emoji}
            </span>
            <h1
              className="font-display text-4xl font-black md:text-5xl"
              style={{ color: dominant.inkVar }}
            >
              {dominant.name}
            </h1>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            {dominant.description}
          </p>

          {coDominant.length > 0 && (
            <p className="mt-4 text-sm text-ink-soft">
              Empataste en el puntaje máximo con:{" "}
              {coDominant.map((id, i) => (
                <span key={id} className="font-semibold" style={{ color: INTELLIGENCES_BY_ID[id].inkVar }}>
                  {INTELLIGENCES_BY_ID[id].name}
                  {i < coDominant.length - 1 ? ", " : ""}
                </span>
              ))}
              .
            </p>
          )}

          <Link
            href={`/inteligencias/${dominant.slug}`}
            className="no-pdf mt-7 inline-block rounded-full px-7 py-3.5 font-semibold text-white shadow-md transition hover:opacity-90"
            style={{ backgroundColor: dominant.inkVar }}
          >
            Ver mis estrategias de escritura →
          </Link>
        </div>
      </section>

      {/* ====== Radar + ranking ====== */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Radar */}
          <div className="rounded-3xl border border-line bg-paper p-6 shadow-sm">
            <h2 className="mb-2 text-center font-display text-xl font-bold text-ink">
              Tu perfil completo
            </h2>
            <RadarChart data={radarData} accentVar={dominant.colorVar} />
          </div>

          {/* Ranking */}
          <div className="rounded-3xl border border-line bg-paper p-6 shadow-sm">
            <h2 className="mb-4 font-display text-xl font-bold text-ink">
              Distribución de tus inteligencias
            </h2>
            <ul className="space-y-3">
              {ranking.map(({ intel, raw, pct }, index) => (
                <li key={intel.id}>
                  <Link
                    href={`/inteligencias/${intel.slug}`}
                    className="block rounded-xl p-2 transition-colors hover:bg-cream-2"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium text-ink">
                        <span className="text-ink-soft">{index + 1}.</span>
                        {intel.emoji} {intel.name}
                      </span>
                      <span className="flex items-baseline gap-1.5">
                        <span className="text-xs text-ink-soft">
                          {raw}/{MAX_SCORE_PER_INTELLIGENCE}
                        </span>
                        <span className="font-semibold" style={{ color: intel.inkVar }}>
                          {pct}%
                        </span>
                      </span>
                    </div>
                    <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-cream-2">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: intel.colorVar }}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={downloadPdf}
            disabled={downloading}
            className="rounded-full bg-terracota px-6 py-3 font-semibold text-white shadow-md transition hover:bg-terracota-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            {downloading ? "Generando PDF…" : "⬇ Descargar mi resultado en PDF"}
          </button>
          <Link
            href="/inteligencias"
            className="rounded-full border border-line bg-paper px-6 py-3 font-semibold text-ink hover:bg-cream-2"
          >
            Ver todas las inteligencias
          </Link>
          <Link
            href="/test"
            className="rounded-full border border-line bg-paper px-6 py-3 font-semibold text-ink hover:bg-cream-2"
          >
            Repetir el test
          </Link>
        </div>
      </div>
    </div>
  );
}
