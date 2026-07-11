# Écrire avec toi ✍️🇫🇷

Plataforma educativa interactiva que aplica la teoría de las **Inteligencias
Múltiples de Howard Gardner** a la enseñanza de la **producción escrita en
francés**, para estudiantes de 3er semestre.

> Proyecto de tesis · **Universidad Mayor de San Simón (UMSS)**
> Autoras: **Libertad Fernández** y **María Cruz Quiroz**

---

## ✨ Qué incluye

- **Test de Inteligencias Múltiples** — inventario adaptado de Walter McKenzie
  (1999), 80 preguntas (10 por inteligencia), escala Likert de 4 puntos.
- **Resultados con gráfico de radar** que resalta tu inteligencia dominante.
- **8 páginas de inteligencias** con video, estrategias de escritura en francés
  y descargas, cada una con su color.
- **Recursos** con el folleto de estrategias y material por inteligencia.
- **Contacto** (las consultas se guardan en Convex).
- Diseño accesible (contraste AA, navegación por teclado) con identidad
  boliviana sutil.

## 🧱 Stack

| Capa            | Tecnología                     |
| --------------- | ------------------------------ |
| Frontend        | Next.js 16 (App Router), React 19 |
| Estilos         | Tailwind CSS v4                |
| Backend / BD    | Convex                         |
| Despliegue      | Vercel                         |
| Lenguaje        | TypeScript                     |

## 🚀 Puesta en marcha

Requisitos: **Node.js 20+** y **npm**.

```bash
# 1. Instalar dependencias
npm install

# 2. (Opcional) Activar el backend Convex — login por navegador la 1ª vez
npx convex dev

# 3. Levantar el entorno de desarrollo
npm run dev
```

Abre <http://localhost:3000>.

> **La app funciona sin Convex.** El test se calcula en el navegador; el guardado
> de resultados y de mensajes de contacto solo se activa cuando Convex está
> configurado (ver más abajo). Sin él, la web sigue 100% usable.

## 🔌 Configurar Convex (guardar resultados y contacto)

```bash
npx convex dev
```

La primera vez pedirá iniciar sesión en el navegador y creará el archivo
`.env.local` con `NEXT_PUBLIC_CONVEX_URL`. A partir de ahí:

- Los resultados anónimos del test se guardan en la tabla `testResults`.
- Los mensajes de contacto se guardan en `contactMessages` (léelos desde el
  panel de Convex).
- El contenido didáctico editable vive en `intelligenceContent`.

Variables de entorno: ver [`.env.example`](.env.example).

## ✏️ Personalizar el contenido

Casi todo el contenido se edita en un solo lugar:

| Qué                          | Dónde |
| ---------------------------- | ----- |
| Textos, colores, estrategias, videos y descargas de las 8 inteligencias | `lib/intelligences.ts` |
| Las 80 preguntas del test    | `lib/mckenzie.ts` |
| Foto de las autoras (hero)   | `components/AuthorsPhoto.tsx` → `public/autoras.jpg` |
| Logo oficial UMSS            | `components/UmssLogo.tsx` → `public/umss-logo.png` |
| Folleto y PDFs               | `public/` (enlaces en `lib/intelligences.ts`) |
| Paleta y colores por inteligencia | `app/globals.css` |

## 📦 Scripts

```bash
npm run dev     # desarrollo
npm run build   # build de producción
npm run start   # servir el build
npm run lint    # linter
```

## ☁️ Despliegue en Vercel

El proyecto está listo para Vercel. Tras conectar el repo:

1. Importa el repositorio en <https://vercel.com>.
2. Añade la variable `NEXT_PUBLIC_CONVEX_URL` (y las de Convex) en el panel de
   Vercel una vez que hayas corrido `npx convex dev`.
3. Cada push a `main` genera un despliegue.

## 📝 Nota metodológica

Las 80 preguntas son una **adaptación y traducción al español** del *Multiple
Intelligences Inventory* de Walter McKenzie (1999), redactadas para escala
Likert. **Revísalas y ajústalas** a tu marco teórico antes de aplicarlas, y cita
la fuente en la tesis.

---

Página diseñada y elaborada por **Libertad Fernández** y **María Cruz Quiroz**.
