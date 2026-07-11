import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Contenido didáctico editable de las inteligencias (CMS).
 * Permite a las autoras actualizar textos y enlaces desde Convex sin
 * modificar el código fuente. Si una inteligencia NO tiene registro
 * aquí, el frontend usa el contenido por defecto de lib/intelligences.ts.
 */

/** Devuelve el contenido de una inteligencia (o null si no existe). */
export const getByIntelligence = query({
  args: { intelligenceId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("intelligenceContent")
      .withIndex("by_intelligenceId", (q) =>
        q.eq("intelligenceId", args.intelligenceId)
      )
      .unique();
  },
});

/** Devuelve todo el contenido didáctico. */
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("intelligenceContent").collect();
  },
});

/** Crea o actualiza el contenido de una inteligencia (upsert). */
export const upsert = mutation({
  args: {
    intelligenceId: v.string(),
    videoUrl: v.optional(v.string()),
    intro: v.optional(v.string()),
    strategies: v.optional(
      v.array(v.object({ title: v.string(), body: v.string() }))
    ),
    downloads: v.optional(
      v.array(v.object({ label: v.string(), href: v.string() }))
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("intelligenceContent")
      .withIndex("by_intelligenceId", (q) =>
        q.eq("intelligenceId", args.intelligenceId)
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt: Date.now() });
      return existing._id;
    }
    return await ctx.db.insert("intelligenceContent", {
      ...args,
      updatedAt: Date.now(),
    });
  },
});
