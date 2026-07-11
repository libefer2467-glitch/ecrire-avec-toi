import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/** Guarda un mensaje del formulario de contacto. */
export const sendMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contactMessages", {
      ...args,
      createdAt: Date.now(),
      handled: false,
    });
  },
});

/** Lista los mensajes de contacto (para que las autoras los lean). */
export const listMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contactMessages")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});
