import type { Metadata } from "next";
import Link from "next/link";
import { INTELLIGENCES } from "@/lib/intelligences";

export const metadata: Metadata = {
  title: "Las 8 Inteligencias",
  description:
    "Explora las ocho inteligencias múltiples de Howard Gardner y sus estrategias de escritura en francés.",
};

export default function IntelligencesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-black text-ink">
          Las 8 Inteligencias Múltiples
        </h1>
        <p className="mt-4 text-ink-soft">
          Según Howard Gardner, todos poseemos las ocho inteligencias en distinta
          medida. Descubre las estrategias de escritura en francés diseñadas para
          cada una.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {INTELLIGENCES.map((intel) => (
          <Link
            key={intel.id}
            href={`/inteligencias/${intel.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div
              className="flex items-center gap-3 px-6 py-5"
              style={{ backgroundColor: intel.softVar }}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-sm"
                style={{ backgroundColor: intel.colorVar }}
              >
                {intel.emoji}
              </span>
              <div>
                <h2 className="font-display text-lg font-bold" style={{ color: intel.inkVar }}>
                  {intel.name}
                </h2>
                <p className="text-xs font-medium text-ink-soft">{intel.tagline}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="flex-1 text-sm text-ink-soft">{intel.description}</p>
              <span
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold group-hover:underline"
                style={{ color: intel.inkVar }}
              >
                Ver estrategias →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
