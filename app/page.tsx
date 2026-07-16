import Image from "next/image";
import Link from "next/link";
import { VideoEmbed } from "@/components/VideoEmbed";
import { INTELLIGENCES } from "@/lib/intelligences";
import { TOTAL_QUESTIONS } from "@/lib/mckenzie";

const HERO_TOGETHER =
  "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784218912/ecrire-avec-toi/home/hero-together-v3.png";
const HERO_LIBERTAD =
  "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784176469/ecrire-avec-toi/home/hero-libertad.png";
const HERO_ANA =
  "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784176473/ecrire-avec-toi/home/hero-ana.png";

// Textura de papel antiguo (grano jaspeado) para el fondo del hero.
const PAPER_TEXTURE = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch' />
    <feColorMatrix type='matrix' values='0 0 0 0 0.65  0 0 0 0 0.52  0 0 0 0 0.35  0 0 0 0.35 0' />
  </filter>
  <rect width='100%' height='100%' filter='url(#n)' />
</svg>`;
const PAPER_TEXTURE_URL = `url("data:image/svg+xml,${encodeURIComponent(PAPER_TEXTURE)}")`;

const ICONS = {
  responder:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206242/ecrire-avec-toi/home/icons/responder.png",
  recibido:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206243/ecrire-avec-toi/home/icons/recibido.png",
  aplicar:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206245/ecrire-avec-toi/home/icons/aplicar.png",
  queEsElTest:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206245/ecrire-avec-toi/home/icons/que-es-el-test.png",
  ochoInteligencias:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206246/ecrire-avec-toi/home/icons/8-inteligencias.png",
  recursos:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206247/ecrire-avec-toi/home/icons/recursos.png",
};

const INTEL_ICONS: Record<string, string> = {
  linguistica:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206269/ecrire-avec-toi/home/icons-intel/verbal.png",
  logica:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206270/ecrire-avec-toi/home/icons-intel/matematica.png",
  espacial:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206272/ecrire-avec-toi/home/icons-intel/visual.png",
  musical:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206272/ecrire-avec-toi/home/icons-intel/musica.png",
  corporal:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206273/ecrire-avec-toi/home/icons-intel/kinestesica.png",
  intrapersonal:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206274/ecrire-avec-toi/home/icons-intel/intrapersonal.png",
  interpersonal:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206275/ecrire-avec-toi/home/icons-intel/interpersonal.png",
  naturalista:
    "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784206276/ecrire-avec-toi/home/icons-intel/naturalista.png",
};

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        {/* Textura de papel antiguo jaspeado */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
          style={{ backgroundImage: PAPER_TEXTURE_URL, backgroundSize: "300px 300px" }}
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          {/* Texto */}
          <div>
            <h1 className="font-display text-5xl font-black leading-[1.05] text-ink md:text-6xl">
              AMÉLIOREZ VOTRE
              <br />
              ÉCRITURE.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-soft">
              Potencia tu escritura en francés a partir de tu perfil único de
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

            {/* Acentos azules decorativos */}
            <div
              className="absolute -left-6 top-[2%] h-16 w-16 rotate-12 rounded-2xl bg-azul-noche/20"
              aria-hidden="true"
            />
            <div
              className="absolute -right-4 top-[38%] h-10 w-10 -rotate-12 rounded-full"
              style={{ backgroundColor: "color-mix(in srgb, var(--ling) 25%, transparent)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-5 left-[38%] h-12 w-12 rotate-45 rounded-xl bg-azul-noche/20"
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
      <section className="border-y border-line" style={{ backgroundColor: "#e7e6ea" }}>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ICONS.responder,
                number: "1",
                title: "Responde las preguntas",
                text: "Completa el test de inteligencias múltiples en 5–10 minutos.",
              },
              {
                icon: ICONS.recibido,
                number: "2",
                title: "Recibe tu perfil",
                text: "Obtén un gráfico de radar con tus 8 inteligencias y tu color dominante.",
              },
              {
                icon: ICONS.aplicar,
                number: "3",
                title: "Aplica estrategias",
                text: "Accede a estrategias de escritura en francés adaptadas a tu perfil.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="flex items-start justify-between gap-4 rounded-2xl bg-azul-noche p-6 shadow-md"
              >
                <div>
                  <span
                    className="font-display text-3xl font-black text-terracota"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/75">{step.text}</p>
                </div>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15"
                  aria-hidden="true"
                >
                  <Image
                    src={step.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] brightness-0 invert"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3 TARJETAS INFORMATIVAS ============ */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <article
            className="flex flex-col rounded-2xl p-7 shadow-sm"
            style={{ backgroundColor: "var(--corp-soft)" }}
          >
            <Image src={ICONS.queEsElTest} alt="" width={40} height={40} className="h-10 w-10" />
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
          <article
            className="flex flex-col rounded-2xl p-7 shadow-sm"
            style={{ backgroundColor: "var(--logi-soft)" }}
          >
            <Image
              src={ICONS.ochoInteligencias}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
            />
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
          <article
            className="flex flex-col rounded-2xl p-7 shadow-sm"
            style={{ backgroundColor: "var(--espa-soft)" }}
          >
            <Image src={ICONS.recursos} alt="" width={40} height={40} className="h-10 w-10" />
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
        <div
          className="rounded-3xl p-8"
          style={{ backgroundColor: "#FAF2E7" }}
        >
          <h2 className="text-center font-display text-2xl font-bold text-ink">
            Un color para cada inteligencia
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-ink-soft">
            Cada inteligencia tiene su propio color para guiarte visualmente por
            toda la plataforma.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INTELLIGENCES.map((intel) => (
              <li key={intel.id}>
                <Link
                  href={`/inteligencias/${intel.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Línea superior con el color puro de la inteligencia */}
                  <span
                    className="h-1.5 w-full shrink-0"
                    style={{ backgroundColor: intel.colorVar }}
                    aria-hidden="true"
                  />
                  <span className="flex flex-1">
                    <span
                      className="flex w-20 shrink-0 items-center justify-center"
                      style={{ backgroundColor: intel.colorVar }}
                      aria-hidden="true"
                    >
                      <Image
                        src={INTEL_ICONS[intel.id]}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 brightness-0 invert transition-transform group-hover:scale-110"
                      />
                    </span>
                    <span className="flex flex-1 flex-col justify-center bg-paper px-4 py-3">
                      <span
                        className="font-display text-base font-bold"
                        style={{ color: intel.inkVar }}
                      >
                        {intel.shortName}
                      </span>
                      <span className="mt-1 text-xs leading-snug text-ink-soft">
                        {intel.tagline}
                      </span>
                    </span>
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
