"use client";

import { useState } from "react";
import Link from "next/link";
import { RadarChart, type RadarDatum } from "./RadarChart";

interface PerIntelligence {
  id: string;
  name: string;
  colorVar: string;
  avgRaw: number; // promedio 0-5
  avgPercentage: number; // 0-100
  dominantCount: number;
  dominantPct: number; // 0-100
  levels: { dominante: number; media: number; poca: number };
}

interface ReportData {
  total: number;
  perIntelligence: PerIntelligence[];
}

/**
 * Página protegida de reporte grupal (para la tesis): promedio del grupo
 * por inteligencia y cuántas personas quedaron dominantes en cada una.
 * Pensada para capturar (screenshot) y pegar en el documento de la tesis.
 */
export function ReportClient() {
  const [key, setKey] = useState("");
  const [data, setData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!key.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/report?key=${encodeURIComponent(key.trim())}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "No se pudo cargar el reporte.");
        setData(null);
        return;
      }
      setData(json as ReportData);
    } catch {
      setError("Error de conexión al cargar el reporte.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Pantalla de acceso ----------
  if (!data) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-line bg-paper p-8 shadow-sm">
          <h1 className="font-display text-2xl font-bold text-ink">
            Reporte grupal del test
          </h1>
          <p className="mt-3 text-sm text-ink-soft">
            Solo para las autoras. Ingresa la clave de exportación para ver el
            resumen de todos los tests: promedios y gráfico, listos para la
            tesis.
          </p>

          <label className="mt-6 block text-sm font-medium text-ink">
            Clave de exportación
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load()}
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none focus:border-terracota focus:ring-2 focus:ring-terracota/40"
              placeholder="••••••••"
              autoComplete="off"
            />
          </label>

          <button
            type="button"
            onClick={load}
            disabled={!key.trim() || loading}
            className="mt-6 w-full rounded-full bg-terracota px-6 py-3.5 font-semibold text-white shadow-md transition enabled:hover:bg-terracota-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Cargando…" : "Ver reporte →"}
          </button>

          {error && (
            <p className="mt-4 rounded-xl bg-terracota/10 px-4 py-3 text-sm text-terracota-ink">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ---------- Sin datos aún ----------
  if (data.total === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <span className="text-5xl" aria-hidden="true">
          📊
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">
          Todavía no hay resultados
        </h1>
        <p className="mt-3 text-ink-soft">
          El reporte se llena automáticamente a medida que las personas
          completan el test.
        </p>
      </div>
    );
  }

  const radarData: RadarDatum[] = data.perIntelligence.map((p) => ({
    label: p.name.split("-")[0],
    value: p.avgPercentage,
    colorVar: p.colorVar,
  }));

  const rankingByDominant = [...data.perIntelligence].sort(
    (a, b) => b.dominantCount - a.dominantCount
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12" id="reporte-tesis">
      <header className="text-center">
        <h1 className="font-display text-3xl font-black text-ink">
          Reporte grupal — Écrire avec toi
        </h1>
        <p className="mt-2 text-ink-soft">
          Participantes: <strong>{data.total}</strong> · Test de Inteligencias
          Múltiples (Verdadero/Falso, 40 ítems)
        </p>
      </header>

      {/* Radar del promedio del grupo */}
      <section className="mt-10 rounded-3xl border border-line bg-paper p-6 shadow-sm">
        <h2 className="mb-2 text-center font-display text-xl font-bold text-ink">
          Perfil promedio del grupo
        </h2>
        <p className="mb-4 text-center text-xs text-ink-soft">
          Promedio de cada inteligencia, normalizado a 0-100% (5/5 = 100%)
        </p>
        <RadarChart data={radarData} accentVar="var(--terracota)" />
      </section>

      {/* Barras: % dominante por inteligencia */}
      <section className="mt-8 rounded-3xl border border-line bg-paper p-6 shadow-sm">
        <h2 className="mb-4 font-display text-xl font-bold text-ink">
          % de participantes con esa inteligencia como dominante
        </h2>
        <ul className="space-y-3">
          {rankingByDominant.map((p) => (
            <li key={p.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{p.name}</span>
                <span className="font-semibold" style={{ color: p.colorVar }}>
                  {p.dominantCount} de {data.total} ({p.dominantPct}%)
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-cream-2">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${p.dominantPct}%`, backgroundColor: p.colorVar }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Tabla completa (promedio 0-5 y niveles) */}
      <section className="mt-8 overflow-x-auto rounded-3xl border border-line bg-paper p-6 shadow-sm">
        <h2 className="mb-4 font-display text-xl font-bold text-ink">
          Tabla completa por inteligencia
        </h2>
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-ink-soft">
              <th className="py-2 pr-3 font-semibold">Inteligencia</th>
              <th className="py-2 pr-3 font-semibold">Promedio (0-5)</th>
              <th className="py-2 pr-3 font-semibold">Promedio %</th>
              <th className="py-2 pr-3 font-semibold">Dominante</th>
              <th className="py-2 pr-3 font-semibold">Medio</th>
              <th className="py-2 pr-3 font-semibold">Poco desarrollada</th>
            </tr>
          </thead>
          <tbody>
            {data.perIntelligence.map((p) => (
              <tr key={p.id} className="border-b border-line/60">
                <td className="py-2 pr-3 font-medium text-ink">{p.name}</td>
                <td className="py-2 pr-3 text-ink-soft">{p.avgRaw} / 5</td>
                <td className="py-2 pr-3 text-ink-soft">{p.avgPercentage}%</td>
                <td className="py-2 pr-3 text-ink-soft">{p.levels.dominante}</td>
                <td className="py-2 pr-3 text-ink-soft">{p.levels.media}</td>
                <td className="py-2 pr-3 text-ink-soft">{p.levels.poca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-6 text-center text-xs text-ink-soft">
        Consejo: usa la captura de pantalla de esta página (o cada sección) para
        pegarla en el documento de la tesis.
      </p>

      <p className="mt-2 text-center text-xs text-ink-soft">
        ¿Necesitas los datos individuales (por persona)?{" "}
        <Link href="/exportar" className="font-semibold text-terracota-ink hover:underline">
          Descargar Excel →
        </Link>
      </p>
    </div>
  );
}
