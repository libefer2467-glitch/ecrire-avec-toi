import { ConvexHttpClient } from "convex/browser";

/**
 * Devuelve un cliente HTTP de Convex SOLO si el proyecto tiene
 * configurada la variable NEXT_PUBLIC_CONVEX_URL. Si no, devuelve null
 * y la app sigue funcionando sin backend (degradación elegante).
 *
 * Para activar Convex:
 *   1. npx convex dev   (crea el deployment e inyecta la URL)
 *   2. La URL queda en .env.local como NEXT_PUBLIC_CONVEX_URL
 */
export function getConvexClient(): ConvexHttpClient | null {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return null;
  return new ConvexHttpClient(url);
}

export const isConvexConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);
