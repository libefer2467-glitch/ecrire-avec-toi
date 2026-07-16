/*
  Lógica de puntuación del test de Inteligencias Múltiples.
  - Suma los valores Likert (1-4) por inteligencia.
  - Normaliza a porcentaje (0-100) para el gráfico de radar.
  - Determina la(s) inteligencia(s) dominante(s) con manejo de empates.
*/

import type { IntelligenceId } from "./intelligences";
import { INTELLIGENCES } from "./intelligences";
import {
  QUESTIONS,
  MAX_SCORE_PER_INTELLIGENCE,
} from "./mckenzie";

/** Respuestas: mapa de id de pregunta -> valor (V/F: 1 = Verdadero, 0 = Falso). */
export type Answers = Record<number, number>;

/** Nivel de desarrollo de una inteligencia según su puntaje V/F (0-5). */
export type IntelligenceLevel = "dominante" | "media" | "poca";

export const LEVEL_LABEL: Record<IntelligenceLevel, string> = {
  dominante: "Dominante",
  media: "Desarrollo medio",
  poca: "Poco desarrollada",
};

/** Clasifica el puntaje bruto (nº de "Verdadero", 0-5) en un nivel. */
export function levelForScore(raw: number): IntelligenceLevel {
  if (raw >= 4) return "dominante";
  if (raw === 3) return "media";
  return "poca";
}

export interface IntelligenceScore {
  id: IntelligenceId;
  name: string;
  shortName: string;
  colorVar: string;
  inkVar: string;
  raw: number; // nº de afirmaciones marcadas "Verdadero" (0-5)
  percentage: number; // 0-100 normalizado
  level: IntelligenceLevel;
}

export interface TestResult {
  scores: IntelligenceScore[]; // ordenadas de mayor a menor
  dominant: IntelligenceScore; // la principal (primera del ranking)
  dominantIds: IntelligenceId[]; // todas las que empatan en el máximo
  answeredCount: number;
  totalQuestions: number;
}

export function computeScores(answers: Answers): TestResult {
  const raw: Record<string, number> = {};
  for (const intel of INTELLIGENCES) raw[intel.id] = 0;

  let answeredCount = 0;
  for (const q of QUESTIONS) {
    const value = answers[q.id];
    if (typeof value === "number") {
      raw[q.intelligence] += value;
      answeredCount += 1;
    }
  }

  const scores: IntelligenceScore[] = INTELLIGENCES.map((intel) => {
    const rawScore = raw[intel.id];
    return {
      id: intel.id,
      name: intel.name,
      shortName: intel.shortName,
      colorVar: intel.colorVar,
      inkVar: intel.inkVar,
      raw: rawScore,
      percentage: Math.round((rawScore / MAX_SCORE_PER_INTELLIGENCE) * 100),
      level: levelForScore(rawScore),
    };
  });

  // Orden estable de mayor a menor (desempate por orden canónico).
  scores.sort((a, b) => {
    if (b.raw !== a.raw) return b.raw - a.raw;
    const oa = INTELLIGENCES.findIndex((i) => i.id === a.id);
    const ob = INTELLIGENCES.findIndex((i) => i.id === b.id);
    return oa - ob;
  });

  const topRaw = scores[0]?.raw ?? 0;
  const dominantIds = scores
    .filter((s) => s.raw === topRaw)
    .map((s) => s.id);

  return {
    scores,
    dominant: scores[0],
    dominantIds,
    answeredCount,
    totalQuestions: QUESTIONS.length,
  };
}

/** Serializa a un objeto simple para sessionStorage / Convex. */
export interface StoredResult {
  /** Nombre opcional de quien hizo el test (no se exige, solo identifica). */
  name?: string;
  scoresByIntelligence: Record<IntelligenceId, number>; // raw
  dominant: IntelligenceId;
  dominantIds: IntelligenceId[];
  /** Respuesta (1-4) de cada pregunta: { "1": 3, "2": 4, ... } (para análisis). */
  answers: Record<string, number>;
  createdAt: number;
}

export function toStoredResult(
  result: TestResult,
  answers: Answers,
  name?: string
): StoredResult {
  const scoresByIntelligence = {} as Record<IntelligenceId, number>;
  for (const s of result.scores) scoresByIntelligence[s.id] = s.raw;
  // Normaliza las claves a string (JSON/Convex usan claves de texto).
  const answersOut: Record<string, number> = {};
  for (const [id, value] of Object.entries(answers)) {
    if (typeof value === "number") answersOut[id] = value;
  }
  return {
    ...(name?.trim() ? { name: name.trim() } : {}),
    scoresByIntelligence,
    dominant: result.dominant.id,
    dominantIds: result.dominantIds,
    answers: answersOut,
    createdAt: Date.now(),
  };
}
