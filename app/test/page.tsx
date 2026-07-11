"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, LIKERT_SCALE, TOTAL_QUESTIONS } from "@/lib/mckenzie";
import {
  computeScores,
  toStoredResult,
  type Answers,
} from "@/lib/scoring";
import { RESULT_STORAGE_KEY } from "@/lib/resultStorage";

type Phase = "consent" | "quiz";

export default function TestPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("consent");
  const [consent, setConsent] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);

  const question = QUESTIONS[current];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);
  const isLast = current === TOTAL_QUESTIONS - 1;
  const allAnswered = answeredCount === TOTAL_QUESTIONS;
  const currentAnswered = answers[question.id] !== undefined;

  const selectAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    // Auto-avanzar salvo en la última pregunta
    if (!isLast) {
      window.setTimeout(() => setCurrent((c) => Math.min(c + 1, TOTAL_QUESTIONS - 1)), 180);
    }
  };

  const goBack = () => setCurrent((c) => Math.max(c - 1, 0));
  const goNext = () => setCurrent((c) => Math.min(c + 1, TOTAL_QUESTIONS - 1));
  // Salta a la primera pregunta sin responder (para completar el test).
  const goToFirstUnanswered = () => {
    const idx = QUESTIONS.findIndex((q) => answers[q.id] === undefined);
    if (idx >= 0) setCurrent(idx);
  };

  const finish = async () => {
    if (!allAnswered) return;
    setSubmitting(true);
    const result = computeScores(answers);
    const stored = toStoredResult(result, answers);
    try {
      sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* sessionStorage no disponible */
    }
    // Guardado anónimo (best-effort; no bloquea la navegación).
    try {
      await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stored),
      });
    } catch {
      /* sin backend: se ignora */
    }
    router.push("/resultado");
  };

  // ---------- Pantalla de consentimiento ----------
  if (phase === "consent") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14">
        <div className="rounded-3xl border border-line bg-paper p-8 shadow-sm">
          <h1 className="font-display text-3xl font-bold text-ink">
            Test de Inteligencias Múltiples
          </h1>
          <p className="mt-3 text-ink-soft">
            Responderás <strong>{TOTAL_QUESTIONS} afirmaciones</strong> indicando
            tu grado de acuerdo. Toma entre 5 y 10 minutos. No hay respuestas
            correctas ni incorrectas: se trata de conocerte mejor.
          </p>

          <div className="mt-6 rounded-2xl bg-cream-2 p-5">
            <h2 className="font-semibold text-ink">Escala de respuesta</h2>
            <ul className="mt-3 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
              {LIKERT_SCALE.map((s) => (
                <li key={s.value} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-terracota text-xs font-bold text-white">
                    {s.value}
                  </span>
                  {s.label}
                </li>
              ))}
            </ul>
          </div>

          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-cream p-4">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-terracota"
            />
            <span className="text-sm text-ink-soft">
              Acepto que mis respuestas <strong>anónimas</strong> se utilicen con
              fines educativos y de investigación para este proyecto de tesis de
              la UMSS. No se solicita ni almacena información personal que permita
              identificarme.
            </span>
          </label>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              disabled={!consent}
              onClick={() => setPhase("quiz")}
              className="rounded-full bg-terracota px-7 py-3.5 font-semibold text-white shadow-md transition enabled:hover:bg-terracota-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              Comenzar el test →
            </button>
            <Link href="/" className="text-sm font-medium text-ink-soft hover:text-ink">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Cuestionario ----------
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Progreso */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-ink-soft">
          <span>
            Pregunta {current + 1} de {TOTAL_QUESTIONS}
          </span>
          <span>{progress}% completado</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-cream-2">
          <div
            className="h-full rounded-full bg-terracota transition-all duration-300"
            style={{ width: `${((current + 1) / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>
      </div>

      {/* Tarjeta de pregunta */}
      <div className="rounded-3xl border border-line bg-paper p-7 shadow-sm">
        <p className="text-sm font-medium text-terracota-ink">Indica tu grado de acuerdo</p>
        <h2 className="mt-2 min-h-[3.5rem] font-display text-2xl font-semibold text-ink">
          {question.text}
        </h2>

        <fieldset className="mt-6">
          <legend className="sr-only">Escala Likert de 4 puntos</legend>
          <div className="grid gap-3">
            {LIKERT_SCALE.map((option) => {
              const selected = answers[question.id] === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectAnswer(option.value)}
                  aria-pressed={selected}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
                    selected
                      ? "border-terracota bg-terracota/10 ring-2 ring-terracota"
                      : "border-line bg-cream hover:border-terracota/50 hover:bg-cream-2"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      selected ? "bg-terracota text-white" : "bg-cream-2 text-ink-soft"
                    }`}
                  >
                    {option.value}
                  </span>
                  <span className={`font-medium ${selected ? "text-ink" : "text-ink-soft"}`}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Navegación */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={current === 0}
          className="rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition enabled:hover:bg-cream-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Anterior
        </button>

        {isLast && allAnswered ? (
          <button
            type="button"
            onClick={finish}
            disabled={submitting}
            className="rounded-full bg-verde-ande px-7 py-2.5 text-sm font-semibold text-white shadow-md transition enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Calculando…" : "Ver mi resultado →"}
          </button>
        ) : isLast && !allAnswered ? (
          <button
            type="button"
            onClick={goToFirstUnanswered}
            className="rounded-full bg-terracota px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-terracota-ink"
          >
            Faltan {TOTAL_QUESTIONS - answeredCount} · Ir a responderlas →
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={!currentAnswered}
            className="rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition enabled:hover:bg-cream-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente →
          </button>
        )}
      </div>

      {!currentAnswered && !isLast && (
        <p className="mt-3 text-center text-sm text-ink-soft">
          Elige una opción para continuar.
        </p>
      )}

      {!allAnswered && isLast && (
        <p className="mt-3 text-center text-sm text-terracota-ink">
          Te faltan {TOTAL_QUESTIONS - answeredCount} preguntas por responder.
          Pulsa el botón para ir a ellas y así ver tu resultado.
        </p>
      )}
    </div>
  );
}
