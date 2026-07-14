/*
  ============================================================
  TEST DE INTELIGENCIAS MÚLTIPLES  (Verdadero / Falso)
  Adaptación del inventario de Armstrong para el proyecto
  "Écrire avec toi" (tesis UMSS — Libertad Fernández y María Cruz Quiroz).
  ------------------------------------------------------------
  40 afirmaciones. Cada una se responde VERDADERO o FALSO.
  Las 5 afirmaciones de cada inteligencia están repartidas (intercaladas)
  a lo largo del test.

  PUNTUACIÓN: se cuenta cuántas afirmaciones marcó la persona como
  VERDADERO en cada inteligencia (0 a 5).
     4 o 5  → inteligencia DOMINANTE
     3      → desarrollo MEDIO
     0 a 2  → inteligencia POCO desarrollada

  El motor del test es "data-driven": para cambiar preguntas, escala o
  el mapeo, editar SOLO este archivo.
  ============================================================
*/

import type { IntelligenceId } from "./intelligences";

export interface Question {
  id: number;
  text: string;
  intelligence: IntelligenceId;
}

/**
 * Escala Verdadero / Falso.
 * value 1 = Verdadero (suma al puntaje), value 0 = Falso.
 */
export const VF_SCALE: { value: number; label: string }[] = [
  { value: 1, label: "Verdadero" },
  { value: 0, label: "Falso" },
];

/** Compatibilidad: algunas partes usan LIKERT_SCALE como nombre genérico. */
export const LIKERT_SCALE = VF_SCALE;

export const QUESTIONS_PER_INTELLIGENCE = 5;
/** En V/F el puntaje mínimo por respuesta es 0 y el máximo 1. */
export const LIKERT_MIN = 0;
export const LIKERT_MAX = 1;

/** Máximo puntaje posible por inteligencia (para normalizar el radar). */
export const MAX_SCORE_PER_INTELLIGENCE =
  QUESTIONS_PER_INTELLIGENCE * LIKERT_MAX; // 5
export const MIN_SCORE_PER_INTELLIGENCE =
  QUESTIONS_PER_INTELLIGENCE * LIKERT_MIN; // 0

/**
 * Las 40 afirmaciones EN ORDEN (1..40), cada una con la inteligencia a la
 * que pertenece. El mapeo original del test es:
 *   Verbal-lingüística : 9, 10, 17, 22, 30
 *   Lógico-matemática  : 5, 7, 15, 20, 25
 *   Visual-espacial    : 1, 11, 14, 23, 27
 *   Musical-rítmica    : 3, 4, 13, 24, 28
 *   Kinestésica-corporal: 8, 16, 19, 21, 29
 *   Intrapersonal      : 2, 6, 26, 31, 33
 *   Interpersonal      : 12, 18, 32, 34, 35
 *   Naturalista        : 36, 37, 38, 39, 40
 */
