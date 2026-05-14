import { create } from "zustand";
import type { CartItem, MenuItem } from "../types";

interface CartState {
  items: CartItem[];
  addItem: (item_id: string, quantity: number) => void;
  removeItem: (item_id: string) => void;
  updateItem: (item_id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: (menu: MenuItem[]) => number;
  totalCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item_id, quantity) => {
    set((state) => {
      const existing = state.items.find((i) => i.item_id === item_id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.item_id === item_id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { item_id, quantity }] };
    });
  },

  removeItem: (item_id) => {
    set((state) => ({
      items: state.items.filter((i) => i.item_id !== item_id),
    }));
  },

  updateItem: (item_id, quantity) => {
    set((state) => ({
      items: state.items.map((i) =>
        i.item_id === item_id ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalPrice: (menu) => {
    const { items } = get();
    return items.reduce((sum, cartItem) => {
      const menuItem = menu.find((m) => m.id === cartItem.item_id);
      return sum + (menuItem ? menuItem.price * cartItem.quantity : 0);
    }, 0);
  },

  totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
