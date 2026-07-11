/*
  Fotografía de las autoras (Libertad Fernández y María Cruz Quiroz) para el hero.
  La imagen real está en /public/autoras.png. Next.js la optimiza al servirla.
*/
import Image from "next/image";

export function AuthorsPhoto() {
  return (
    <Image
      src="/autoras.png"
      alt="Libertad Fernández y María Cruz Quiroz, autoras del proyecto"
      fill
      priority
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover"
    />
  );
}
