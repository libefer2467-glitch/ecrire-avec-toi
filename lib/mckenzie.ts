/*
  ============================================================
  INVENTARIO DE INTELIGENCIAS MÚLTIPLES
  Basado en el Multiple Intelligences Inventory de Walter McKenzie (1999).
  ------------------------------------------------------------
  Versión completa: 80 ítems (10 por cada una de las 8 inteligencias).
  Escala Likert de 4 puntos:
     1 = Totalmente en desacuerdo
     2 = En desacuerdo
     3 = De acuerdo
     4 = Totalmente de acuerdo

  ⚠️  NOTA METODOLÓGICA PARA LAS AUTORAS (Libertad y María):
  Estos ítems son una ADAPTACIÓN y TRADUCCIÓN al español del
  inventario de McKenzie, redactados en primera persona para la
  escala Likert. Antes de aplicarlos en la tesis, REVISEN y ajusten
  la redacción a su marco teórico y, si corresponde, citen la fuente:
  McKenzie, W. (1999). Multiple Intelligences Survey. surfaquarium.com

  El motor del test es "data-driven": pueden cambiar el número de
  preguntas, el texto o la escala editando SOLO este archivo.
  ============================================================
*/

import type { IntelligenceId } from "./intelligences";

export interface Question {
  id: number;
  text: string;
  intelligence: IntelligenceId;
}

/** Escala Likert de 4 puntos (etiquetas mostradas al usuario) */
export const LIKERT_SCALE: { value: number; label: string }[] = [
  { value: 1, label: "Totalmente en desacuerdo" },
  { value: 2, label: "En desacuerdo" },
  { value: 3, label: "De acuerdo" },
  { value: 4, label: "Totalmente de acuerdo" },
];

export const QUESTIONS_PER_INTELLIGENCE = 10;
export const LIKERT_MIN = 1;
export const LIKERT_MAX = 4;

/** Máximo puntaje posible por inteligencia (para normalizar el radar). */
export const MAX_SCORE_PER_INTELLIGENCE =
  QUESTIONS_PER_INTELLIGENCE * LIKERT_MAX; // 40
export const MIN_SCORE_PER_INTELLIGENCE =
  QUESTIONS_PER_INTELLIGENCE * LIKERT_MIN; // 10

