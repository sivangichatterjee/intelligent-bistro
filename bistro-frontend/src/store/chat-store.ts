import { create } from "zustand";
import type { ChatMessage, CartItem } from "../types";
import { sendChatMessage } from "../lib/api";
import { applyCartActions } from "../lib/apply-cart-actions";
import { lightImpact } from "../lib/haptics";

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (text: string, cart: CartItem[]) => Promise<void>;
  reset: () => void;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,

  sendMessage: async (text, cart) => {
    const history = useChatStore
      .getState()
      .messages.filter((m) => !m.isError)
      .slice(-20)
      .map((m) => ({ role: m.role, text: m.text }));

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      text,
      timestamp: Date.now(),
    };

    set((s) => ({ messages: [...s.messages, userMessage], isLoading: true }));

    try {
      const response = await sendChatMessage(text, cart, history);

      if (response.actions.length > 0) {
        applyCartActions(response.actions);
      }

      lightImpact();

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        text: response.reply,
        actions: response.actions.length > 0 ? response.actions : undefined,
        suggestions: response.suggestions && response.suggestions.length > 0 ? response.suggestions : undefined,
        timestamp: Date.now(),
      };

      set((s) => ({
        messages: [...s.messages, assistantMessage],
        isLoading: false,
      }));
    } catch {
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        text: "Something went wrong — try again.",
        timestamp: Date.now(),
        isError: true,
      };

      set((s) => ({
        messages: [...s.messages, errorMessage],
        isLoading: false,
      }));
    }
  },

  reset: () => set({ messages: [], isLoading: false }),
}));
