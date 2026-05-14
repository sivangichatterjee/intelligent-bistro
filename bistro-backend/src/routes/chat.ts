import { Router, Request, Response } from "express";
import { menu } from "../data/menu.js";
import { togetherClient, TOGETHER_MODEL } from "../ai/together-client.js";
import { buildSystemPrompt } from "../ai/system-prompt.js";
import { chatResponseSchema } from "../ai/cart-action-schema.js";
import type { ChatRequest, ChatResponse } from "../types/index.js";

export const chatRouter = Router();

const FALLBACK_RESPONSE: ChatResponse = {
  reply: "Sorry, I didn't quite catch that — could you rephrase?",
  actions: [],
};

chatRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body as ChatRequest;

  if (!body.message || typeof body.message !== "string") {
    res.status(400).json({ error: "message is required and must be a string" });
    return;
  }

  if (!Array.isArray(body.cart)) {
    res.status(400).json({ error: "cart is required and must be an array" });
    return;
  }

  const systemPrompt = buildSystemPrompt(menu, body.cart);

  const history = (body.history ?? []).slice(-20);
  const historyMessages = history.map((h) => ({
    role: h.role as "user" | "assistant",
    content: h.text,
  }));

  let rawContent: string | null = null;

  try {
    const completion = await togetherClient.chat.completions.create({
      model: TOGETHER_MODEL,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        ...historyMessages,
        { role: "user", content: body.message },
      ],
    });

    rawContent = completion.choices[0]?.message?.content ?? null;

    if (!rawContent) {
      console.error("[chat] AI returned empty content");
      res.json(FALLBACK_RESPONSE);
      return;
    }

    const parsed = JSON.parse(rawContent);
    const validated = chatResponseSchema.safeParse(parsed);

    if (!validated.success) {
      console.error("[chat] Zod validation failed:", validated.error.format());
      console.error("[chat] Raw AI output:", rawContent);
      res.json(FALLBACK_RESPONSE);
      return;
    }

    res.json(validated.data satisfies ChatResponse);
  } catch (err) {
    console.error("[chat] Unhandled error:", err);
    if (rawContent) {
      console.error("[chat] Raw AI output at time of error:", rawContent);
    }
    res.json(FALLBACK_RESPONSE);
  }
});
