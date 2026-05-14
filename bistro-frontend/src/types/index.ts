export type MenuCategory =
  | "appetizers"
  | "bowls"
  | "dumplings"
  | "noodles"
  | "rice"
  | "main_course"
  | "sides"
  | "drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image_url: string;
  tags: string[];
  notes?: string;
  spice_level: 0 | 1 | 2 | 3;
  calories: number;
  allergens: string[];
  dietary: string[];
}

export interface CartItem {
  item_id: string;
  quantity: number;
}

export type CartActionType = "add" | "remove" | "update" | "clear";

export interface CartAction {
  type: CartActionType;
  item_id: string;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  actions?: CartAction[];
  suggestions?: string[];
  timestamp: number;
  isError?: boolean;
}
