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
- `lib/mckenzie.ts` — las **40 afirmaciones** del test (5 × 8), formato
  **Verdadero/Falso** (adaptación de Armstrong). El test es data-driven:
  cambiar preguntas o escala solo aquí. Puntaje = nº de "Verdadero" por
  inteligencia (0-5); 4-5 dominante, 3 medio, 0-2 poca.
- `lib/scoring.ts` — cálculo de puntajes y dominante (con manejo de empates).
- `components/` — Navbar, Footer, RadarChart (SVG puro), VideoEmbed, etc.
- `convex/` — schema y funciones (backend).

## Colores por inteligencia (definidos en `app/globals.css`)
Paleta OFICIAL del folleto/tesis (2026-07-11, sustituye la spec anterior):
- Verbal-Lingüística → violeta `#6A2C91` (`--ling`)
- Lógico-Matemática → azul marino `#1B4F72` (`--logi`)
- Visual-Espacial → naranja `#D96A18` (`--espa`)
- Musical-Rítmica → rojo `#B22222` (`--musi`)
- Kinestésica-Corporal → verde `#1E8449` (`--corp`)
- Intrapersonal → púrpura `#7D3C98` (`--intra`)
- Interpersonal → teal `#0E7C74` (`--inter`)
- Naturalista → verde oliva `#6B7C32` (`--natu`)
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
- Foto de las autoras → LISTA (`public/autoras.png`).
- Logos UMSS y LAEL → LISTOS (`public/umss-logo.png`, `public/lael-logo.jpg`).
- Videos por inteligencia → LISTOS (`content.videoUrl` en `lib/intelligences.ts`).
- Folleto y PDFs por inteligencia → PENDIENTES (aún no entregados por las autoras).

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
