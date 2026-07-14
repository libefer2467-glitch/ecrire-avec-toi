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
        {/* ===== Frases + perfil ===== */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Frases que te describen */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: intel.softVar }}
          >
            <h2
              className="mb-3 font-display text-lg font-bold"
              style={{ color: intel.inkVar }}
            >
              ¿Te suena familiar?
            </h2>
            <ul className="space-y-2.5">
              {intel.quotes.map((q, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink">
                  <span aria-hidden="true" style={{ color: intel.inkVar }}>
                    &ldquo;
                  </span>
                  <span className="italic">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Perfil */}
          <div className="rounded-2xl border border-line bg-paper p-6 shadow-sm">
            <p className="text-ink">{intel.content.profile}</p>
          </div>
        </section>

        {/* ===== Enfoque teórico ===== */}
        <section
          className="mt-8 rounded-2xl border-l-4 bg-paper p-6 shadow-sm"
          style={{ borderLeftColor: intel.colorVar }}
        >
          <h2
            className="font-display text-lg font-bold"
            style={{ color: intel.inkVar }}
          >
            {intel.content.approach.name}
          </h2>
          <p className="mt-2 text-ink-soft">{intel.content.approach.body}</p>
        </section>

        {/* ===== Los 7 tips ===== */}
        <section className="mt-12">
          <h2 className="mb-1 font-display text-2xl font-bold text-ink">
            7 tips para escribir en francés
          </h2>
          <p className="mb-6 text-sm text-ink-soft">
            Estrategias pensadas para tu forma de aprender.
          </p>

          <div className="space-y-5">
            {intel.content.tips.map((tip, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-line bg-paper shadow-sm"
              >
                {/* Título del tip con número */}
                <div
                  className="flex items-center gap-3 px-6 py-4"
                  style={{ backgroundColor: intel.softVar }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: intel.colorVar }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3
                    className="font-display text-lg font-bold"
                    style={{ color: intel.inkVar }}
                  >
                    {tip.title}
                  </h3>
                </div>
                {/* Cuerpo del tip */}
                <div className="space-y-4 px-6 py-5">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: intel.inkVar }}
                    >
                      En qué consiste
                    </p>
                    <p className="mt-1 text-sm text-ink">{tip.what}</p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: intel.inkVar }}
                    >
                      Por qué te sirve
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{tip.why}</p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: intel.inkVar }}
                    >
                      Cómo hacerlo
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{tip.how}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Video al final de la sección ===== */}
        {intel.content.videoUrl && (
          <section className="mt-12">
            <h2 className="mb-4 font-display text-2xl font-bold text-ink">
              Video recomendado
            </h2>
            <VideoEmbed
              url={intel.content.videoUrl}
              title={intel.name}
              accentVar={intel.colorVar}
            />
          </section>
        )}

        {/* ===== CTA final ===== */}
        <section
          className="mt-14 rounded-3xl p-8 text-center"
          style={{ backgroundColor: intel.softVar }}
        >
          <h2
            className="font-display text-2xl font-bold"
            style={{ color: intel.inkVar }}
          >
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
