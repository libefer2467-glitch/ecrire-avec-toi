import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INTELLIGENCES, getIntelligenceBySlug } from "@/lib/intelligences";
import { VideoEmbed } from "@/components/VideoEmbed";

export function generateStaticParams() {
  return INTELLIGENCES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const intel = getIntelligenceBySlug(slug);
  if (!intel) return { title: "Inteligencia no encontrada" };
  return {
    title: `Inteligencia ${intel.name}`,
    description: intel.description,
  };
}

export default async function IntelligenceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const intel = getIntelligenceBySlug(slug);
  if (!intel) notFound();

  return (
    <article className="pb-16">
      {/* ===== Header con color de la inteligencia ===== */}
      <header style={{ backgroundColor: intel.colorVar }} className="text-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <Link
            href="/inteligencias"
            className="text-sm font-medium text-white/90 hover:text-white"
          >
            ← Todas las inteligencias
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-5xl" aria-hidden="true">
              {intel.emoji}
            </span>
            <div>
              <h1 className="font-display text-4xl font-black md:text-5xl">
                {intel.name}
              </h1>
              <p className="mt-1 text-white/90">{intel.tagline}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4">
        {/* Intro */}
        <section className="mt-10 rounded-2xl border border-line bg-paper p-6 shadow-sm">
          <p className="text-lg text-ink">{intel.description}</p>
          <p className="mt-3 text-ink-soft">{intel.content.intro}</p>
        </section>

        {/* Video */}
        <section className="mt-10">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            Video explicativo
          </h2>
          <VideoEmbed
            url={intel.content.videoUrl}
            title={intel.name}
            accentVar={intel.colorVar}
          />
        </section>

        {/* Estrategias */}
        <section className="mt-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            Estrategias de escritura en francés
          </h2>
          <div className="grid gap-4">
            {intel.content.strategies.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line bg-paper p-6 shadow-sm"
                style={{ borderLeftWidth: 5, borderLeftColor: intel.colorVar }}
              >
                <h3 className="font-display text-lg font-bold" style={{ color: intel.inkVar }}>
                  {s.title}
                </h3>
                <p className="mt-2 text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Descargas */}
        <section className="mt-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            Descargas
          </h2>
          <ul className="space-y-3">
            {intel.content.downloads.map((d, i) => (
              <li key={i}>
                <a
                  href={d.href}
                  className="flex items-center justify-between rounded-2xl border border-line bg-paper p-4 shadow-sm transition hover:bg-cream-2"
                  {...(d.href === "#" ? { "aria-disabled": true } : { download: true })}
                >
                  <span className="flex items-center gap-3 font-medium text-ink">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
                      style={{ backgroundColor: intel.softVar, color: intel.inkVar }}
                      aria-hidden="true"
                    >
                      📄
                    </span>
                    {d.label}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: intel.inkVar }}>
                    {d.href === "#" ? "Próximamente" : "Descargar"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA final */}
        <section
          className="mt-14 rounded-3xl p-8 text-center"
          style={{ backgroundColor: intel.softVar }}
        >
          <h2 className="font-display text-2xl font-bold" style={{ color: intel.inkVar }}>
            ¿No sabes cuál es tu inteligencia dominante?
          </h2>
          <p className="mt-2 text-ink-soft">
            Haz el test y descubre tu perfil completo en pocos minutos.
          </p>
          <Link
            href="/test"
            className="mt-5 inline-block rounded-full px-7 py-3.5 font-semibold text-white shadow-md transition hover:opacity-90"
            style={{ backgroundColor: intel.inkVar }}
          >
            Hacer el test →
          </Link>
        </section>
      </div>
    </article>
  );
}
