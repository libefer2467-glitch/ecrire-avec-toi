/*
  Definición de las 8 Inteligencias Múltiples (Howard Gardner) para
  "Écrire avec toi" (tesis UMSS — María Cruz Quiroz y Libertad Fernández).

  El contenido (frases, perfil, enfoque teórico y los 7 tips de cada
  inteligencia) proviene del folleto oficial del proyecto. Editar aquí para
  cambiar textos. Los colores viven en app/globals.css.
*/

export type IntelligenceId =
  | "linguistica"
  | "logica"
  | "espacial"
  | "musical"
  | "corporal"
  | "intrapersonal"
  | "interpersonal"
  | "naturalista";

/** Un tip práctico: qué es, por qué sirve y cómo hacerlo. */
export interface Tip {
  title: string;
  what: string; // En qué consiste
  why: string; // Por qué te sirve
  how: string; // Cómo hacerlo
  /** foto opcional (en /public) que acompaña la tarjeta del tip */
  image?: string;
  /** enlace externo opcional a un recurso mencionado en "how" (ej. una plataforma de video) */
  url?: string;
  /** texto del enlace; por defecto "Ir al recurso" */
  urlLabel?: string;
  /** foto opcional de una tarjeta pequeña al lado del tip, que también enlaza a "url" */
  resourceImage?: string;
  /** título de esa tarjeta pequeña; por defecto usa "title" */
  resourceTitle?: string;
}

/**
 * Fotos/íconos reales de una inteligencia (opcional). Mientras una
 * inteligencia no tenga fotos propias, la página usa el diseño con color
 * sólido de siempre (emoji + colorVar). En cuanto lleguen las fotos, basta
 * con completar este objeto — el template las toma automáticamente.
 */
export interface IntelligenceMedia {
  /** foto grande del hero (junto al título) */
  heroImage?: string;
  /** object-position CSS del hero, para encuadrar la cara si el recorte
   *  automático (center) la corta; ej. "center 20%" */
  heroImagePosition?: string;
  /** foto que acompaña la tarjeta de frases ("¿Te suena familiar?") */
  quotesImage?: string;
  /** fotos de apoyo para la sección de perfil/enfoque */
  sideImages?: string[];
  /** íconos de línea (chat, cuaderno, pluma…) para acentos visuales */
  icons?: string[];
}

/**
 * Juego externo (ej. Educaplay): se muestra como tarjeta con miniatura
 * que, al hacer clic, abre el juego en una pestaña nueva (no se incrusta
 * por iframe: la ventana quedaba demasiado chica para jugar bien).
 */
export interface EmbeddedGame {
  title: string;
  url: string;
  thumbnail: string;
}

/** Enlace a un recurso externo (ej. Lingolia). */
export interface ExternalResource {
  label: string;
  url: string;
  description?: string;
}

export interface Intelligence {
  id: IntelligenceId;
  order: number;
  slug: string;
  name: string; // nombre en español
  shortName: string; // etiqueta corta para gráficos
  tagline: string; // subtítulo ("Aprendes a través de…")
  colorVar: string; // token CSS base, e.g. var(--ling)
  inkVar: string; // token CSS de texto (contraste AA)
  softVar: string; // token CSS de fondo suave
  emoji: string;
  /** descripción breve (resultados / tarjetas) */
  description: string;
  /** frases en primera persona que reflejan el perfil */
  quotes: string[];
  content: {
    /** párrafo de perfil: punto fuerte y desafío */
    profile: string;
    /** enfoque/método/teoría recomendado */
    approach: { name: string; body: string };
    /** tips de escritura en francés */
    tips: Tip[];
    /** video explicativo (va al final de la sección) */
    videoUrl: string | null;
    /** frase corta y celebratoria para el banner previo al CTA final */
    banner: string;
    /** material fotográfico real (opcional, ver IntelligenceMedia) */
    media?: IntelligenceMedia;
    /** juegos externos incrustados (ej. Educaplay) */
    games?: EmbeddedGame[];
    /** enlaces a recursos externos (ej. Lingolia) */
    externalLinks?: ExternalResource[];
  };
}

