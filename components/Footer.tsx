import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-16 bg-azul-noche">
      <div className="andean-stripe h-1 w-full" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Marca */}
          <div>
            <Image
              src="https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784204984/ecrire-avec-toi/branding/logo-v2.png"
              alt="Écrire avec toi"
              width={200}
              height={70}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-3 max-w-xs text-sm text-white/70">
              Plataforma educativa que aplica las Inteligencias Múltiples de
              Howard Gardner a la producción escrita en francés.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Enlaces del pie de página">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Explorar
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/test" className="hover:text-white">
                  Test de Inteligencias Múltiples
                </Link>
              </li>
              <li>
                <Link href="/inteligencias" className="hover:text-white">
                  Las 8 Inteligencias
                </Link>
              </li>
              <li>
                <Link href="/recursos" className="hover:text-white">
                  Recursos y folleto
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Universidad */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Universidad
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white p-1.5">
                <Image
                  src="/umss-logo.png"
                  alt="Universidad Mayor de San Simón"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-sm text-white/70">
                Universidad Mayor de San Simón
                <br />
                <span className="text-xs">Cochabamba · Bolivia</span>
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white p-1.5">
                <Image
                  src="/lael-logo.jpg"
                  alt="Lingüística Aplicada a la Enseñanza de Lenguas (LAEL)"
                  width={48}
                  height={44}
                  className="h-full w-auto object-contain"
                />
              </div>
              <p className="text-sm text-white/70">
                Lingüística Aplicada a la
                <br />
                <span className="text-xs">Enseñanza de Lenguas (LAEL)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6 text-center text-sm text-white/70">
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