const ITEMS: { text: string; intelligence: IntelligenceId }[] = [
  /* 1  */ { text: "Prefiero hacer un mapa que explicarle a alguien cómo tiene que llegar.", intelligence: "espacial" },
  /* 2  */ { text: "Si estoy enfadado(a) o contento(a), generalmente sé exactamente por qué.", intelligence: "intrapersonal" },
  /* 3  */ { text: "Sé tocar (o antes sabía tocar) un instrumento musical.", intelligence: "musical" },
  /* 4  */ { text: "Asocio la música con mis estados de ánimo.", intelligence: "musical" },
  /* 5  */ { text: "Puedo sumar o multiplicar mentalmente con mucha rapidez.", intelligence: "logica" },
  /* 6  */ { text: "Puedo ayudar a un amigo a manejar sus sentimientos, porque yo pude hacerlo antes con sentimientos parecidos.", intelligence: "intrapersonal" },
  /* 7  */ { text: "Me gusta trabajar con calculadoras y computadoras.", intelligence: "logica" },
  /* 8  */ { text: "Aprendo rápido a bailar un ritmo nuevo.", intelligence: "corporal" },
  /* 9  */ { text: "No me es difícil decir lo que pienso durante una discusión o debate.", intelligence: "linguistica" },
  /* 10 */ { text: "Disfruto de una buena charla, discurso o conferencia.", intelligence: "linguistica" },
  /* 11 */ { text: "Siempre distingo el norte del sur, esté donde esté.", intelligence: "espacial" },
  /* 12 */ { text: "Me gusta reunir grupos de personas en una fiesta o en un evento especial.", intelligence: "interpersonal" },
  /* 13 */ { text: "La vida me parece vacía sin música.", intelligence: "musical" },
  /* 14 */ { text: "Siempre entiendo los gráficos que vienen en las instrucciones de equipos o instrumentos.", intelligence: "espacial" },
  /* 15 */ { text: "Me gusta hacer rompecabezas y entretenerme con juegos electrónicos.", intelligence: "logica" },
  /* 16 */ { text: "Me fue fácil aprender a andar en bicicleta (o en patines).", intelligence: "corporal" },
  /* 17 */ { text: "Me molesta oír una discusión o una afirmación que parece ilógica.", intelligence: "linguistica" },
  /* 18 */ { text: "Soy capaz de convencer a otros de que sigan mis planes.", intelligence: "interpersonal" },
  /* 19 */ { text: "Tengo buen sentido del equilibrio y de la coordinación.", intelligence: "corporal" },
  /* 20 */ { text: "Con frecuencia veo configuraciones y relaciones entre números con más rapidez y facilidad que otros.", intelligence: "logica" },
  /* 21 */ { text: "Me gusta construir modelos (o hacer esculturas).", intelligence: "corporal" },
  /* 22 */ { text: "Tengo agudeza para encontrar el significado de las palabras.", intelligence: "linguistica" },
  /* 23 */ { text: "Puedo mirar un objeto de una manera y con la misma facilidad verlo de otra forma.", intelligence: "espacial" },
  /* 24 */ { text: "Con frecuencia relaciono una pieza de música con algún evento de mi vida.", intelligence: "musical" },
  /* 25 */ { text: "Me gusta trabajar con números y figuras.", intelligence: "logica" },
  /* 26 */ { text: "Me gusta sentarme en silencio y reflexionar sobre mis sentimientos íntimos.", intelligence: "intrapersonal" },
  /* 27 */ { text: "Con solo mirar la forma de construcciones y estructuras me siento a gusto.", intelligence: "espacial" },
  /* 28 */ { text: "Me gusta tararear, silbar y cantar en la ducha o cuando estoy solo(a).", intelligence: "musical" },
  /* 29 */ { text: "Soy bueno(a) para el atletismo.", intelligence: "corporal" },
  /* 30 */ { text: "Me gusta escribir cartas o mensajes detallados a mis amigos.", intelligence: "linguistica" },
  /* 31 */ { text: "Generalmente, me doy cuenta de la expresión que tengo en la cara.", intelligence: "intrapersonal" },
  /* 32 */ { text: "Me doy cuenta de las expresiones en la cara de otras personas.", intelligence: "interpersonal" },
  /* 33 */ { text: "Me mantengo “en contacto” con mis estados de ánimo: no me cuesta identificarlos.", intelligence: "intrapersonal" },
  /* 34 */ { text: "Me doy cuenta de los estados de ánimo de los demás.", intelligence: "interpersonal" },
  /* 35 */ { text: "Me doy cuenta bastante bien de lo que otros piensan de mí.", intelligence: "interpersonal" },
  /* 36 */ { text: "Disfruto clasificar la flora, la fauna y los fenómenos naturales.", intelligence: "naturalista" },
  /* 37 */ { text: "Me gusta coleccionar plantas, insectos o rocas.", intelligence: "naturalista" },
  /* 38 */ { text: "Soy bueno(a) descubriendo patrones en la naturaleza.", intelligence: "naturalista" },
  /* 39 */ { text: "Tengo conciencia de la necesidad de proteger el medioambiente.", intelligence: "naturalista" },
  /* 40 */ { text: "Mis materias de estudio preferidas están relacionadas con las ciencias naturales o sociales.", intelligence: "naturalista" },
];

/** Lista de preguntas con id secuencial 1..40 (en el orden del test). */
export const QUESTIONS: Question[] = ITEMS.map((q, index) => ({
  id: index + 1,
  ...q,
}));

export const TOTAL_QUESTIONS = QUESTIONS.length; // 40
