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

/** Respuestas: mapa de id de pregunta -> valor Likert (1-4). */
export type Answers = Record<number, number>;

export interface IntelligenceScore {
  id: IntelligenceId;
  name: string;
  shortName: string;
  colorVar: string;
  inkVar: string;
  raw: number; // suma bruta (p. ej. 10-40)
  percentage: number; // 0-100 normalizado
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
  scoresByIntelligence: Record<IntelligenceId, number>; // raw
  dominant: IntelligenceId;
  dominantIds: IntelligenceId[];
  createdAt: number;
}

export function toStoredResult(result: TestResult): StoredResult {
  const scoresByIntelligence = {} as Record<IntelligenceId, number>;
  for (const s of result.scores) scoresByIntelligence[s.id] = s.raw;
  return {
    scoresByIntelligence,
    dominant: result.dominant.id,
    dominantIds: result.dominantIds,
    createdAt: Date.now(),
  };
}
