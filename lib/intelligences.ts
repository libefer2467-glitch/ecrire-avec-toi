/*
  Definición de las 8 Inteligencias Múltiples (Howard Gardner).
  Cada inteligencia tiene tokens de color (definidos en globals.css),
  metadatos y contenido didáctico placeholder que Libertad y María
  reemplazarán (o editarán desde Convex) con el material real.

  NOTA PARA LAS AUTORAS: los textos de "estrategias", los enlaces de
  video y los PDFs son PROVISIONALES (placeholder). Reemplácenlos con
  el contenido definitivo de la tesis.
*/

export type IntelligenceId =
  | "linguistica"
  | "logica"
  | "musical"
  | "espacial"
  | "corporal"
  | "interpersonal"
  | "intrapersonal"
  | "naturalista";

export interface Download {
  label: string;
  href: string; // placeholder "#" hasta tener el PDF real
}

export interface Intelligence {
  id: IntelligenceId;
  /** orden en el que aparecen las preguntas del test (bloques de 10) */
  order: number;
  slug: string;
  name: string; // nombre en español
  shortName: string; // etiqueta corta para gráficos
  tagline: string;
  /** tokens CSS (ver globals.css): color base, "ink" (texto AA) y "soft" */
  colorVar: string; // e.g. var(--ling)
  inkVar: string; // e.g. var(--ling-ink)
  softVar: string; // e.g. var(--ling-soft)
  emoji: string;
  /** descripción del perfil */
  description: string;
  /** contenido de la página de detalle (placeholder) */
  content: {
    videoUrl: string | null; // embed YouTube/Vimeo (placeholder null)
    intro: string;
    strategies: { title: string; body: string }[];
    downloads: Download[];
  };
}

