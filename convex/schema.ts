import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Esquema de la base de datos (Convex).
 *
 * 1. testResults      — resultados ANÓNIMOS del test de inteligencias.
 * 2. contactMessages  — consultas del formulario de contacto.
 * 3. intelligenceContent — contenido didáctico editable de las 8
 *    inteligencias (CMS): permite actualizar textos y enlaces SIN tocar
 *    el código. Se edita desde el panel de Convex.
 */
export default defineSchema({
  testResults: defineTable({
    // Puntaje bruto por inteligencia (id -> suma Likert).
    scoresByIntelligence: v.record(v.string(), v.number()),
    dominant: v.string(),
    dominantIds: v.array(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number(),
    handled: v.optional(v.boolean()),
  }).index("by_createdAt", ["createdAt"]),

  intelligenceContent: defineTable({
    // id de la inteligencia (linguistica, logica, musical, ...).
    intelligenceId: v.string(),
    videoUrl: v.optional(v.string()),
    intro: v.optional(v.string()),
    // Estrategias como pares título/cuerpo.
    strategies: v.optional(
      v.array(v.object({ title: v.string(), body: v.string() }))
    ),
    // Descargas como pares etiqueta/enlace.
    downloads: v.optional(
      v.array(v.object({ label: v.string(), href: v.string() }))
    ),
    updatedAt: v.number(),
  }).index("by_intelligenceId", ["intelligenceId"]),
});
