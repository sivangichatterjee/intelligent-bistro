export type MenuCategory =
  | "appetizers"
  | "bowls"
  | "dumplings"
  | "noodles"
  | "rice"
  | "main_course"
  | "sides"
  | "drinks";

export type MenuTag =
  | "spicy"
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "popular"
  | "chef's pick";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image_url: string;
  tags: MenuTag[];
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

export interface HistoryMessage {
  role: "user" | "assistant";
  text: string;
}

export interface ChatRequest {
  message: string;
  cart: CartItem[];
  history?: HistoryMessage[];
}

export interface ChatResponse {
  reply: string;
  suggestions?: string[];
  actions: CartAction[];
}
