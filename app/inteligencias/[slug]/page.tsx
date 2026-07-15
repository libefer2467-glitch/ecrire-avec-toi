import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INTELLIGENCES, getIntelligenceBySlug } from "@/lib/intelligences";
import { VideoEmbed } from "@/components/VideoEmbed";

export function generateStaticParams() {
  return INTELLIGENCES.map((i) => ({ slug: i.slug }));
}

// Patrón decorativo tipo "circuito" para el banner previo al CTA final.
const CIRCUIT_PATTERN = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
  <g fill='none' stroke='white' stroke-width='1.2' opacity='0.5'>
    <path d='M0 40 H60 V0' />
    <path d='M220 180 H150 V220' />
    <path d='M0 150 H55 V220' />
    <path d='M220 40 H160 V0' />
    <path d='M60 0 V40 H160 V0' />
    <path d='M0 110 H90' />
    <path d='M130 110 H220' />
    <path d='M90 110 V150' />
  </g>
  <g fill='white' opacity='0.6'>
    <circle cx='60' cy='40' r='3' />
    <circle cx='150' cy='180' r='3' />
    <circle cx='55' cy='150' r='3' />
    <circle cx='160' cy='40' r='3' />
    <circle cx='110' cy='110' r='3' />
    <circle cx='90' cy='150' r='3' />
  </g>
</svg>`;
const CIRCUIT_PATTERN_URL = `url("data:image/svg+xml,${encodeURIComponent(CIRCUIT_PATTERN)}")`;

// Foto de banco libre (Unsplash): mapa antiguo, fondo del CTA final.
const MAP_TEXTURE_URL =
  "https://images.unsplash.com/photo-1723306743407-cb6ac8f19941?w=1600&q=75&auto=format&fit=crop";

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
  const quotesImage = media?.quotesImage;
  const [profileImage, approachImage] = media?.sideImages ?? [];
  const [iconConversacion, iconCuaderno, iconPluma] = media?.icons ?? [];
  const games = intel.content.games ?? [];
  const externalLinks = intel.content.externalLinks ?? [];

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

      {/* ===== Banda con fondo del color de la inteligencia: frases + perfil ===== */}
      <div style={{ backgroundColor: intel.softVar }}>
        <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
          <section className="grid gap-8 md:grid-cols-2 md:items-start">
            {/* Frases que te describen (sin tarjeta propia: se funde con la banda) */}
            <div>
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
                  <li key={i} className="text-sm italic text-ink">
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>

              {quotesImage && (
                <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm">
                  <Image
                    src={quotesImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Perfil: tarjeta blanca "flotando" sobre la banda de color */}
            <div className="overflow-hidden rounded-2xl bg-paper shadow-sm">
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
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4">
        {/* ===== Enfoque teórico: tarjeta de color sobre fondo blanco ===== */}
        <section
          className="mt-10 overflow-hidden rounded-2xl shadow-sm"
          style={{ backgroundColor: intel.softVar }}
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

        {/* ===== Practica jugando: juegos incrustados + enlaces externos ===== */}
        {(games.length > 0 || externalLinks.length > 0) && (
          <section className="mt-12">
            <h2 className="mb-1 font-display text-2xl font-bold text-ink">
              Practica jugando
            </h2>
            <p className="mb-6 text-sm text-ink-soft">
              Ejercicios interactivos gratuitos para reforzar lo que acabas de
              leer.
            </p>

            {games.length > 0 && (
              <div className="grid gap-5 md:grid-cols-3">
                {games.map((game, i) => (
                  <a
                    key={i}
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div
                      className="relative flex aspect-[4/3] items-center justify-center p-8"
                      style={{ backgroundColor: intel.softVar }}
                    >
                      <Image
                        src={game.thumbnail}
                        alt=""
                        width={140}
                        height={140}
                        className="h-auto w-full max-w-[140px] object-contain"
                      />
                      <span
                        className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition group-hover:opacity-90"
                        style={{ backgroundColor: intel.colorVar }}
                      >
                        Jugar ↗
                      </span>
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-ink">{game.title}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {externalLinks.length > 0 && (
              <div className={games.length > 0 ? "mt-5 grid gap-4" : "grid gap-4"}>
                {externalLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper p-5 shadow-sm transition hover:bg-cream-2"
                  >
                    <div>
                      <p className="font-display text-base font-bold text-ink">
                        {link.label}
                      </p>
                      {link.description && (
                        <p className="mt-1 text-sm text-ink-soft">{link.description}</p>
                      )}
                    </div>
                    <span
                      className="shrink-0 text-sm font-semibold"
                      style={{ color: intel.inkVar }}
                    >
                      Ir al sitio ↗
                    </span>
                  </a>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* ===== Banner celebratorio (a todo lo ancho) ===== */}
      <section
        className="relative mt-14 overflow-hidden py-10 text-center"
        style={{
          backgroundImage: `linear-gradient(90deg, ${intel.inkVar}, ${intel.colorVar})`,
        }}
      >
        {/* Patrón solo en los costados: se difumina antes de llegar al texto */}
        <div
          className="absolute inset-y-0 left-0 w-1/2"
          style={{
            backgroundImage: CIRCUIT_PATTERN_URL,
            backgroundSize: "220px 220px",
            maskImage: "linear-gradient(to right, black 0%, black 30%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 30%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2"
          style={{
            backgroundImage: CIRCUIT_PATTERN_URL,
            backgroundSize: "220px 220px",
            maskImage: "linear-gradient(to left, black 0%, black 30%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, black 30%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <p className="relative px-4 font-display text-2xl font-bold text-white md:text-3xl">
          {intel.content.banner}
        </p>
      </section>

      <div className="mx-auto max-w-4xl px-4">
        {/* ===== CTA final (mapa antiguo de fondo) ===== */}
        <section className="relative mt-10 overflow-hidden rounded-3xl shadow-md">
          <div className="absolute inset-0">
            <Image
              src={MAP_TEXTURE_URL}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-cream/85" aria-hidden="true" />
          </div>
          <div className="relative p-10 text-center">
            <h2
              className="font-display text-2xl font-bold md:text-3xl"
              style={{ color: intel.inkVar }}
            >
              ¿No sabes cuál es tu inteligencia dominante?
            </h2>
            <p className="mt-2 text-ink-soft">
              ¡Descubre tu perfil completo con nuestro test especializado y
              detallado!
            </p>
            <Link
              href="/test"
              className="mt-5 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white shadow-md transition hover:opacity-90"
              style={{ backgroundColor: intel.inkVar }}
            >
              <span aria-hidden="true">🧠</span>
              Haz el Test de Inteligencias Múltiples
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