export const INTELLIGENCES: Intelligence[] = [
  {
    id: "linguistica",
    order: 0,
    slug: "linguistica-verbal",
    name: "Verbal-Lingüística",
    shortName: "Verbal",
    tagline: "Aprendes a través de las palabras",
    colorVar: "var(--ling)",
    inkVar: "var(--ling-ink)",
    softVar: "var(--ling-soft)",
    emoji: "📖",
    description:
      "El lenguaje es tu terreno: vocabulario, oído para las frases y facilidad para expresarte. Aprendes leyendo, escribiendo y conversando.",
    quotes: [
      "Cuando leo algo que me gusta, me olvido de la hora.",
      "Me sale natural explicar las cosas con mis propias palabras.",
      "Si tengo que elegir entre ver un video o leer sobre el tema, elijo leer.",
    ],
    content: {
      profile:
        "Si esta es una de tus inteligencias predominantes, el lenguaje es tu terreno. Tienes recursos verbales que otros no tienen: vocabulario, oído para las frases, facilidad para expresarte. Tu punto fuerte es la materia prima; tu desafío es organizarla dentro de un texto que tenga estructura y avance con claridad.",
      approach: {
        name: "El enfoque que más te conviene: el Enfoque Comunicativo",
        body: "Formulado a partir de los trabajos de Hymes (1972) y desarrollado por Canale y Swain (1980), este enfoque sostiene que una lengua se aprende usándola para comunicarse de verdad, no memorizando reglas aisladas. Para alguien con inteligencia verbal-lingüística es el terreno ideal: mientras más uses el francés en situaciones reales (leer, escribir, conversar, discutir), más rápido vas a avanzar. Investígalo. Va a resonar contigo.",
      },
      tips: [
        {
          title: "Lee en francés por puro placer",
          what: "Elige un libro, un ensayo o una revista en francés sobre un tema que te apasione de verdad, y léelo entero. Sin diccionario en la mano, sin detenerte en cada palabra, sin estudiar gramática. Solo leer.",
          why: "La investigación sobre lectura extensiva (Krashen, 1982) muestra que la exposición sostenida a textos comprensibles y que interesan al lector produce adquisición de vocabulario y estructuras sin estudio explícito. Tu cerebro absorbe la lengua mientras persigue el contenido. Y como te gusta leer, el esfuerzo casi no se siente.",
          how: "Elige el tema primero, el libro después. ¿Te gusta la filosofía? Busca filosofía en francés. ¿El cine? Busca crítica de cine. En la Alianza Francesa de Cochabamba y en la biblioteca de la carrera de LAEL hay novelas y ensayos que puedes leer ahí mismo o llevarte prestados cumpliendo unos pocos requisitos.",
          image: "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784243109/ecrire-avec-toi/verbal/tip-1.png",
        },
        {
          title: "Escritura libre",
          what: "Elige un tema, pon el cronómetro en cinco minutos y escribe en francés sin parar. Sin corregir, sin borrar, sin preocuparte por la gramática ni por la ortografía. Si te quedas en blanco, escribe « je ne sais pas quoi écrire » hasta que aparezca una idea nueva.",
          why: "Peter Elbow (1973) demostró que separar la generación de ideas de la corrección libera al escritor del bloqueo de la página en blanco. El error paraliza; el flujo desbloquea. Después vendrá el momento de corregir, pero primero hay que tener algo que corregir.",
          how: "Hazlo antes de cualquier texto que tengas que entregar. Cinco minutos de escritura libre sobre el tema y vas a descubrir que ya tienes la mitad de las ideas. Después las ordenas.",
          image: "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784243113/ecrire-avec-toi/verbal/tip-2.png",
        },
        {
          title: "Reescribe con sinónimos",
          what: "Toma un texto que ya escribiste y reescríbelo cambiando todas las palabras que se repitan. Si usaste « parce que » tres veces, busca « puisque », « étant donné que », « car », « en raison de ».",
          why: "La riqueza léxica es uno de los criterios que más pesan al evaluar un texto. Y como el vocabulario es tu fortaleza natural, este ejercicio te hace crecer justamente donde ya eres fuerte. Además te obliga a notar tus muletillas, que todos tenemos.",
          how: "Hazlo con tus propios textos, no con textos ajenos. Es más incómodo, pero es donde realmente aprendes. Ten a mano un diccionario de sinónimos francés (los hay gratuitos en línea, como el CRISCO o el de Larousse).",
          image: "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784243116/ecrire-avec-toi/verbal/tip-4.png",
        },
        {
          title: "Lee como escritor, no solo como lector",
          what: "Cuando leas un texto en francés, subráyalo por estructura: marca dónde termina la introducción, dónde arranca cada bloque de desarrollo, dónde empieza la conclusión. Marca los conectores con otro color.",
          why: "Los escritores aprenden leyendo, pero no leyendo como lectores comunes: leyendo con el ojo puesto en cómo está construido el texto. Cuando identificas conscientemente las estructuras de otros, tu mano empieza a reproducirlas casi sin querer. Es imitación en el mejor sentido.",
          how: "Hazlo con textos que admires, no con textos cualquiera. Un buen artículo de Le Monde, un ensayo, una columna de opinión. Después, intenta escribir uno propio con la misma estructura que acabas de identificar.",
          image: "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784243120/ecrire-avec-toi/verbal/tip-5.png",
        },
        {
          title: "Conversa con una IA para aclarar tus ideas",
          what: "Antes de escribir un texto, discute el tema con una inteligencia artificial usando mensajes de voz en francés. Pídele que te contradiga, que te haga preguntas difíciles, que te obligue a defender tu posición.",
          why: "No se puede escribir bien sobre algo que no se tiene claro. Y a alguien con tu perfil, las ideas se le ordenan hablando. Discutir en voz alta te obliga a formular argumentos, encontrar ejemplos y detectar los huecos de tu razonamiento. Cuando después te sientas a escribir, ya tienes el contenido.",
          how: "Hay varias aplicaciones gratuitas con las que puedes hablar por voz en francés. Un buen arranque: « Je pense que [tu opinión]. Peux-tu me contredire et me poser des questions difficiles ? » Y después, a defenderte.",
          image: "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784243124/ecrire-avec-toi/verbal/tip-6.png",
        },
        {
          title: "Cuaderno de campos semánticos",
          what: "Cada semana, elige un campo semántico y anota diez palabras nuevas con su definición en francés, un sinónimo, un antónimo y un ejemplo de uso propio.",
          why: "Aprender palabras sueltas es ineficiente; aprenderlas agrupadas por tema las fija mucho mejor, porque el cerebro las almacena en redes. Al final del semestre tendrás un diccionario personal construido por ti, con tus temas y tus ejemplos. Es tuyo, y por eso no se olvida.",
          how: "Un campo semántico es un grupo de palabras que comparten un mismo terreno de significado. Por ejemplo, el del cine incluye: le réalisateur, le scénario, la scène, le plan, le montage, la bande sonore. El del medio ambiente: la pollution, le réchauffement, le recyclage, les déchets, la biodiversité.",
          image: "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784243128/ecrire-avec-toi/verbal/tip-7.png",
        },
      ],
      videoUrl: "https://www.youtube.com/watch?v=urmcWpdVfDg",
      banner: "¡El lenguaje te conecta con el mundo!",
      games: [
        {
          title: "Sopa de letras — Les adjectifs indéfinis",
          url: "https://www.educaplay.com/learning-resources/29640139-les_adjectifs_indefinis.html",
          thumbnail: "https://cloud.educaplay.com/r/img/actividadSOPA.webp",
        },
        {
          title: "Froggy Jumps — L'hypothèse",
          url: "https://www.educaplay.com/learning-resources/29623099-l_hypothese.html",
          thumbnail: "https://cloud.educaplay.com/r/img/actividadFROGGY_JUMPS.webp",
        },
        {
          title: "Completar frases — Comparatives and Superlatives",
          url: "https://www.educaplay.com/learning-resources/27161675-comparatives_and_superlatives.html",
          thumbnail: "https://cloud.educaplay.com/r/img/actividadCOMPLETAR.webp",
        },
      ],
      externalLinks: [
        {
          label: "Lingolia Français",
          url: "https://francais.lingolia.com/es/",
          description:
            "Página gratuita con ejercicios de gramática (conjugaciones, artículos, pronombres…) y vocabulario (sinónimos, parónimos, homófonos, vocabulario temático).",
        },
      ],
      media: {
        heroImage: "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784299366/ecrire-avec-toi/verbal/hero-v2.png",
        quotesImage:
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784071920/joven_lectora_i0gxfb.png",
        sideImages: [
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784243103/ecrire-avec-toi/verbal/apoyo-1.png",
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784243106/ecrire-avec-toi/verbal/apoyo-2.png",
        ],
        icons: [
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784055777/icon-conversacion_da2xiw.png",
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784055777/icon-cuaderno_l3ps0t.png",
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784055777/icon-pluma_xnusbb.png",
        ],
      },
    },
  },
  {
    id: "logica",
    order: 1,
    slug: "logico-matematica",
    name: "Lógico-Matemática",
    shortName: "Lógica",
    tagline: "Aprendes a través de la lógica y los patrones",
    colorVar: "var(--logi)",
    inkVar: "var(--logi-ink)",
    softVar: "var(--logi-soft)",
    emoji: "🧩",
    description:
      "Tu mente busca sistemas: necesitas entender la estructura antes de usarla. Aprendes organizando, razonando y descubriendo patrones.",
    quotes: [
      "Necesito entender la regla que hay detrás para poder aplicarla.",
      "Cuando estudio, lo primero que hago es un cuadro o un esquema.",
      "Me encanta descubrir patrones donde otros ven caos.",
      "Si algo no tiene lógica, me cuesta memorizarlo.",
      "Los rompecabezas y los acertijos me relajan.",
    ],
    content: {
      profile:
        "Si esta es una de tus inteligencias predominantes, tu mente busca sistemas. Necesitas entender la estructura antes de usarla. En francés, eso es una ventaja enorme: es una lengua con reglas muy sistemáticas, y una vez que las ves, ya no las sueltas. Tu punto fuerte es la organización lógica; tu desafío es no quedarte solo en las reglas y animarte a producir textos con contenido rico.",
      approach: {
        name: "El enfoque que más te conviene: la Instrucción con Foco en la Forma",
        body: "Michael Long (1991) propuso que la atención explícita a las estructuras gramaticales, integrada en contextos comunicativos reales, acelera el aprendizaje de una lengua. No se trata de memorizar reglas por memorizar, sino de entender el sistema y después usarlo. Para tu perfil, esta es la vía natural: primero comprendes cómo funciona, después lo aplicas.",
      },
      tips: [
        {
          title: "Textos con huecos",
          what: "Toma un texto en francés y borra sistemáticamente una palabra de cada siete. Después, intenta reconstruirlo. También puedes borrar solo un tipo de palabra: todos los conectores, o todos los verbos en pasado.",
          why: "Esta técnica, creada por Wilson Taylor (1953), obliga al cerebro a activar simultáneamente la gramática, el vocabulario y la lógica del texto para adivinar qué falta. Es como resolver una ecuación con varias incógnitas, y es exactamente el tipo de tarea en la que tu mente brilla.",
          how: "Empieza borrando solo los conectores: vas a descubrir cuáles usas de verdad y cuáles no conoces. Después sube la dificultad borrando los tiempos verbales.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784154897/reto-textos-con-huecos_ns8e1p.png",
        },
        {
          title: "Tablas de conversión verbal",
          what: "Toma una oración simple y transfórmala sistemáticamente: présent → passé composé → imparfait → plus-que-parfait → futur. Después cambia la persona. Después ponla en negativo. Después en pregunta.",
          why: "La conjugación francesa parece caótica, pero es un sistema con muy pocas excepciones reales. Cuando construyes las tablas tú mismo (en vez de leerlas hechas), el patrón se te queda grabado. Escribir con seguridad depende de tener los tiempos verbales automatizados: si tienes que parar a pensar cada verbo, pierdes el hilo de lo que querías decir.",
          how: "Cómprate una pizarra acrílica pequeña con marcadores borrables, o mete hojas bond en fundas plásticas transparentes (las fundas también se borran). Escribes, borras, vuelves a escribir. La repetición física fija el patrón. Un aliado perfecto es el Bescherelle, el clásico libro rojo de conjugación francesa (Hatier): 105 tablas modelo que cubren todos los verbos.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784268923/ecrire-avec-toi/logico/tablas.png",
        },
        {
          title: "Listas y categorías antes de escribir",
          what: "Antes de redactar, haz una lista simple de todas las ideas que se te ocurran sobre el tema, en el orden en que aparezcan. Después márcalas con símbolos para agruparlas: un asterisco a las causas, un más a las consecuencias, un círculo a los ejemplos.",
          why: "Es la variante ordenada de la lluvia de ideas clásica (Osborn, 1953). A diferencia del mapa mental, que exige conectar todo desde el principio, la lista te deja generar primero y ordenar después. Es menos intimidante y encaja mejor con una mente que primero recolecta y luego clasifica.",
          how: "Regla de oro de la lluvia de ideas: mientras generas ideas, no juzgues ninguna. Ni siquiera las tontas. La censura viene después, en el momento de clasificar.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784268926/ecrire-avec-toi/logico/listas-categorias.png",
        },
        {
          title: "Esquema con cajas y flechas",
          what: "Antes de escribir, dibuja la arquitectura del texto: [Idea central] → [Argumento 1 → ejemplo] → [Argumento 2 → ejemplo] → [Conclusión]. Cada caja es un párrafo. Cada flecha es una transición.",
          why: "Flower y Hayes (1981) mostraron que los escritores que planifican producen textos más coherentes que los que escriben directamente. Y para tu perfil, planificar visualmente con una estructura lógica es lo más natural del mundo. El esquema te evita perder el hilo mientras escribes.",
          how: "Escribe primero el esquema completo. Recién cuando esté cerrado, empieza a redactar. Vas a notar que la redacción sale mucho más rápido, porque ya sabes exactamente qué toca en cada párrafo.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784268929/ecrire-avec-toi/logico/esquema-planificar.png",
        },
        {
          title: "Prompts estructurados para la IA",
          what: "Usa la inteligencia artificial, pero con precisión quirúrgica. No le preguntes « explícame el subjuntivo ». Pídele: « Dame una tabla comparativa entre el subjonctif présent y l'indicatif, con cinco ejemplos de cada uno, y una regla clara para saber cuándo usar cada uno. »",
          why: "La calidad de la respuesta depende de la calidad de la pregunta. Alguien con tu perfil puede sacarle mucho más provecho a una IA que la mayoría, porque sabe formular peticiones estructuradas. Pide tablas, reglas, comparaciones, contraejemplos. Es tu lenguaje.",
          how: "Tres prompts útiles: « Fais-moi un tableau comparatif de X et Y avec cinq exemples. » / « Quelle est la règle générale pour X ? Donne-moi les exceptions. » / « Voici mon texte. Analyse uniquement les erreurs de temps verbaux et explique la règle de chacune. »",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784268933/ecrire-avec-toi/logico/prompts-ia.png",
        },
        {
          title: "Analiza tus errores como un sistema",
          what: "Lleva un registro de tus errores en francés y clasifícalos por tipo: errores de género, de concordancia, de tiempo verbal, de preposición, de pronombre relativo. Al cabo de unas semanas, cuenta cuántos hay de cada tipo.",
          why: "Tus errores no son aleatorios: son sistemáticos, y siguen patrones. Cuando los clasificas, dejas de ver un montón de correcciones sueltas en rojo y empiezas a ver dos o tres problemas de fondo que se repiten. Y esos sí se pueden atacar.",
          how: "Haz una tabla de tres columnas: lo que escribí / lo correcto / el tipo de error. Después de veinte entradas, mira cuál tipo domina. Ese es tu punto ciego, y ahí es donde tienes que trabajar.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784268936/ecrire-avec-toi/logico/analiza-errores.png",
        },
      ],
      videoUrl: "https://www.youtube.com/watch?v=R5cVJi7Chlw&t=2041s",
      banner: "¡La lógica te ayuda a resolverlo todo!",
      media: {
        heroImage:
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784223346/ecrire-avec-toi/logico-hero-v3.png",
      },
    },
  },
  {
    id: "espacial",
    order: 2,
    slug: "visual-espacial",
    name: "Visual-Espacial",
    shortName: "Espacial",
    tagline: "Aprendes a través de los ojos",
    colorVar: "var(--espa)",
    inkVar: "var(--espa-ink)",
    softVar: "var(--espa-soft)",
    emoji: "🎨",
    description:
      "Piensas en imágenes y necesitas ver la información distribuida en el espacio. Aprendes visualizando, dibujando y usando colores.",
    quotes: [
      "Si no lo veo dibujado, no lo entiendo del todo.",
      "Mis apuntes son un festival de colores y resaltadores.",
      "Recuerdo dónde estaba una información en la página, aunque no recuerde qué decía.",
      "Cuando explico algo, termino dibujando.",
      "Prefiero un diagrama antes que tres párrafos de explicación.",
    ],
    content: {
      profile:
        "Si esta es una de tus inteligencias predominantes, piensas en imágenes. Necesitas ver la información distribuida en el espacio para poder procesarla. Tu punto fuerte es la organización visual del contenido; tu desafío es traducir esa organización espacial a un texto que, por naturaleza, es lineal: una palabra detrás de otra.",
      approach: {
        name: "La teoría que te respalda: la codificación dual",
        body: "Allan Paivio (1971) demostró que la información que se procesa por dos canales simultáneos (el verbal y el visual) se recuerda mucho mejor que la que entra por uno solo. Richard Mayer (2009) llevó esta idea al aprendizaje multimedia y confirmó que combinar palabras e imágenes mejora la comprensión y la retención. Traducción para ti: cada vez que acompañes una palabra en francés con una imagen, un color o un esquema, la estás fijando el doble.",
      },
      tips: [
        {
          title: "Mapas mentales antes de escribir",
          what: "Antes de redactar, dibuja el texto. En el centro, el tema. De ahí salen ramas gruesas con las ideas principales. De cada rama salen ramas más finas con los ejemplos y los detalles. Usa colores distintos para cada rama.",
          why: "El mapa mental es una de las técnicas de generación de ideas más eficaces para quienes piensan visualmente. Te permite ver todo el contenido de un vistazo antes de linealizarlo, y eso reduce mucho el riesgo de perderte a mitad de camino o de olvidar una idea importante.",
          how: "Hay dos tipos de mapa mental y los dos sirven: el de palabras (con conceptos escritos) y el de dibujos (donde cada idea es una imagen). Prueba los dos y quédate con el que te salga más natural. Si tu mapa termina siendo casi puro dibujo, está perfecto.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784172727/ecrire-avec-toi/visual-espacial/reto-mapas-mentales.png",
        },
        {
          title: "Código de colores por función",
          what: "Cuando revises un texto tuyo, subráyalo con colores según la función de cada parte. Rojo para las ideas principales. Verde para los ejemplos. Azul para los conectores. Amarillo para las opiniones.",
          why: "El color convierte una estructura abstracta en algo que puedes ver. De un vistazo, tu texto te muestra si le falta algo: si no hay verde, faltan ejemplos; si hay poco azul, el texto está desconectado; si todo es rojo, estás afirmando sin sustentar.",
          how: "Ten siempre a mano un juego de tres o cuatro resaltadores. Aplica el mismo código de colores siempre, para que se te vuelva automático. También sirve al revés: aplícalo a textos ajenos que admires, y vas a ver cómo están construidos.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784172731/ecrire-avec-toi/visual-espacial/reto-codigo-colores.png",
        },
        {
          title: "Describe imágenes en francés",
          what: "Elige una fotografía cualquiera (un edificio, un paisaje, una escena callejera, una obra de arte) y descríbela por escrito en francés con el mayor detalle que puedas. Qué se ve, en qué plano, qué colores, qué texturas, qué relación espacial hay entre los elementos.",
          why: "Describir es una de las mejores puertas de entrada a la escritura para tu perfil, porque parte de donde eres fuerte: lo que ves. Además te obliga a usar preposiciones de lugar, pronombres relativos y vocabulario preciso, que son justamente los puntos que más cuestan.",
          how: "Empieza con imágenes muy visuales y ordenadas (una fachada, un cuadro) y ve subiendo a escenas complejas (una calle llena de gente). Un truco: descríbela primero de arriba a abajo, después de izquierda a derecha, después del centro hacia afuera. Vas a producir tres textos distintos de la misma imagen.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784172735/ecrire-avec-toi/visual-espacial/reto-describe-imagenes.png",
        },
        {
          title: "Ve películas y series con subtítulos en francés",
          what: "Mira contenido audiovisual en francés con los subtítulos también en francés (nunca en castellano). Anota las frases que te llamen la atención y, al lado, haz un pequeño dibujo o esquema de la escena.",
          why: "Ver con subtítulos en la lengua meta conecta lo que oyes con lo que ves escrito, y ese doble canal es exactamente lo que la codificación dual predice que funciona mejor. El dibujo al lado ancla la frase a una imagen concreta, y así se te queda.",
          how: "TV5Monde tiene una plataforma completamente gratuita para aprender francés a partir de videos, series y reportajes, con más de dos mil ejercicios en línea organizados por nivel. Es probablemente el mejor recurso gratuito que existe para esto. Y si quieres ver películas completas en francés, TV5MONDEplus tiene un catálogo gratuito.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784172739/ecrire-avec-toi/visual-espacial/reto-peliculas-series.png",
          url: "https://www.tv5mondeplus.com/es/films",
          urlLabel: "Ver películas en francés →",
          resourceImage:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784491733/ecrire-avec-toi/visual-espacial/reto-peliculas-recurso.png",
          resourceTitle: "Películas en francés",
        },
        {
          title: "Infografías de gramática hechas por ti",
          what: "En vez de estudiar los tiempos verbales leyendo listas, dibuja tu propia infografía: una línea de tiempo horizontal donde ubiques el passé composé, el imparfait y el plus-que-parfait según cuándo ocurre cada acción.",
          why: "Los conceptos temporales del francés son, en el fondo, conceptos espaciales: qué pasó antes, qué pasó durante, qué pasó después. Cuando los dibujas sobre una línea, dejan de ser reglas abstractas y se convierten en algo que puedes ver. Y lo que hiciste tú se recuerda mucho mejor que lo que copiaste.",
          how: "Hazla grande, en una hoja entera, con colores. Pégala en la pared donde estudias. La vas a mirar cien veces sin darte cuenta, y ese es justamente el punto.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784269396/ecrire-avec-toi/visual-espacial/reto-infografias-v2.png",
        },
        {
          title: "El storyboard de tu texto",
          what: "Antes de escribir, dibuja tu texto como si fuera una historieta: una viñeta por párrafo. En cada viñeta, un dibujo rápido de lo que va a decir ese párrafo y una frase corta que resuma la idea.",
          why: "Es planificación visual pura. Te obliga a decidir cuántos párrafos vas a tener y qué va en cada uno antes de escribir la primera palabra. Y como cada viñeta tiene que contener una sola idea, previene el error más común: el párrafo que mezcla tres temas.",
          how: "Regla simple: si no puedes dibujar el párrafo en una viñeta, es porque tiene más de una idea. Divídelo en dos.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784269399/ecrire-avec-toi/visual-espacial/reto-storyboard-v2.png",
        },
      ],
      videoUrl: "https://www.youtube.com/watch?v=082GFQRakz0",
      banner: "¡Tu imaginación no tiene límites!",
      media: {
        heroImage:
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784475173/ecrire-avec-toi/visual-espacial/hero-v3.png",
        heroImagePosition: "center 22%",
      },
    },
  },
  {
    id: "musical",
    order: 3,
    slug: "musical",
    name: "Musical-Rítmica",
    shortName: "Musical",
    tagline: "Aprendes a través del oído",
    colorVar: "var(--musi)",
    inkVar: "var(--musi-ink)",
    softVar: "var(--musi-soft)",
    emoji: "🎵",
    description:
      "Tienes oído, no solo para la música sino para el lenguaje: percibes el ritmo de las frases y retienes lo que escuchas. Aprendes con sonido y ritmo.",
    quotes: [
      "Me aprendo las canciones sin proponérmelo.",
      "Cuando algo suena mal, lo noto aunque no sepa explicar por qué.",
      "Necesito música de fondo para concentrarme.",
      "Si leo en voz alta, entiendo mejor.",
      "Recuerdo el tono con que alguien me dijo algo, más que las palabras exactas.",
    ],
    content: {
      profile:
        "Si esta es una de tus inteligencias predominantes, tienes oído. No solo para la música: para el lenguaje. Percibes el ritmo de las frases, notas cuando algo suena forzado, retienes lo que escuchas casi sin esfuerzo. Tu punto fuerte es la memoria auditiva; tu desafío es trasladar al papel eso que tu oído ya reconoce.",
      approach: {
        name: "El método que más te conviene: la Sugestopedia",
        body: "Georgi Lozanov (1978) desarrolló un método de enseñanza de lenguas basado en el uso de la música, el ritmo y la relajación para facilitar la adquisición. Su premisa es que el cerebro absorbe mejor cuando está relajado y cuando la información llega envuelta en un ritmo. Para tu perfil, esto no es una teoría exótica: es la descripción de cómo ya aprendes. Investígalo.",
      },
      tips: [
        {
          title: "Dictado: escucha y escribe",
          what: "Consigue un audio corto en francés (un párrafo, un fragmento de video, una noticia de un minuto). Escúchalo tres veces: la primera para entender de qué va, la segunda escribiendo lo que oyes, la tercera para corregir lo que te faltó. Después compara con el original.",
          why: "El dictado es una de las técnicas más antiguas y más eficaces que existen, y ha sido revalorizada por la investigación reciente (Davis y Rinvolucri, 1988). Obliga a atender simultáneamente a la ortografía, la gramática, la puntuación y el vocabulario. Y para ti, que entras por el oído, es la vía directa entre lo que escuchas y lo que escribes.",
          how: "Los audios de TV5Monde son perfectos para esto: son cortos, están graduados por nivel y vienen con la transcripción, así que puedes verificar tu trabajo de inmediato.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784172761/ecrire-avec-toi/musical-ritmica/reto-dictado.png",
        },
        {
          title: "Canciones francófonas, pero con cuidado",
          what: "Elige una canción francesa, transcríbela de oído, y después marca todos los verbos en pasado. Analiza si están en passé composé o en imparfait, y por qué.",
          why: "Las canciones se te quedan grabadas sin esfuerzo, y con ellas se quedan las estructuras gramaticales que contienen. Es aprendizaje casi involuntario. Pero hay una trampa: muchas canciones están en registro informal y contienen errores deliberados, elisiones y licencias poéticas. Si copias esas estructuras en un texto académico, te va a costar caro.",
          how: "Elige canciones con letra cuidada: la chanson française clásica (Brel, Brassens, Piaf, Barbara) suele tener una lengua muy correcta y rica. Si dudas de si una construcción es correcta, pregúntale a una IA: « Cette phrase de la chanson est-elle grammaticalement correcte en français standard ? »",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784172765/ecrire-avec-toi/musical-ritmica/reto-canciones-francofonas.png",
        },
        {
          title: "Lee en voz alta cuando revises",
          what: "Nunca entregues un texto sin haberlo leído en voz alta. Tu oído va a detectar lo que tus ojos no vieron: frases demasiado largas, conectores repetidos, palabras que no cuajan, ritmos que se traban.",
          why: "Este es probablemente el mejor reto de esta sección, y el más subestimado. Tu oído para el lenguaje es una herramienta de corrección de primer nivel. Si al leer una frase te quedas sin aire, es demasiado larga. Si algo suena repetitivo, es repetitivo. Si tropiezas al leer, el lector también va a tropezar.",
          how: "Léelo en voz alta de verdad, no mentalmente. La diferencia es enorme. Y si puedes, grábate y escúchate después: vas a oír cosas que ni siquiera notaste mientras leías.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784172769/ecrire-avec-toi/musical-ritmica/reto-lee-en-voz-alta.png",
        },
        {
          title: "Convierte una canción en narración",
          what: "Toma una canción francesa que cuente una historia y reescríbela como un relato en tercera persona, usando passé composé para las acciones y imparfait para las descripciones y el contexto.",
          why: "Es la manera más natural de interiorizar la diferencia entre los dos tiempos del pasado, una de las dificultades más grandes del francés para los hispanohablantes. Partes de algo que ya tienes en la cabeza (la canción) y lo transformas. El contenido ya está; solo tienes que reorganizarlo gramaticalmente.",
          how: "Empieza con canciones narrativas claras, que cuenten una historia con principio y final. Después de reescribirlas, léelas en voz alta y verifica que la alternancia de tiempos suene natural.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784172773/ecrire-avec-toi/musical-ritmica/reto-cancion-a-narracion.png",
        },
        {
          title: "Juega con la intervención textual",
          what: "Toma un poema o una canción breve en francés y reescríbelo cambiando palabras, manteniendo la rima o el ritmo. Con cambiar una palabra o un signo de puntuación alcanza para transformar el texto en algo nuevo.",
          why: "La intervención textual (Pope, 1995) parte de una idea simple y potente: se entiende cómo funciona un texto cuando se lo manipula. Al cambiar palabras conservando el ritmo, tienes que entender simultáneamente el significado, la métrica y la gramática. Y como tienes oído, el ritmo te va a guiar solo.",
          how: "Prueba con poemas cortos y conocidos. Cambia los sustantivos manteniendo la estructura, y verás cómo el poema se convierte en otra cosa sin dejar de sonar bien. Es un juego, pero un juego que enseña muchísimo.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784172777/ecrire-avec-toi/musical-ritmica/reto-intervencion-textual.png",
        },
        {
          title: "Escucha podcasts y transcribe fragmentos",
          what: "Escucha podcasts en francés sobre temas que te interesen. Elige un fragmento de treinta segundos, transcríbelo palabra por palabra, y después escribe un párrafo comentando lo que dijeron.",
          why: "Los podcasts te dan francés real, hablado a velocidad natural, sobre temas que importan. Transcribir un fragmento corto te obliga a un nivel de precisión que la escucha pasiva nunca exige. Y el párrafo de comentario convierte la escucha en escritura, que es el puente que necesitas construir.",
          how: "Empieza con podcasts hechos para estudiantes de francés, que hablan más lento. Después pasa a podcasts para nativos. Verás que en pocas semanas entiendes cosas que al principio te parecían un muro.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784172781/ecrire-avec-toi/musical-ritmica/reto-podcasts.png",
        },
      ],
      videoUrl: "https://www.youtube.com/watch?v=fj5A6jEUhQw",
      banner: "¡El ritmo te acompaña en cada palabra!",
      media: {
        heroImage:
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784172757/ecrire-avec-toi/musical-ritmica/hero.png",
        heroImagePosition: "center 25%",
      },
    },
  },
  {
    id: "corporal",
    order: 4,
    slug: "corporal-cinestesica",
    name: "Kinestésica-Corporal",
    shortName: "Corporal",
    tagline: "Aprendes con el cuerpo",
    colorVar: "var(--corp)",
    inkVar: "var(--corp-ink)",
    softVar: "var(--corp-soft)",
    emoji: "🤸",
    description:
      "Tu cuerpo participa del aprendizaje: necesitas moverte, tocar y manipular. Lo que haces físicamente no se te olvida.",
    quotes: [
      "Estudiar sentado y quieto me resulta un suplicio.",
      "Pienso mejor cuando camino.",
      "Necesito manipular las cosas para entenderlas.",
      "Hablo con las manos, siempre.",
      "Si algo lo hice con el cuerpo, no se me olvida.",
    ],
    content: {
      profile:
        "Si esta es una de tus inteligencias predominantes, tu cuerpo participa del aprendizaje. Necesitas moverte, tocar, manipular. Estar sentado tres horas frente a un libro es tu peor escenario. Tu punto fuerte es que lo que haces físicamente no se te olvida; tu desafío es sostener la quietud que exige el acto de escribir.",
      approach: {
        name: "El método que más te conviene: Total Physical Response",
        body: "James Asher (1969) desarrolló un método de enseñanza de lenguas en el que el aprendizaje se produce a través del movimiento corporal. Su hallazgo central es que la memoria de una palabra o estructura se fija mucho mejor cuando el cuerpo participa en su adquisición. Para tu perfil, esto significa algo muy concreto: cada vez que puedas mover algo, moverte o manipular físicamente el lenguaje, hazlo. Va a funcionar.",
      },
      tips: [
        {
          title: "Dictado corriendo",
          what: "Pega un texto en francés en una pared lejana de donde estás sentado. Camina hasta ahí, memoriza una frase, vuelve corriendo a tu mesa y escríbela. Regresa por la siguiente. Repite hasta reconstruir todo el texto.",
          why: "Combina movimiento, memoria de corto plazo y escritura en una sola actividad. Y funciona brutalmente bien para tu perfil, porque convierte una tarea sedentaria (copiar un texto) en una tarea física. Además te obliga a retener la frase completa en la cabeza, lo que fortalece la memoria de trabajo.",
          how: "Hazlo con un compañero y compitan por quién reconstruye el texto primero, sin errores. Y una advertencia sensata: revisa que no haya obstáculos en el camino. Nadie quiere terminar en la enfermería por un dictado.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174482/ecrire-avec-toi/corporal/reto-dictado-corriendo.png",
        },
        {
          title: "Flashcards que tú mismo recortas",
          what: "Imprime, recorta y arma tus propias tarjetas de vocabulario, conectores o estructuras. En un lado la palabra en francés, en el otro el significado y un ejemplo de uso. Manipúlalas: sepáralas en montones, clasifícalas, mézclalas.",
          why: "Para casi todos los perfiles, las flashcards son útiles. Para el tuyo, son doblemente útiles, porque el acto de recortarlas, doblarlas, ordenarlas y moverlas ya es parte del aprendizaje. El movimiento de las manos ancla el contenido antes incluso de que empieces a estudiarlo.",
          how: "No las compres hechas. Hazlas tú. El trabajo manual de producirlas es la mitad del beneficio. Divídelas en tres montones: las que sé, las que dudo, las que no sé. Y cada día, mueve las tarjetas de un montón a otro.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174486/ecrire-avec-toi/corporal/reto-flashcards.png",
        },
        {
          title: "Post-its para armar la estructura",
          what: "Escribe cada idea de tu texto en un post-it distinto: la idea principal, cada argumento, cada ejemplo, la conclusión. Después, pégalos en una mesa o en la pared y muévelos hasta encontrar el orden que mejor funcione.",
          why: "Planificar un texto es, en el fondo, decidir un orden. Y cuando ese orden lo puedes tocar, moverlo, reorganizarlo físicamente, la decisión se vuelve mucho más fácil. Ves de inmediato qué idea sobra, cuál falta, cuál está en el lugar equivocado.",
          how: "Prueba al menos dos ordenamientos distintos antes de decidir. Vas a descubrir que el orden que se te ocurrió primero casi nunca es el mejor.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174490/ecrire-avec-toi/corporal/reto-postits.png",
        },
        {
          title: "Planifica caminando",
          what: "Cuando tengas que escribir sobre algo, no te sientes de entrada. Sal a caminar diez o quince minutos pensando en el tema. Graba tus ideas con el celular, en francés, mientras caminas. Después sí, siéntate a escribir.",
          why: "El movimiento activa el pensamiento. No es una metáfora: hay evidencia de que caminar mejora la fluidez de ideas. Y para tu perfil, obligarte a estar sentado antes de tener las ideas es la receta perfecta para el bloqueo. Primero muévete, después escribe.",
          how: "Grabar en francés mientras caminas tiene un beneficio extra: te obliga a formular en la lengua meta desde el principio, en vez de pensar en castellano y traducir después. Cuando llegues a la mesa, transcribe lo que grabaste y ya tienes el borrador.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174495/ecrire-avec-toi/corporal/reto-caminando.png",
        },
        {
          title: "Actúa antes de escribir",
          what: "Si tienes que escribir un diálogo, una escena o una situación, actúala primero. En voz alta, con gestos, moviéndote. Solo o con alguien más. Después siéntate y escríbela.",
          why: "El principio del Total Physical Response llevado a la escritura: el movimiento del cuerpo sugiere las palabras. Cuando actúas una escena, tu cuerpo encuentra las expresiones que tu mente no encontraba sentada. Y después, escribir es simplemente transcribir algo que ya sucedió.",
          how: "Después de actuarla, pasa el diálogo al discurso indirecto (« Il m'a dit qu'il ne voulait pas… »). Es un ejercicio doble: primero produces el contenido con el cuerpo, después lo transformas gramaticalmente.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174501/ecrire-avec-toi/corporal/reto-actua.png",
        },
        {
          title: "Escribe a mano, en superficies que se borran",
          what: "Consigue una pizarra acrílica pequeña o mete hojas en fundas plásticas transparentes. Escribe con marcador borrable. Escribe, borra, vuelve a escribir.",
          why: "Escribir a mano activa el cuerpo de una manera que teclear no logra. Y poder borrar de inmediato quita el peso del error: si te equivocaste, borras y ya. Esa libertad hace que escribas más y con menos miedo, que es exactamente lo que necesitas.",
          how: "Úsalo sobre todo para practicar conjugaciones y estructuras que quieres automatizar. La repetición física, con el marcador en la mano, fija los patrones mucho más rápido que leerlos en una tabla.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174506/ecrire-avec-toi/corporal/reto-pizarra.png",
        },
      ],
      videoUrl: "https://www.youtube.com/watch?v=8ag_31qyHW8",
      banner: "¡Aprende moviéndote, escribe sintiendo!",
      media: {
        heroImage:
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174478/ecrire-avec-toi/corporal/hero.png",
      },
    },
  },
  {
    id: "intrapersonal",
    order: 5,
    slug: "intrapersonal",
    name: "Intrapersonal",
    shortName: "Intrapersonal",
    tagline: "Aprendes conociéndote a ti mismo",
    colorVar: "var(--intra)",
    inkVar: "var(--intra-ink)",
    softVar: "var(--intra-soft)",
    emoji: "🧭",
    description:
      "Sabes cómo funciona tu propia mente: reconoces cuándo entendiste y te evalúas con honestidad. Tu fuerte es la metacognición.",
    quotes: [
      "Necesito silencio y soledad para concentrarme de verdad.",
      "Sé perfectamente cuándo entendí algo y cuándo estoy fingiendo que lo entendí.",
      "Pienso mucho sobre lo que siento y por qué lo siento.",
      "Prefiero trabajar solo: en grupo pierdo tiempo.",
      "Llevo registro de mis avances, aunque nadie me lo pida.",
    ],
    content: {
      profile:
        "Si esta es una de tus inteligencias predominantes, tienes acceso a algo que muchos no tienen: sabes cómo funciona tu propia mente. Reconoces cuándo entendiste y cuándo no. Puedes evaluarte con honestidad. Tu punto fuerte es la metacognición, la capacidad de pensar sobre tu propio pensamiento, y es una de las herramientas más poderosas que existen para aprender.",
      approach: {
        name: "El método que más te conviene: el Método Silencioso",
        body: "Caleb Gattegno (1963) creó un método de enseñanza de lenguas donde el profesor habla lo mínimo posible y el estudiante descubre por sí mismo. Se basa en un ambiente preparado, silencioso y sin ruido, donde el aprendiz se hace responsable de su propio proceso. También John Flavell (1979), al definir la metacognición, mostró que quienes monitorean conscientemente su propio aprendizaje avanzan más rápido que quienes no lo hacen. Los dos hablan de ti.",
      },
      tips: [
        {
          title: "El diario DIE: describe, interpreta, evalúa",
          what: "Lleva un diario de escritura en francés siguiendo tres pasos. Primero describe una experiencia con la mayor objetividad posible. Después interprétala: ¿qué significó para ti? Y al final evalúala: ¿qué sentiste, qué piensas ahora al respecto?",
          why: "La técnica DIE (Describe, Interpret, Evaluate) separa tres operaciones mentales que solemos mezclar: los hechos, la interpretación y el juicio. Escribir separándolas te obliga a un nivel de precisión que la escritura espontánea no exige. Y como tu fortaleza es la reflexión, este es tu terreno.",
          how: "Elige tú el tema. Puede ser cualquier cosa que te haya sorprendido, molestado, intrigado o alegrado. La única regla es escribir en francés y respetar los tres pasos en orden. No corrijas mientras escribes; corrige después.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174860/ecrire-avec-toi/intrapersonal/reto-diario-die.png",
        },
        {
          title: "Explícate a ti mismo antes de escribir",
          what: "Antes de escribir sobre un tema, explícatelo a ti mismo en voz alta, en francés. Puede ser frente al espejo, caminando por la habitación, o simplemente hablando solo. Si logras explicarlo con claridad, estás listo para escribir. Si te trabas, todavía no lo entendiste.",
          why: "La investigación sobre autoexplicación (Chi y colaboradores, 1994) demostró que explicarse a uno mismo lo que se está aprendiendo mejora la comprensión más que releer o subrayar. Y hay algo más: la autoexplicación es un detector de mentiras infalible. Puedes engañar a otros sobre si entendiste algo. A ti mismo, no.",
          how: "Cronométrate: tres minutos explicando el tema en francés, sin parar. Si te quedaste sin palabras al minuto y medio, todavía no tienes suficiente material. Vuelve a leer y prueba otra vez.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174864/ecrire-avec-toi/intrapersonal/reto-explicate.png",
        },
        {
          title: "Prepara el ambiente antes de escribir",
          what: "Antes de sentarte a escribir, prepara el espacio. Ordena la mesa. Apaga las notificaciones. Pon música suave o silencio total. Enciende una luz cálida. Prepárate un té. Crea un ambiente que le diga a tu cerebro: acá se escribe.",
          why: "Este es el principio central del método silencioso de Gattegno, y funciona especialmente bien con tu perfil. Necesitas quietud, orden y ausencia de interrupciones para que tu mente rinda. Un espacio caótico produce una escritura caótica.",
          how: "Repite el mismo ritual cada vez. El cerebro asocia el ambiente con la actividad, y al cabo de un tiempo, apenas prepares el espacio, tu mente va a entrar sola en modo escritura.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174868/ecrire-avec-toi/intrapersonal/reto-ambiente.png",
        },
        {
          title: "Autoevalúate con una rúbrica",
          what: "Antes de entregar un texto, evalúalo tú mismo con una rúbrica. Pon una nota a cada criterio: contenido, coherencia, cohesión, vocabulario, gramática, ortografía. Sé honesto.",
          why: "Ser capaz de evaluar tu propio trabajo con criterios objetivos es una habilidad rara y valiosa, y tu perfil la tiene naturalmente. Además, cuando revisas con una rúbrica en la mano, dejas de leer « a ver si está bien » y pasas a revisar criterio por criterio, que es mucho más eficaz.",
          how: "Un truco: deja el texto reposar al menos unas horas antes de autoevaluarlo. Recién escrito, todavía lo lees con los ojos de quien lo escribió. Al día siguiente, lo lees con los ojos de un lector.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174872/ecrire-avec-toi/intrapersonal/reto-rubrica.png",
        },
        {
          title: "Escritura libre sin corrector",
          what: "Escribe en francés durante cinco o diez minutos sin parar, sin corregir, sin borrar. No importa la gramática ni la ortografía. Solo que fluya.",
          why: "Peter Elbow (1973) mostró que separar el momento de generar del de corregir libera al escritor. Y aunque tu tendencia natural sea revisar y evaluar constantemente (porque eres bueno en eso), a veces ese mismo rigor te paraliza. La escritura libre es tu antídoto: un espacio donde nada puede estar mal.",
          how: "Ponte un cronómetro y no levantes la mano del papel hasta que suene. Si te quedas sin ideas, escribe « je ne sais pas quoi écrire, je ne sais pas quoi écrire » hasta que aparezca algo. Siempre aparece.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174876/ecrire-avec-toi/intrapersonal/reto-libre.png",
        },
        {
          title: "Fija tus propias metas y sigue tu progreso",
          what: "Define una meta concreta de escritura para el mes: por ejemplo, « escribir tres textos de 300 palabras », o « eliminar mis errores con los pronombres relativos ». Anótala. Al final del mes, evalúa si la cumpliste.",
          why: "Las metas propias motivan mucho más que las impuestas desde afuera, sobre todo para alguien con tu perfil, que funciona con autonomía. Y el seguimiento explícito convierte el aprendizaje en algo visible: puedes ver que avanzaste, y eso alimenta las ganas de seguir.",
          how: "Hazlas específicas y medibles. « Mejorar mi francés » no es una meta: es un deseo. « Escribir un texto de 300 palabras cada semana durante un mes » sí es una meta, porque puedes saber con certeza si la cumpliste o no.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174881/ecrire-avec-toi/intrapersonal/reto-metas.png",
        },
      ],
      videoUrl: "https://www.youtube.com/watch?v=egLptXb99U8",
      banner: "¡Conócete y escribe con propósito!",
      media: {
        heroImage:
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784174851/ecrire-avec-toi/intrapersonal/hero.png",
      },
    },
  },
  {
    id: "interpersonal",
    order: 6,
    slug: "interpersonal",
    name: "Interpersonal",
    shortName: "Interpersonal",
    tagline: "Aprendes con los otros",
    colorVar: "var(--inter)",
    inkVar: "var(--inter-ink)",
    softVar: "var(--inter-soft)",
    emoji: "🤝",
    description:
      "Las otras personas son tu combustible: aprendes conversando, explicando y colaborando. Tu fuerte es el intercambio.",
    quotes: [
      "Estudiar solo me aburre; en grupo se me pasa volando.",
      "Cuando le explico algo a alguien, recién ahí lo entiendo bien.",
      "Me doy cuenta de cómo está alguien apenas lo veo.",
      "Hago amigos con facilidad en cualquier lado.",
      "Si hay un conflicto, termino haciendo de mediador.",
    ],
    content: {
      profile:
        "Si esta es una de tus inteligencias predominantes, las otras personas son tu combustible. Aprendes conversando, explicando, discutiendo, colaborando. En un aula, eres quien conecta. Tu punto fuerte es el intercambio; tu desafío es que la escritura, por naturaleza, es una actividad solitaria. La buena noticia es que se puede volver social.",
      approach: {
        name: "El enfoque que más te conviene: el Aprendizaje Cooperativo",
        body: "David y Roger Johnson (1999) demostraron que el trabajo cooperativo bien estructurado produce mejores resultados de aprendizaje que el trabajo individual o competitivo. Y en el terreno de la escritura, la perspectiva sociocultural de Lev Vygotsky sostiene algo aún más fuerte: aprendemos primero con otros, y solo después somos capaces de hacerlo solos. La revisión entre compañeros no es una muleta: es el camino natural hacia la autonomía.",
      },
      tips: [
        {
          title: "Revisión entre compañeros con lista de cotejo",
          what: "Intercambia tu texto con un compañero. Cada uno revisa el del otro con una lista de cotejo objetiva: ¿hay una idea principal clara? ¿los argumentos tienen ejemplos? ¿los conectores son variados? ¿la conclusión cierra o queda colgando?",
          why: "Vygotsky explicaría que revisar el texto de otro te enseña a revisar el tuyo. Al aplicar criterios sobre un texto ajeno, esos criterios se interiorizan, y con el tiempo empiezas a aplicarlos automáticamente sobre lo que tú escribes. Es el camino de lo social a lo individual.",
          how: "Usa una lista de cotejo con preguntas objetivas, de sí o no, sobre todo al principio. Es más cómodo para los dos y evita el problema de sentir que estás criticando a un amigo. Con el tiempo, cuando le agarres confianza al ejercicio, pueden pasar a comentarios más abiertos.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175394/ecrire-avec-toi/interpersonal/reto-revision.png",
        },
        {
          title: "Reconstrucción de texto en grupo",
          what: "Escucha un texto corto en francés leído dos veces. La primera solo escuchas; la segunda tomas notas de las ideas principales, no de las palabras exactas. Después, en grupo, reconstruyen el texto entre todos.",
          why: "Esta técnica (Wajnryb, 1990) está pensada exactamente para tu perfil. La reconstrucción se hace negociando: alguien recuerda una palabra, otro la estructura, discuten cuál tiempo verbal iba. Esa negociación es donde ocurre el aprendizaje. Solo, no lo lograrías; en grupo, sale.",
          how: "El punto no es reproducir el texto palabra por palabra, sino reconstruir el sentido con una gramática correcta. Cuando terminen, comparen su versión con el original y discutan las diferencias. Ahí está la mitad de la lección.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175398/ecrire-avec-toi/interpersonal/reto-dictogloss.png",
        },
        {
          title: "Escribe en pareja",
          what: "Elige un compañero y escriban un texto entre los dos. Uno propone la idea central, el otro los argumentos. Uno redacta la introducción, el otro la conclusión. Se revisan mutuamente.",
          why: "La co-escritura te obliga a verbalizar tus decisiones: por qué este conector y no otro, por qué este orden, por qué este ejemplo. Y verbalizar decisiones de escritura es la mejor manera de tomar conciencia de ellas. Además, el texto que sale suele ser mejor que el que cualquiera de los dos habría escrito solo.",
          how: "Divídanse el trabajo de forma explícita antes de empezar, y después revisen cada uno lo del otro. Discutan los desacuerdos: esas discusiones son oro puro.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175402/ecrire-avec-toi/interpersonal/reto-pareja.png",
        },
        {
          title: "Busca clubes y grupos de conversación",
          what: "Únete a un grupo donde se hable francés regularmente. En Cochabamba, la Alianza Francesa organiza encuentros de conversación, y en la propia carrera de LAEL hay espacios donde se practica la lengua.",
          why: "Hablar afila las ideas antes de escribirlas. Cuando discutes un tema en voz alta con otros, te ves obligado a defender tu posición, a encontrar ejemplos, a responder objeciones. Todo eso es material que después vuelcas al papel. Para tu perfil, saltarse este paso es un desperdicio.",
          how: "Antes de cada encuentro, prepárate: lee algo sobre el tema, anota tres ideas. Después del encuentro, escribe un texto corto con lo que surgió. Así conviertes la conversación en escritura, que es el puente que necesitas.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175406/ecrire-avec-toi/interpersonal/reto-clubes.png",
        },
        {
          title: "Consigue un corresponsal en francés",
          what: "Busca a alguien con quien escribirte en francés de forma regular. Puede ser un compañero de curso, alguien de otra ciudad, o un hablante nativo a través de plataformas de intercambio lingüístico.",
          why: "Escribir para alguien real cambia todo. Ya no escribes para una nota: escribes para que te entiendan. Y esa presión comunicativa (real, no académica) te empuja a buscar las palabras exactas de una manera que ninguna tarea logra.",
          how: "No hace falta que sea un nativo. Pueden ponerse de acuerdo con un compañero del curso: a partir de hoy, todos los mensajes entre ustedes van en francés. Es incómodo la primera semana. Después se vuelve natural, y el progreso es enorme.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175410/ecrire-avec-toi/interpersonal/reto-corresponsal.png",
        },
        {
          title: "Enseña lo que acabas de aprender",
          what: "Cada vez que aprendas algo nuevo en francés (una regla, una estructura, un uso), explícaselo a alguien más. Puede ser un compañero, un familiar, o alguien que ni siquiera estudia francés.",
          why: "Es el efecto del aprendizaje por enseñanza, muy documentado: preparar una explicación te obliga a organizar el conocimiento de una manera que el estudio pasivo no exige. Y para tu perfil, además, es lo más disfrutable del mundo.",
          how: "El truco es explicárselo a alguien que no sepa nada del tema. Si logras que lo entienda, es porque tú lo entendiste de verdad. Si no lo logras, todavía te falta.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175414/ecrire-avec-toi/interpersonal/reto-ensena.png",
        },
      ],
      videoUrl: "https://www.youtube.com/watch?v=_Ur8EPG05C8",
      banner: "¡Con otros, aprendes y escribes mejor!",
      media: {
        heroImage:
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175391/ecrire-avec-toi/interpersonal/hero.png",
      },
    },
  },
  {
    id: "naturalista",
    order: 7,
    slug: "naturalista",
    name: "Naturalista",
    shortName: "Naturalista",
    tagline: "Aprendes observando el mundo",
    colorVar: "var(--natu)",
    inkVar: "var(--natu-ink)",
    softVar: "var(--natu-soft)",
    emoji: "🌿",
    description:
      "Observas lo que otros pasan por alto y clasificas de forma natural. Necesitas que lo que estudias tenga un anclaje en el mundo real.",
    quotes: [
      "Me fijo en detalles que a los demás se les pasan.",
      "Necesito que lo que estudio tenga que ver con la realidad.",
      "Clasifico y ordeno todo, incluso sin darme cuenta.",
      "Los temas ambientales me importan de verdad.",
      "Si puedo salir a ver algo en vez de leerlo, salgo.",
    ],
    content: {
      profile:
        "Si esta es una de tus inteligencias predominantes, observas. Ves lo que otros pasan por alto. Necesitas que las cosas tengan un anclaje en el mundo real, y clasificar es tu manera natural de ordenar lo que percibes. Tu punto fuerte es la mirada atenta al detalle; tu desafío es llevar esa mirada hacia temas más abstractos sin perder tu don para lo concreto.",
      approach: {
        name: "El enfoque que más te conviene: el Aprendizaje Basado en Tareas",
        body: "David Nunan (2004) propone organizar el aprendizaje de una lengua alrededor de tareas reales, con un propósito comunicativo concreto, en vez de ejercicios descontextualizados. Para tu perfil esto es fundamental: no aprendes bien cuando el francés es un fin en sí mismo, sino cuando es la herramienta para hacer algo que te importa. Encuentra tu causa, y el francés vendrá detrás.",
      },
      tips: [
        {
          title: "Escribe describiendo lo que observas",
          what: "Sal a un lugar que conozcas (o que quieras conocer) y descríbelo por escrito en francés. La laguna Alalay, el parque Tunari, un mercado, una plaza. Qué se ve, qué se oye, qué se huele, cómo cambia con las horas o con las estaciones.",
          why: "Empiezas por donde eres fuerte: la observación. Y la escritura descriptiva es una de las mejores puertas de entrada al francés, porque te obliga a usar preposiciones de lugar, pronombres relativos, adjetivos precisos y vocabulario concreto. Además, escribir sobre lo que conoces siempre da mejores textos que escribir sobre abstracciones.",
          how: "Lleva un cuaderno y escribe en el lugar, no después. La escritura in situ captura detalles que la memoria pierde. Y usa al menos tres pronombres relativos (qui, que, dont, où): es la manera natural de encadenar descripciones.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175884/ecrire-avec-toi/naturalista/reto-observas.png",
        },
        {
          title: "Lleva un cuaderno de campo",
          what: "Ten un cuaderno donde registres observaciones en francés de forma regular. No tienen que ser textos elaborados: pueden ser notas, listas de palabras nuevas, esquemas de lo que viste, fechas y lugares.",
          why: "El cuaderno de campo es la herramienta clásica del naturalista, y funciona igual de bien para aprender una lengua. La clave es la regularidad: escribir un poco todos los días produce mucho más avance que escribir mucho una vez al mes. Y como el contenido lo eliges tú a partir de lo que observas, nunca te vas a quedar sin qué decir.",
          how: "Divídelo en secciones: observaciones, vocabulario nuevo, preguntas que quiero resolver. Con el tiempo se va a convertir en un documento tuyo, único, que vale mucho más que cualquier cuaderno de ejercicios comprado.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175887/ecrire-avec-toi/naturalista/reto-cuaderno.png",
        },
        {
          title: "Escribe sobre lo que te indigna",
          what: "Elige un tema ambiental o social que te importe de verdad y escribe sobre él en francés. La contaminación del río Rocha, la basura en las calles, el uso del agua, la deforestación, el cambio climático.",
          why: "Los temas que te importan producen textos mejores. Es así de simple. Cuando escribes sobre algo que te indigna o te conmueve, encuentras palabras que no aparecen cuando escribes sobre un tema impuesto. Y los temas ambientales tienen un vocabulario riquísimo en francés y prestan para textos de opinión, que es donde más se aprende.",
          how: "Busca información en francés sobre el tema antes de escribir: artículos, videos, reportajes. Vas a incorporar vocabulario específico y argumentos que no tenías. Después escribe tu posición.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175892/ecrire-avec-toi/naturalista/reto-indigna.png",
        },
        {
          title: "Sigue a creadores de contenido francófonos",
          what: "Busca en redes a personas que creen contenido en francés sobre los temas que te interesan: medio ambiente, naturaleza, ciencia, sostenibilidad. Síguelas. Consume su contenido regularmente.",
          why: "Es inmersión sin salir de tu casa, y con un tema que ya te importa. Vas a aprender vocabulario específico, expresiones actuales y la forma real en que la gente escribe hoy en francés. Y como el contenido te interesa de verdad, no vas a sentir que estás estudiando.",
          how: "Empieza por buscar hashtags en francés sobre tus temas (por ejemplo, écologie, environnement, biodiversité) y sigue a los perfiles que te gusten. Lee los comentarios: ahí está el francés vivo, informal, real.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175899/ecrire-avec-toi/naturalista/reto-creadores.png",
        },
        {
          title: "Arma tus propias taxonomías léxicas",
          what: "En vez de aprender palabras sueltas, agrúpalas en sistemas. El sistema del clima, el del relieve, el de la flora, el del agua, el de los residuos. Dentro de cada sistema, ordena las palabras de lo general a lo específico.",
          why: "El cerebro almacena las palabras en redes, no en listas. Cuando aprendes vocabulario organizado en taxonomías, cada palabra nueva se engancha a las que ya sabes, y todas se refuerzan mutuamente. Para tu perfil, que clasifica naturalmente, esta es la vía más eficiente.",
          how: "Ejemplo del sistema del agua: l'eau → la pluie, le fleuve, la rivière, le lac, la nappe phréatique, la sécheresse, l'inondation, la pollution de l'eau. Ocho palabras que se sostienen entre sí, mucho más fáciles de recordar que ocho palabras sin relación.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175902/ecrire-avec-toi/naturalista/reto-taxonomias.png",
        },
        {
          title: "Escribe sobre procesos y ciclos",
          what: "Elige un proceso natural (el ciclo del agua, las estaciones, la migración de un ave, el crecimiento de una planta) y descríbelo por escrito en francés, paso a paso, respetando el orden temporal.",
          why: "Describir procesos te obliga a usar marcadores temporales y conectores de secuencia (d'abord, ensuite, puis, enfin, une fois que, après que), que son exactamente las herramientas que necesitas para organizar cualquier texto. Y como el proceso ya tiene un orden natural, la estructura te viene dada. Practicas la forma sin pelearte con el contenido.",
          how: "Después, aplica la misma lógica a un texto de opinión: un argumento también tiene un orden, una secuencia, un antes y un después. Es el mismo músculo.",
          image:
            "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175906/ecrire-avec-toi/naturalista/reto-procesos.png",
        },
      ],
      videoUrl: "https://www.youtube.com/watch?v=1Ik5IjfKxI0",
      banner: "¡Observa el mundo, escríbelo en francés!",
      media: {
        heroImage:
          "https://res.cloudinary.com/axnxzeg2/image/upload/f_auto,q_auto/v1784175881/ecrire-avec-toi/naturalista/hero.png",
      },
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
