import type { Metadata } from "next";
import Link from "next/link";
import { INTELLIGENCES } from "@/lib/intelligences";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Descarga el folleto de estrategias y el material de apoyo para la escritura en francés basada en inteligencias múltiples.",
};

export default function RecursosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="text-center">
        <h1 className="font-display text-4xl font-black text-ink">Recursos</h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-soft">
          Material de apoyo para llevar las estrategias de escritura a tu práctica
          diaria del francés.
        </p>
      </header>

      {/* Folleto principal destacado */}
      <section className="mt-10 overflow-hidden rounded-3xl border border-line bg-paper shadow-sm">
        <div className="grid items-center gap-6 p-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-terracota-ink">
              Recurso principal
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink">
              Folleto de estrategias de escritura
            </h2>
            <p className="mt-3 text-ink-soft">
              Guía completa con las estrategias didácticas basadas en las ocho
              inteligencias múltiples, aplicadas a la producción escrita en
              francés para estudiantes de tercer semestre.
            </p>
            <a
              href="#"
              aria-disabled
              className="mt-5 inline-block rounded-full bg-terracota px-6 py-3 font-semibold text-white shadow-md hover:bg-terracota-ink"
            >
              Descargar folleto (próximamente)
            </a>
            <p className="mt-2 text-xs text-ink-soft">
              📌 Reemplazar por el PDF real en <code>/public/folleto.pdf</code>.
            </p>
          </div>
          <div
            className="flex h-40 w-32 items-center justify-center rounded-2xl text-5xl shadow-inner"
            style={{ backgroundColor: "var(--cream-2)" }}
            aria-hidden="true"
          >
            📘
          </div>
        </div>
      </section>

      {/* Recursos externos: biblioteca y ejercicios */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">
          Biblioteca y ejercicios en línea
        </h2>
        <p className="mt-2 text-ink-soft">
          Recursos externos y gratuitos para seguir practicando tu francés.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <a
            href="https://drive.google.com/drive/u/0/folders/1UqUm08whph3c3huXaFaSh179parUI6z"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-paper p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
              style={{ backgroundColor: "var(--ling-soft)" }}
              aria-hidden="true"
            >
              📚
            </span>
            <span className="font-display text-lg font-bold text-ink">
              Biblioteca virtual de francés
            </span>
            <span className="text-sm text-ink-soft">
              Catálogo de libros por nivel (A1, A2, B1), literatura francesa y
              material DELF-DALF, de la biblioteca de la carrera de LAEL.
            </span>
          </a>

          <a
            href="https://es.educaplay.com/usuario/13948908-libertad/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-paper p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
              style={{ backgroundColor: "var(--musi-soft)" }}
              aria-hidden="true"
            >
              🎮
            </span>
            <span className="font-display text-lg font-bold text-ink">
              Juegos interactivos
            </span>
            <span className="text-sm text-ink-soft">
              Sopa de letras, Froggy Jumps y ejercicios de completar frases,
              hechos a medida para este proyecto.
            </span>
          </a>

          <a
            href="https://francais.lingolia.com/es/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-paper p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
              style={{ backgroundColor: "var(--espa-soft)" }}
              aria-hidden="true"
            >
              ✏️
            </span>
            <span className="font-display text-lg font-bold text-ink">
              Lingolia Français
            </span>
            <span className="text-sm text-ink-soft">
              Ejercicios gratuitos de gramática y vocabulario: sinónimos,
              parónimos, homófonos y mucho más.
            </span>
          </a>
        </div>
      </section>

      {/* Descargas por inteligencia */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-ink">
          Material por inteligencia
        </h2>
        <p className="mt-2 text-ink-soft">
          Cada inteligencia cuenta con ejercicios específicos. Entra a su página
          para ver el video y las estrategias completas.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {INTELLIGENCES.map((intel) => (
            <li key={intel.id}>
              <Link
                href={`/inteligencias/${intel.slug}`}
                className="flex items-center gap-3 rounded-2xl border border-line bg-paper p-4 shadow-sm transition hover:bg-cream-2"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                  style={{ backgroundColor: intel.softVar }}
                  aria-hidden="true"
                >
                  {intel.emoji}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{intel.name}</span>
                  <span className="block text-xs text-ink-soft">
                    {intel.tagline}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
