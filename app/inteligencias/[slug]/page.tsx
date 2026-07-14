import type { Metadata } from "next";
import Image from "next/image";
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

  const media = intel.content.media;
  const [profileImage, approachImage] = media?.sideImages ?? [];
  const [iconConversacion, iconCuaderno, iconPluma] = media?.icons ?? [];

  return (
    <article className="pb-16">
      {/* ===== Hero: con foto real si existe, si no el banner de color ===== */}
      {media?.heroImage ? (
        <header
          className="relative isolate min-h-[480px] overflow-hidden md:min-h-[560px]"
          style={{
            backgroundImage: `linear-gradient(135deg, ${intel.colorVar} 0%, ${intel.colorVar} 45%, var(--ocre) 100%)`,
          }}
        >
          {/* Foto integrada a la derecha, difuminada hacia la izquierda */}
          <div
            className="absolute inset-y-0 right-0 w-full md:w-[58%]"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 38%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 38%)",
            }}
          >
            <Image
              src={media.heroImage}
              alt={`Inteligencia ${intel.name}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>

          {/* Velo oscuro sutil para que el texto siempre tenga contraste,
              sin importar qué tan clara sea la foto debajo (clave en móvil,
              donde la foto ocupa todo el ancho). */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent md:from-black/20 md:via-transparent md:to-transparent"
            aria-hidden="true"
          />

          {/* Corte curvo inferior-izquierdo que revela el fondo de la página */}
          <div
            className="absolute -bottom-px -left-px h-20 w-20 rounded-tr-[100%] bg-cream md:h-32 md:w-32"
            aria-hidden="true"
          />

          {/* Contenido */}
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:py-20">
            <Link
              href="/inteligencias"
              className="text-sm font-medium text-white/85 hover:text-white"
            >
              ← Todas las inteligencias
            </Link>

            <h1
              className="mt-6 max-w-lg font-display text-4xl font-black uppercase leading-[1.05] md:text-5xl"
              style={{ color: "var(--ocre)" }}
            >
              Inteligencia
              <br />
              {intel.name}
            </h1>
            <p className="mt-3 max-w-md text-xl font-bold text-white">{intel.tagline}</p>
            <p className="mt-3 max-w-md text-white/85">{intel.description}</p>

            {iconPluma && (
              <a
                href="#tips"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm transition hover:bg-white/25"
              >
                <Image
                  src={iconPluma}
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] brightness-0 invert"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-white">Ver los tips ↓</span>
              </a>
            )}
          </div>
        </header>
      ) : (
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
      )}

      <div className="mx-auto max-w-4xl px-4">
        {/* ===== Frases + perfil ===== */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Frases que te describen */}
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: intel.softVar }}
          >
            <h2
              className="mb-3 flex items-center gap-2 font-display text-lg font-bold"
              style={{ color: intel.inkVar }}
            >
              {iconCuaderno && (
                <Image
                  src={iconCuaderno}
                  alt=""
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px]"
                  aria-hidden="true"
                />
              )}
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
          <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-sm">
            {profileImage && (
              <div className="relative aspect-video w-full">
                <Image
                  src={profileImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}
            <p className="p-6 text-ink">{intel.content.profile}</p>
          </div>
        </section>

        {/* ===== Enfoque teórico ===== */}
        <section
          className="mt-8 overflow-hidden rounded-2xl border-l-4 bg-paper shadow-sm"
          style={{ borderLeftColor: intel.colorVar }}
        >
          <div className={approachImage ? "grid gap-0 md:grid-cols-[1fr_220px]" : ""}>
            <div className="p-6">
              <h2
                className="flex items-center gap-2 font-display text-lg font-bold"
                style={{ color: intel.inkVar }}
              >
                {iconConversacion && (
                  <Image
                    src={iconConversacion}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                    aria-hidden="true"
                  />
                )}
                {intel.content.approach.name}
              </h2>
              <p className="mt-2 text-ink-soft">{intel.content.approach.body}</p>
            </div>
            {approachImage && (
              <div className="relative hidden min-h-[180px] md:block">
                <Image
                  src={approachImage}
                  alt=""
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* ===== Tips ===== */}
        <section id="tips" className="mt-12 scroll-mt-6">
          <h2 className="mb-1 font-display text-2xl font-bold text-ink">
            Tips para escribir en francés
          </h2>
          <p className="mb-6 text-sm text-ink-soft">
            Estrategias pensadas para tu forma de aprender.
          </p>

          <div className="space-y-5">
            {intel.content.tips.map((tip, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-line bg-paper shadow-sm md:grid md:grid-cols-[220px_1fr]"
              >
                {tip.image && (
                  <div className="relative h-48 w-full md:h-full">
                    <Image
                      src={tip.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 220px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
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
