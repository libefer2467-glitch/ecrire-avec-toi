@AGENTS.md

# Écrire avec toi — Guía para Claude Code

Plataforma educativa (tesis, UMSS) que aplica las **Inteligencias Múltiples de
Howard Gardner** a la enseñanza de la **producción escrita en francés** para
estudiantes de 3er semestre. Autoras: **Libertad Fernández** y **María Cruz Quiroz**.

## Stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (config por CSS en `app/globals.css`, no `tailwind.config`)
- **Convex** para persistencia (opcional en runtime, ver abajo)
- Despliegue en **Vercel**, código en **GitHub**

## Idioma
- El título del hero va en **francés**: "DÉCOUVRE TON ÉCRITURE".
- **Todo el resto de la interfaz va en español.** Mantener esta convención.

## Arquitectura y dónde está cada cosa
- `app/` — rutas (App Router):
  - `/` inicio · `/test` motor del test · `/resultado` resultados (radar)
  - `/inteligencias` y `/inteligencias/[slug]` (8 páginas dinámicas)
  - `/recursos` · `/contacto`
  - `app/api/results` y `app/api/contact` — guardan en Convex si está configurado.
- `lib/intelligences.ts` — **fuente de verdad** de las 8 inteligencias
  (nombres, colores, contenido). Editar aquí para cambiar textos/estrategias.
- `lib/mckenzie.ts` — las **80 preguntas** del inventario (10 × 8). El test es
  data-driven: cambiar preguntas o escala solo aquí.
- `lib/scoring.ts` — cálculo de puntajes y dominante (con manejo de empates).
- `components/` — Navbar, Footer, RadarChart (SVG puro), VideoEmbed, etc.
- `convex/` — schema y funciones (backend).

## Colores por inteligencia (definidos en `app/globals.css`)
Reglas ESTRICTAS de la spec:
- Lingüística-Verbal → **lila medio** (`--ling`), NO púrpura.
- Lógico-Matemática → **azul marino** (`--logi`), NO azul eléctrico.
- Musical → **mostaza** (`--musi`).
Cada inteligencia tiene 3 tokens: base (`--xxx`), `--xxx-ink` (texto con
contraste AA) y `--xxx-soft` (fondo). Usar el token `ink` para texto sobre claro.

## Convex (backend) — degradación elegante
La app **funciona sin backend**: el test calcula en el cliente y el guardado es
best-effort. Convex se activa cuando existe `NEXT_PUBLIC_CONVEX_URL`.
Para activarlo:
```bash
npx convex dev      # login por navegador la primera vez; crea .env.local
```
Esto genera `convex/_generated/` (excluido del typecheck de Next a propósito).

## Contenido pendiente (placeholders a reemplazar)
- Foto de las autoras → `public/autoras.jpg` (editar `components/AuthorsPhoto.tsx`).
- Logo oficial UMSS → `public/umss-logo.png` (editar `components/UmssLogo.tsx`).
- Folleto y PDFs → `public/` (enlaces en `lib/intelligences.ts`, hoy en `"#"`).
- Enlaces de video → campo `content.videoUrl` en `lib/intelligences.ts`.
- **Revisar/validar la redacción de las 80 preguntas** de McKenzie (adaptación).

## Comandos
```bash
npm run dev     # desarrollo (localhost:3000)
npm run build   # build de producción (debe pasar sin errores)
npm run lint    # eslint
```

## Convenciones
- Mantener accesibilidad: contraste AA, `aria-*`, foco visible (ya configurado).
- No romper el idioma (francés solo en el hero; resto español).
- Antes de escribir código de Next, revisar `node_modules/next/dist/docs/` si hay
  dudas de API (esta versión tiene cambios respecto a versiones anteriores).
