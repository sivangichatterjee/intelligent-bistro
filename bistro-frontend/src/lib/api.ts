import type { MenuItem, CartItem, CartAction } from "../types";

export const API_BASE = "http://10.0.0.135:3000";

export interface ChatResponse {
  reply: string;
  suggestions?: string[];
  actions: CartAction[];
}

export interface HistoryMessage {
  role: "user" | "assistant";
  text: string;
}

export async function fetchMenu(): Promise<MenuItem[]> {
  const response = await fetch(`${API_BASE}/api/menu`);
  if (!response.ok) {
    throw new Error(`fetchMenu failed: ${response.status}`);
  }
  return response.json() as Promise<MenuItem[]>;
}

export async function sendChatMessage(
  message: string,
  cart: CartItem[],
  history: HistoryMessage[]
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, cart, history }),
  });
  if (!response.ok) {
    throw new Error(`sendChatMessage failed: ${response.status}`);
  }
  return response.json() as Promise<ChatResponse>;
}