export const INTELLIGENCES: Intelligence[] = [
  {
    id: "linguistica",
    order: 0,
    slug: "linguistica-verbal",
    name: "Lingüística-Verbal",
    shortName: "Lingüística",
    tagline: "El poder de las palabras",
    colorVar: "var(--ling)",
    inkVar: "var(--ling-ink)",
    softVar: "var(--ling-soft)",
    emoji: "📖",
    description:
      "Sensibilidad hacia el lenguaje oral y escrito, la gramática, el vocabulario y la construcción del discurso. Aprendes contando, leyendo y escribiendo.",
    content: {
      videoUrl: null,
      intro:
        "Si tu inteligencia dominante es la lingüística-verbal, aprender a escribir en francés te resultará natural a través de la lectura y la escritura frecuente. Estas estrategias potencian tu fortaleza.",
      strategies: [
        {
          title: "Journal d'écriture (diario de escritura)",
          body: "Escribe cada día un párrafo corto en francés sobre tu rutina. La repetición fija estructuras y vocabulario.",
        },
        {
          title: "Reescritura de textos modelo",
          body: "Toma un texto breve en francés y reescríbelo con tus propias palabras para interiorizar conectores y ortografía.",
        },
        {
          title: "Listas de conectores lógicos",
          body: "Arma un banco personal de connecteurs (d'abord, ensuite, cependant…) y úsalos en cada producción.",
        },
      ],
      downloads: [{ label: "Ejercicios de escritura (PDF)", href: "#" }],
    },
  },
  {
    id: "logica",
    order: 1,
    slug: "logico-matematica",
    name: "Lógico-Matemática",
    shortName: "Lógica",
    tagline: "Orden, patrones y estructura",
    colorVar: "var(--logi)",
    inkVar: "var(--logi-ink)",
    softVar: "var(--logi-soft)",
    emoji: "🧩",
    description:
      "Razonamiento, secuencias, patrones y relaciones lógicas. Aprendes organizando, clasificando y resolviendo problemas.",
    content: {
      videoUrl: null,
      intro:
        "Con una inteligencia lógico-matemática, la escritura en francés mejora cuando la abordas como un sistema de reglas y patrones. Estas estrategias aprovechan tu pensamiento estructurado.",
      strategies: [
        {
          title: "Esquemas y mapas de conjugación",
          body: "Organiza los tiempos verbales en tablas y diagramas de flujo para deducir las reglas de formación.",
        },
        {
          title: "Estructura antes de escribir",
          body: "Planifica cada texto con un esquema (introducción → desarrollo → conclusión) numerando las ideas.",
        },
        {
          title: "Análisis de errores por categorías",
          body: "Clasifica tus errores (concordancia, tiempo, ortografía) y registra su frecuencia para atacarlos por prioridad.",
        },
      ],
      downloads: [{ label: "Plantillas de estructura textual (PDF)", href: "#" }],
    },
  },
  {
    id: "musical",
    order: 2,
    slug: "musical",
    name: "Musical",
    shortName: "Musical",
    tagline: "Ritmo, sonido y melodía",
    colorVar: "var(--musi)",
    inkVar: "var(--musi-ink)",
    softVar: "var(--musi-soft)",
    emoji: "🎵",
    description:
      "Sensibilidad al ritmo, la entonación y los sonidos. Aprendes con música, canciones y patrones sonoros.",
    content: {
      videoUrl: null,
      intro:
        "Si tu fuerte es la inteligencia musical, el ritmo y la sonoridad del francés son tus aliados. Estas estrategias vinculan la escritura con la música y la prosodia.",
      strategies: [
        {
          title: "Escribir a partir de canciones",
          body: "Transcribe letras de chansons françaises y luego redacta tu propia versión o comentario.",
        },
        {
          title: "Ritmo de la frase",
          body: "Lee tus textos en voz alta buscando la musicalidad; ajusta la puntuación según las pausas naturales.",
        },
        {
          title: "Rimas y aliteraciones",
          body: "Practica pequeños poemas o eslóganes para memorizar vocabulario mediante la sonoridad.",
        },
      ],
      downloads: [{ label: "Antología de canciones + ejercicios (PDF)", href: "#" }],
    },
  },
  {
    id: "espacial",
    order: 3,
    slug: "visual-espacial",
    name: "Visual-Espacial",
    shortName: "Espacial",
    tagline: "Imágenes, color y espacio",
    colorVar: "var(--espa)",
    inkVar: "var(--espa-ink)",
    softVar: "var(--espa-soft)",
    emoji: "🎨",
    description:
      "Pensamiento en imágenes, colores y relaciones espaciales. Aprendes visualizando, dibujando y usando mapas mentales.",
    content: {
      videoUrl: null,
      intro:
        "Con inteligencia visual-espacial, escribir en francés se facilita cuando conviertes las ideas en imágenes y organizadores visuales.",
      strategies: [
        {
          title: "Mapas mentales del texto",
          body: "Antes de redactar, dibuja un mapa mental con la idea central y las ramas de contenido.",
        },
        {
          title: "Vocabulario ilustrado",
          body: "Asocia cada palabra nueva con una imagen o color para fijarla y recuperarla al escribir.",
        },
        {
          title: "Escritura a partir de imágenes",
          body: "Describe fotografías o pinturas en francés (description d'image) para activar vocabulario visual.",
        },
      ],
      downloads: [{ label: "Organizadores gráficos (PDF)", href: "#" }],
    },
  },
  {
    id: "corporal",
    order: 4,
    slug: "corporal-cinestesica",
    name: "Corporal-Cinestésica",
    shortName: "Corporal",
    tagline: "Movimiento y acción",
    colorVar: "var(--corp)",
    inkVar: "var(--corp-ink)",
    softVar: "var(--corp-soft)",
    emoji: "🤸",
    description:
      "Aprendizaje a través del cuerpo, el movimiento y la manipulación de objetos. Aprendes haciendo y actuando.",
    content: {
      videoUrl: null,
      intro:
        "Si dominas la inteligencia corporal-cinestésica, aprender a escribir en francés funciona mejor cuando el proceso implica acción y manipulación.",
      strategies: [
        {
          title: "Tarjetas manipulables (cartes)",
          body: "Arma frases moviendo tarjetas con palabras: sujeto, verbo, complemento. La construcción física fija la sintaxis.",
        },
        {
          title: "Escritura + dramatización",
          body: "Escribe un diálogo y represéntalo; luego corrige el texto según lo que sentiste al actuarlo.",
        },
        {
          title: "Escribir a mano y en movimiento",
          body: "Alterna la escritura a mano con pausas activas; el gesto refuerza la memoria ortográfica.",
        },
      ],
      downloads: [{ label: "Actividades cinestésicas (PDF)", href: "#" }],
    },
  },
  {
    id: "interpersonal",
    order: 5,
    slug: "interpersonal",
    name: "Interpersonal",
    shortName: "Interpersonal",
    tagline: "Conexión con los demás",
    colorVar: "var(--inter)",
    inkVar: "var(--inter-ink)",
    softVar: "var(--inter-soft)",
    emoji: "🤝",
    description:
      "Capacidad para relacionarse, colaborar y comprender a otras personas. Aprendes en grupo, dialogando y enseñando.",
    content: {
      videoUrl: null,
      intro:
        "Con inteligencia interpersonal, la escritura en francés progresa en la interacción: escribir con y para otros.",
      strategies: [
        {
          title: "Escritura colaborativa",
          body: "Redacta textos en pareja o grupo, repartiendo párrafos y revisando el trabajo del otro.",
        },
        {
          title: "Correspondencia (correspondance)",
          body: "Intercambia cartas o mensajes en francés con compañeros; el destinatario real da sentido a la escritura.",
        },
        {
          title: "Revisión entre pares",
          body: "Corrige el texto de un compañero con una rúbrica compartida y recibe retroalimentación del tuyo.",
        },
      ],
      downloads: [{ label: "Dinámicas de escritura en grupo (PDF)", href: "#" }],
    },
  },
  {
    id: "intrapersonal",
    order: 6,
    slug: "intrapersonal",
    name: "Intrapersonal",
    shortName: "Intrapersonal",
    tagline: "Autoconocimiento y reflexión",
    colorVar: "var(--intra)",
    inkVar: "var(--intra-ink)",
    softVar: "var(--intra-soft)",
    emoji: "🧭",
    description:
      "Conciencia de las propias emociones, metas y procesos. Aprendes reflexionando, trabajando de forma autónoma y personalizada.",
    content: {
      videoUrl: null,
      intro:
        "Si tu inteligencia dominante es la intrapersonal, escribir en francés se potencia cuando conectas el idioma con tu mundo interior y tus metas.",
      strategies: [
        {
          title: "Journal intime en francés",
          body: "Lleva un diario personal en francés sobre tus emociones y metas de aprendizaje.",
        },
        {
          title: "Autoevaluación con rúbricas",
          body: "Evalúa tus propios textos con una rúbrica y fija objetivos personales para el siguiente escrito.",
        },
        {
          title: "Escritura reflexiva",
          body: "Redacta sobre tu proceso: qué te cuesta, qué mejoraste y por qué. La metacognición acelera el avance.",
        },
      ],
      downloads: [{ label: "Bitácora de autoevaluación (PDF)", href: "#" }],
    },
  },
  {
    id: "naturalista",
    order: 7,
    slug: "naturalista",
    name: "Naturalista",
    shortName: "Naturalista",
    tagline: "Observación del entorno",
    colorVar: "var(--natu)",
    inkVar: "var(--natu-ink)",
    softVar: "var(--natu-soft)",
    emoji: "🌿",
    description:
      "Capacidad para observar, clasificar y comprender la naturaleza y el entorno. Aprendes explorando, categorizando y conectando con el mundo natural.",
    content: {
      videoUrl: null,
      intro:
        "Con inteligencia naturalista, escribir en francés se facilita observando y clasificando el entorno como fuente de contenido.",
      strategies: [
        {
          title: "Carnet de observación",
          body: "Describe en francés lo que observas en la naturaleza o tu ciudad; clasifica el vocabulario por categorías.",
        },
        {
          title: "Campos semánticos",
          body: "Agrupa el vocabulario nuevo en familias temáticas (la nature, la ville, les animaux) como un naturalista clasifica especies.",
        },
        {
          title: "Escritura sobre el medioambiente",
          body: "Redacta textos argumentativos sobre ecología y sostenibilidad para unir tu interés natural con el francés.",
        },
      ],
      downloads: [{ label: "Fichas temáticas de vocabulario (PDF)", href: "#" }],
    },
  },
];

export const INTELLIGENCES_BY_ID: Record<IntelligenceId, Intelligence> =
  Object.fromEntries(INTELLIGENCES.map((i) => [i.id, i])) as Record<
    IntelligenceId,
    Intelligence
  >;

export function getIntelligenceBySlug(slug: string): Intelligence | undefined {
  return INTELLIGENCES.find((i) => i.slug === slug);
}
