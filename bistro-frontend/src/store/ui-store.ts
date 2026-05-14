import { create } from "zustand";

interface UIState {
  isCartOpen: boolean;
  isChatOpen: boolean;
  isOrderConfirmationOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openChat: () => void;
  closeChat: () => void;
  openOrderConfirmation: () => void;
  closeOrderConfirmation: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isChatOpen: false,
  isOrderConfirmationOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
  openOrderConfirmation: () => set({ isOrderConfirmationOpen: true }),
  closeOrderConfirmation: () => set({ isOrderConfirmationOpen: false }),
}));
