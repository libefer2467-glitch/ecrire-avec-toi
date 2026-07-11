/*
  PLACEHOLDER de la fotografía de las autoras (Libertad Fernández y
  María Cruz Quiroz) para el hero.

  Para usar la foto real:
    1. Coloca la imagen en /public/autoras.jpg
    2. Reemplaza este componente por:
         import Image from "next/image";
         <Image src="/autoras.jpg" alt="Libertad Fernández y María Cruz Quiroz"
                fill className="object-cover" priority />
*/
export function AuthorsPhoto() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-verde-ande/15 via-ocre/15 to-terracota/20"
      role="img"
      aria-label="Espacio para la fotografía de Libertad Fernández y María Cruz Quiroz"
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <span className="text-5xl" aria-hidden="true">
          📸
        </span>
        <p className="font-display text-lg font-semibold text-ink">
          Fotografía de las autoras
        </p>
        <p className="max-w-xs text-sm text-ink-soft">
          Libertad Fernández y María Cruz Quiroz
        </p>
        <p className="mt-2 rounded-full bg-paper/70 px-3 py-1 text-xs text-ink-soft">
          Reemplazar por <code>/public/autoras.jpg</code>
        </p>
      </div>
    </div>
  );
}
