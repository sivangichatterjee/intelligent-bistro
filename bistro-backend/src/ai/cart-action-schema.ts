import { z } from "zod";

const cartActionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("add"),
    item_id: z.string().min(1),
    quantity: z.number().int().positive(),
  }),
  z.object({
    type: z.literal("remove"),
    item_id: z.string().min(1),
    quantity: z.number(),
  }),
  z.object({
    type: z.literal("update"),
    item_id: z.string().min(1),
    quantity: z.number().int().nonnegative(),
  }),
  z.object({
    type: z.literal("clear"),
    item_id: z.string(),
    quantity: z.number(),
  }),
]);

export const chatResponseSchema = z.object({
  reply: z.string().min(1),
  suggestions: z.array(z.string()).max(5).optional(),
  actions: z.array(cartActionSchema),
});

export type ValidatedChatResponse = z.infer<typeof chatResponseSchema>;
