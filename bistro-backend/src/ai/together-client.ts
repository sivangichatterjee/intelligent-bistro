import OpenAI from "openai";

export const togetherClient = new OpenAI({
  apiKey: process.env.TOGETHER_API_KEY,
  baseURL: "https://api.together.xyz/v1",
});

export const TOGETHER_MODEL = "meta-llama/Llama-3.3-70B-Instruct-Turbo";
