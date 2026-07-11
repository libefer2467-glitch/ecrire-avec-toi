"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { INTELLIGENCES } from "@/lib/intelligences";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/test", label: "Test IM" },
  { href: "/inteligencias", label: "Inteligencias", hasDropdown: true },
  { href: "/recursos", label: "Recursos" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [intelOpen, setIntelOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <div className="andean-stripe h-1 w-full" aria-hidden="true" />
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-terracota text-lg text-white shadow-sm"
            aria-hidden="true"
          >
            ✍️
          </span>
          <span className="font-display text-xl font-bold text-terracota-ink">
            Écrire avec toi
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => setIntelOpen(true)}
                onMouseLeave={() => setIntelOpen(false)}
              >
                <Link
                  href={link.href}
                  aria-haspopup="true"
                  aria-expanded={intelOpen}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-verde-ande-soft text-verde-ande"
                      : "text-ink-soft hover:bg-cream-2 hover:text-ink"
                  }`}
                >
                  {link.label} ▾
                </Link>
                {intelOpen && (
                  <div className="absolute left-0 top-full w-64 rounded-xl border border-line bg-paper p-2 shadow-xl">
                    {INTELLIGENCES.map((intel) => (
                      <Link
                        key={intel.id}
                        href={`/inteligencias/${intel.slug}`}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink hover:bg-cream-2"
                      >
                        <span
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{ backgroundColor: intel.colorVar }}
                          aria-hidden="true"
                        />
                        {intel.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-verde-ande-soft text-verde-ande"
                      : "text-ink-soft hover:bg-cream-2 hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
          <li>
            <Link
              href="/test"
              className="ml-2 rounded-full bg-terracota px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-terracota-ink"
            >
              Hacer el test
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-ink md:hidden"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-opacity ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line bg-cream px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-base font-medium ${
                    isActive(link.href)
                      ? "bg-verde-ande-soft text-verde-ande"
                      : "text-ink hover:bg-cream-2"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/test"
            onClick={() => setMobileOpen(false)}
            className="mt-3 block rounded-full bg-terracota px-4 py-3 text-center font-semibold text-white"
          >
            Hacer el test gratuito
          </Link>
        </div>
      )}
    </header>
  );
}
