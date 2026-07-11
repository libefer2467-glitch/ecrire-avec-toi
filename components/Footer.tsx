import Link from "next/link";
import { UmssLogo } from "./UmssLogo";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-cream-2">
      <div className="andean-stripe h-1 w-full" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-terracota text-lg text-white"
                aria-hidden="true"
              >
                ✍️
              </span>
              <span className="font-display text-xl font-bold text-terracota-ink">
                Écrire avec toi
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              Plataforma educativa que aplica las Inteligencias Múltiples de
              Howard Gardner a la producción escrita en francés.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Enlaces del pie de página">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">
              Explorar
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>
                <Link href="/test" className="hover:text-terracota-ink">
                  Test de Inteligencias Múltiples
                </Link>
              </li>
              <li>
                <Link href="/inteligencias" className="hover:text-terracota-ink">
                  Las 8 Inteligencias
                </Link>
              </li>
              <li>
                <Link href="/recursos" className="hover:text-terracota-ink">
                  Recursos y folleto
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-terracota-ink">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Universidad */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">
              Universidad
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <UmssLogo className="h-14 w-14 shrink-0" />
              <p className="text-sm text-ink-soft">
                Universidad Mayor de San Simón
                <br />
                <span className="text-xs">Cochabamba · Bolivia</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6 text-center text-sm text-ink-soft">
          <p>
            Página diseñada y elaborada por Libertad Fernández y María Cruz
            Quiroz.
          </p>
          <p className="mt-1 text-xs">
            © {new Date().getFullYear()} · Proyecto de tesis · UMSS
          </p>
        </div>
      </div>
    </footer>
  );
}
