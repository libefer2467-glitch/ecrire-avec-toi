/*
  Componente de video embebido (YouTube/Vimeo).
  Si `url` es null, muestra un placeholder. Las autoras pegarán el
  enlace del video en lib/intelligences.ts (campo content.videoUrl).
  Acepta URLs normales de YouTube/Vimeo y las convierte a formato embed.
*/

function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    // YouTube: youtu.be/ID  o  youtube.com/watch?v=ID
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }
    // Vimeo: vimeo.com/ID
    if (u.hostname.includes("vimeo.com") && !u.hostname.includes("player")) {
      return `https://player.vimeo.com/video${u.pathname}`;
    }
    return url;
  } catch {
    return url;
  }
}

export function VideoEmbed({
  url,
  title,
  accentVar,
}: {
  url: string | null;
  title: string;
  accentVar: string;
}) {
  if (!url) {
    return (
      <div
        className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line text-center"
        style={{ backgroundColor: "var(--cream-2)" }}
        role="img"
        aria-label="Espacio reservado para el video"
      >
        <span className="text-4xl" aria-hidden="true">
          🎬
        </span>
        <p className="font-semibold text-ink">Video próximamente</p>
        <p className="max-w-xs text-xs text-ink-soft">
          Las autoras agregarán aquí el video de {title}.
        </p>
      </div>
    );
  }

  return (
    <div
      className="aspect-video w-full overflow-hidden rounded-2xl border shadow-sm"
      style={{ borderColor: accentVar }}
    >
      <iframe
        src={toEmbedUrl(url)}
        title={`Video: ${title}`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
