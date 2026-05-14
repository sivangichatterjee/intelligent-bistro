import type { CartAction } from "../types";
import { useCartStore } from "../store/cart-store";

export function applyCartActions(actions: CartAction[]): void {
  const { addItem, removeItem, updateItem, clearCart } = useCartStore.getState();

  for (const action of actions) {
    switch (action.type) {
      case "add":
        addItem(action.item_id, action.quantity);
        break;
      case "remove":
        removeItem(action.item_id);
        break;
      case "update":
        if (action.quantity === 0) {
          removeItem(action.item_id);
        } else {
          updateItem(action.item_id, action.quantity);
        }
        break;
      case "clear":
        clearCart();
        break;
    }
  }
}
