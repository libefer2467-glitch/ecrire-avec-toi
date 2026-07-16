import Image from "next/image";
import Link from "next/link";
import { VideoEmbed } from "@/components/VideoEmbed";
import { INTELLIGENCES } from "@/lib/intelligences";
import { TOTAL_QUESTIONS } from "@/lib/mckenzie";

const HERO_TOGETHER =
  "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784176479/ecrire-avec-toi/home/hero-together.png";
const HERO_LIBERTAD =
  "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784176469/ecrire-avec-toi/home/hero-libertad.png";
const HERO_ANA =
  "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784176473/ecrire-avec-toi/home/hero-ana.png";

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          {/* Texto */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-verde-ande-soft px-3 py-1 text-sm font-medium text-verde-ande">
              🇫🇷 Français · Inteligencias Múltiples
            </p>
            <h1 className="mt-4 font-display text-5xl font-black leading-[1.05] text-ink md:text-6xl">
              <span className="text-terracota">DÉCOUVRE</span> TON
              <br />
              ÉCRITURE.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-soft">
              Aprende a escribir en francés a partir de tu perfil único de
              Inteligencias Múltiples, basado en la teoría de Howard Gardner.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/test"
                className="rounded-full bg-terracota px-7 py-3.5 text-base font-semibold text-white shadow-md transition-transform hover:scale-[1.03] hover:bg-terracota-ink"
              >
                Hacer el test gratuito →
              </Link>
              <Link
                href="/inteligencias"
                className="rounded-full border border-line bg-paper px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-cream-2"
              >
                Conocer las 8 inteligencias
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink-soft">
              ⏱️ Solo 5–10 minutos · Anónimo · {TOTAL_QUESTIONS} preguntas
            </p>
          </div>

          {/* Collage de fotos */}
          <div className="relative mx-auto aspect-square w-full max-w-md md:max-w-none">
            {/* Resplandor suave detrás del collage */}
            <div
              className="absolute inset-0 rounded-full opacity-40 blur-3xl"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--terracota) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Foto principal: Libertad y Ana juntas */}
            <div className="absolute left-[4%] top-[6%] w-[72%] -rotate-3 overflow-hidden rounded-3xl border-4 border-paper shadow-xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={HERO_TOGETHER}
                  alt="Libertad y Ana, autoras del proyecto, trabajando juntas"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Foto secundaria: Libertad */}
            <div className="absolute bottom-[2%] left-0 w-[42%] rotate-6 overflow-hidden rounded-2xl border-4 border-paper shadow-lg">
              <div className="relative aspect-[4/5]">
                <Image
                  src={HERO_LIBERTAD}
                  alt="Libertad Fernández, autora del proyecto"
                  fill
                  sizes="(max-width: 768px) 45vw, 20vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Foto secundaria: Ana */}
            <div className="absolute bottom-[8%] right-0 w-[42%] -rotate-6 overflow-hidden rounded-2xl border-4 border-paper shadow-lg">
              <div className="relative aspect-[4/5]">
                <Image
                  src={HERO_ANA}
                  alt="Ana, colaboradora del proyecto"
                  fill
                  sizes="(max-width: 768px) 45vw, 20vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESO (3 pasos) ============ */}
      <section className="border-y border-line bg-paper/60">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "📝",
                title: "1. Responde las preguntas",
                text: "Completa el inventario de inteligencias múltiples en 5–10 minutos.",
                color: "var(--corp)",
              },
              {
                icon: "🎯",
                title: "2. Recibe tu perfil",
                text: "Obtén un gráfico de radar con tus 8 inteligencias y tu color dominante.",
                color: "var(--musi-ink)",
              },
              {
                icon: "✍️",
                title: "3. Aplica estrategias",
                text: "Accede a estrategias de escritura en francés adaptadas a tu perfil.",
                color: "var(--verde-ande)",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-line bg-cream p-6 shadow-sm"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{ backgroundColor: `${step.color}1a` }}
                  aria-hidden="true"
                >
                  {step.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3 TARJETAS INFORMATIVAS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <article className="flex flex-col rounded-2xl border border-line bg-paper p-7 shadow-sm">
            <span className="text-3xl" aria-hidden="true">
              💡
            </span>
            <h2 className="mt-4 font-display text-xl font-bold text-ink">
              ¿Qué es el Test de Inteligencias Múltiples?
            </h2>
            <p className="mt-3 flex-1 text-sm text-ink-soft">
              Howard Gardner propuso que la inteligencia no es única, sino un
              conjunto de capacidades. Este test te ayuda a descubrir cuáles son
              tus fortalezas para aprender de la manera que mejor se adapta a ti.
            </p>
            <Link
              href="/test"
              className="mt-5 inline-flex items-center gap-1 font-semibold text-terracota-ink hover:underline"
            >
              Iniciar el test →
            </Link>
          </article>

          {/* Card 2 */}
          <article className="flex flex-col rounded-2xl border border-line bg-paper p-7 shadow-sm">
            <span className="text-3xl" aria-hidden="true">
              🧠
            </span>
            <h2 className="mt-4 font-display text-xl font-bold text-ink">
              Las 8 Inteligencias
            </h2>
            <p className="mt-3 flex-1 text-sm text-ink-soft">
              Explora las ocho áreas —lingüística, lógica, musical, espacial,
              corporal, interpersonal, intrapersonal y naturalista— y las
              estrategias de escritura en francés diseñadas para cada una.
            </p>
            <Link
              href="/inteligencias"
              className="mt-5 inline-flex items-center gap-1 font-semibold text-terracota-ink hover:underline"
            >
              Ver las inteligencias →
            </Link>
          </article>

          {/* Card 3 */}
          <article className="flex flex-col rounded-2xl border border-line bg-paper p-7 shadow-sm">
            <span className="text-3xl" aria-hidden="true">
              📚
            </span>
            <h2 className="mt-4 font-display text-xl font-bold text-ink">
              Zona de Recursos
            </h2>
            <p className="mt-3 flex-1 text-sm text-ink-soft">
              Descarga el <strong>Folleto de estrategias</strong> y el material
              de apoyo para llevar la teoría a tu práctica de escritura en
              francés.
            </p>
            <Link
              href="/recursos"
              className="mt-5 inline-flex items-center gap-1 font-semibold text-terracota-ink hover:underline"
            >
              Ir a recursos →
            </Link>
          </article>
        </div>
      </section>

      {/* ============ FRANJA DE 8 COLORES ============ */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-line bg-paper p-8 shadow-sm">
          <h2 className="text-center font-display text-2xl font-bold text-ink">
            Un color para cada inteligencia
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-ink-soft">
            Cada inteligencia tiene su propio color para guiarte visualmente por
            toda la plataforma.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {INTELLIGENCES.map((intel) => (
              <li key={intel.id}>
                <Link
                  href={`/inteligencias/${intel.slug}`}
                  className="group flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors hover:bg-cream-2"
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-sm transition-transform group-hover:scale-105"
                    style={{ backgroundColor: intel.softVar }}
                    aria-hidden="true"
                  >
                    {intel.emoji}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: intel.inkVar }}
                  >
                    {intel.shortName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ VIDEO INTRODUCTORIO ============ */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="mb-4 text-center font-display text-2xl font-bold text-ink">
          Conoce las Inteligencias Múltiples
        </h2>
        <VideoEmbed
          url="https://www.youtube.com/watch?v=2hJnFAysNNs"
          title="Inteligencias Múltiples - Howard Gardner"
          accentVar="var(--ling)"
        />
      </section>
    </>
  );
}
