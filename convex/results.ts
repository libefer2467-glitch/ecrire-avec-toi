import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/** Guarda un resultado anónimo del test. */
export const saveResult = mutation({
  args: {
    scoresByIntelligence: v.record(v.string(), v.number()),
    dominant: v.string(),
    dominantIds: v.array(v.string()),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("testResults", args);
  },
});

/**
 * Lista los resultados (para análisis de la tesis).
 * Devuelve los más recientes primero.
 */
export const listResults = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("testResults")
      .withIndex("by_createdAt")
      .order("desc")
      .take(args.limit ?? 200);
    return results;
  },
});

/**
 * Estadística agregada: cuántas veces fue dominante cada inteligencia.
 * Útil para el análisis de datos de la tesis.
 */
export const dominantCounts = query({
  args: {},
  handler: async (ctx) => {
    const results = await ctx.db.query("testResults").collect();
    const counts: Record<string, number> = {};
    for (const r of results) {
      counts[r.dominant] = (counts[r.dominant] ?? 0) + 1;
    }
    return { total: results.length, counts };
  },
});