const RAW: Record<IntelligenceId, string[]> = {
  linguistica: [
    "Disfruto leer libros, artículos o historias en mi tiempo libre.",
    "Se me facilita expresar mis ideas por escrito.",
    "Me gusta jugar con las palabras: rimas, trabalenguas o juegos de lenguaje.",
    "Recuerdo con facilidad frases, citas o versos.",
    "Me resulta sencillo aprender vocabulario de un idioma nuevo.",
    "Prefiero explicar algo con palabras antes que con dibujos.",
    "Disfruto escribir cartas, mensajes o publicaciones.",
    "Noto cuando alguien usa mal una palabra o comete un error gramatical.",
    "Me gusta contar historias o anécdotas a otras personas.",
    "Aprendo mejor cuando leo o escucho explicaciones.",
  ],
  logica: [
    "Disfruto resolver problemas, acertijos o rompecabezas lógicos.",
    "Me gusta trabajar con números y hacer cálculos.",
    "Busco patrones y relaciones entre las cosas.",
    "Me organizo con listas, pasos y esquemas ordenados.",
    "Me interesa saber cómo y por qué funcionan las cosas.",
    "Se me facilita razonar de forma abstracta.",
    "Prefiero que la información esté clasificada y estructurada.",
    "Disfruto los juegos de estrategia y de lógica.",
    "Analizo las situaciones antes de tomar una decisión.",
    "Me gusta hacer experimentos o comprobar hipótesis.",
  ],
  musical: [
    "Reconozco fácilmente melodías y canciones.",
    "Suelo tararear, cantar o llevar el ritmo con las manos o los pies.",
    "La música influye mucho en mi estado de ánimo.",
    "Distingo cuando un instrumento o una voz desafina.",
    "Recuerdo información con más facilidad si la asocio a una canción.",
    "Disfruto escuchar distintos tipos de música.",
    "Puedo seguir el ritmo de una pieza sin dificultad.",
    "Me gusta aprender letras de canciones.",
    "Toco un instrumento o me gustaría aprender a hacerlo.",
    "Percibo los sonidos del entorno con sensibilidad.",
  ],
  espacial: [
    "Pienso en imágenes y visualizo con facilidad.",
    "Se me facilita orientarme y recordar lugares.",
    "Disfruto dibujar, pintar o diseñar.",
    "Entiendo mejor la información con mapas, gráficos o diagramas.",
    "Me fijo en los colores, las formas y los detalles visuales.",
    "Puedo imaginar cómo se ve un objeto desde otro ángulo.",
    "Prefiero las instrucciones con imágenes antes que con texto.",
    "Disfruto la fotografía, el cine o las artes visuales.",
    "Uso mapas mentales o esquemas visuales para estudiar.",
    "Armo rompecabezas o construyo cosas con facilidad.",
  ],
  corporal: [
    "Aprendo mejor haciendo las cosas con mis manos.",
    "Me cuesta quedarme quieto/a durante mucho tiempo.",
    "Disfruto los deportes o la actividad física.",
    "Uso gestos y movimientos cuando hablo o explico.",
    "Tengo buena coordinación y equilibrio.",
    "Prefiero participar y actuar antes que solo observar.",
    "Manipular objetos me ayuda a comprender ideas.",
    "Disfruto bailar, actuar o hacer manualidades.",
    "Recuerdo mejor lo que hago que lo que solo leo.",
    "Me gusta desarmar y armar cosas para entender cómo funcionan.",
  ],
  interpersonal: [
    "Me relaciono con facilidad con personas nuevas.",
    "Disfruto trabajar en equipo y colaborar.",
    "Los demás suelen buscarme para pedir consejo.",
    "Percibo cómo se sienten las personas a mi alrededor.",
    "Me gusta mediar y resolver conflictos entre otros.",
    "Aprendo mejor cuando estudio o converso en grupo.",
    "Disfruto enseñar o explicar cosas a otras personas.",
    "Me resulta fácil mantener amistades duraderas.",
    "Prefiero las actividades grupales a las individuales.",
    "Comprendo distintos puntos de vista con facilidad.",
  ],
  intrapersonal: [
    "Conozco bien mis fortalezas y mis debilidades.",
    "Prefiero trabajar de forma independiente y autónoma.",
    "Reflexiono con frecuencia sobre mis emociones y decisiones.",
    "Tengo metas personales claras y trabajo por ellas.",
    "Me gusta tener momentos de silencio para pensar.",
    "Aprendo mejor cuando el tema conecta con mis intereses.",
    "Soy consciente de lo que me motiva y de lo que no.",
    "Confío en mi criterio para tomar decisiones.",
    "Llevo o me gustaría llevar un diario personal.",
    "Necesito entender el sentido de lo que hago para comprometerme.",
  ],
  naturalista: [
    "Disfruto estar en contacto con la naturaleza.",
    "Me interesa observar plantas, animales o fenómenos naturales.",
    "Me gusta clasificar y ordenar cosas por categorías.",
    "Noto los cambios en el clima y en el entorno.",
    "Me preocupa el cuidado del medioambiente.",
    "Disfruto actividades al aire libre como caminatas o excursiones.",
    "Reconozco distintas especies de plantas o animales.",
    "Me gusta coleccionar u organizar objetos naturales.",
    "Observo con detalle los patrones de la naturaleza.",
    "Aprendo mejor con ejemplos del mundo real y natural.",
  ],
};

/** Orden de bloques según el orden de las inteligencias. */
const ORDER: IntelligenceId[] = [
  "linguistica",
  "logica",
  "musical",
  "espacial",
  "corporal",
  "interpersonal",
  "intrapersonal",
  "naturalista",
];

/** Lista plana de 80 preguntas con id secuencial. */
export const QUESTIONS: Question[] = ORDER.flatMap((intelligence) =>
  RAW[intelligence].map((text) => ({ text, intelligence }))
).map((q, index) => ({ id: index + 1, ...q }));

export const TOTAL_QUESTIONS = QUESTIONS.length; // 80
