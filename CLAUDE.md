# CLAUDE.md — Wokwise

Project context and conventions for AI-assisted development. Read this before touching any code.

---

## Project Overview

**Wokwise** is an AI-powered Asian fusion bistro ordering app built as a 2-day internship submission for Viridien. Quality bar: premium production-grade, not a prototype.

---

## Folder Structure

```
intelligent-bistro/
├── bistro-frontend/   # Expo (React Native) app
├── bistro-backend/    # Node.js + Express + TypeScript API
├── CLAUDE.md
└── README.md
```

---

## Stack

### Frontend — `bistro-frontend/`
- **Framework:** Expo (React Native)
- **Styling:** NativeWind v4
- **Navigation:** expo-router
- **State:** Zustand
- **Animations:** react-native-reanimated
- **UI extras:** expo-blur, expo-haptics, expo-linear-gradient, @expo/vector-icons
- **Fonts:** Inter (UI) + Fraunces (display/serif accents) via expo-google-fonts

### Backend — `bistro-backend/`
- **Runtime:** Node.js
- **Framework:** Express + TypeScript
- **AI:** Together AI (`meta-llama/Llama-3.3-70B-Instruct-Turbo`) via the OpenAI SDK
- **AI mode:** JSON mode (`response_format: { type: "json_object" }`)

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#FAF7F2` | App background (warm off-white) |
| Surface | `#FFFFFF` | Cards, sheets |
| Text Primary | `#1A1A1A` | Body copy, headings |
| Text Muted | `#6B6B6B` | Captions, secondary labels |
| Accent | `#D64545` | Persimmon red — CTAs, badges, active states |
| Secondary | `#7A8B6F` | Sage green — tags, accents |
| Border | `#E8E2D5` | Dividers, card borders |

Fonts:
- **Inter** — all UI text
- **Fraunces** — display headings and serif accents

---

## Menu

7 categories: **Appetizers, Bowls, Dumplings, Noodles, Rice, Sides, Drinks**
20–25 items total.

Each item schema:
```ts
{
  id: string;          // slug, e.g. "miso-glazed-edamame"
  name: string;
  description: string;
  price: number;       // USD
  category: string;
  image_url: string;   // Unsplash photo URL
  tags: string[];      // e.g. ["spicy", "vegetarian", "vegan", "gluten-free"]
  notes?: string;      // short AI-helpful context, e.g. "comes with pickled ginger and soy sauce"
}
```

---

## AI Cart Parsing

The AI receives the user's message plus the current cart state and returns structured JSON.

### Request payload (sent to Together AI)
```ts
{
  message: string;       // user's natural language input
  cart: CartItem[];      // current cart state
}
```

### Response schema (returned by AI)
```ts
{
  actions: CartAction[];
  reply: string;         // natural conversational reply
}

type CartAction =
  | { action: "add";    item_id: string; quantity: number }
  | { action: "remove"; item_id: string; quantity: number }
  | { action: "update"; item_id: string; quantity: number }
  | { action: "clear" }
```

**Rule:** The AI must reference items only by their `id` slug, never by display name.

---

## Coding Conventions

- **TypeScript everywhere** — no plain `.js` files
- **Named exports** — no default exports except Expo route files (required by expo-router)
- **Components** — PascalCase filenames, e.g. `CartItem.tsx`
- **Hooks** — prefixed `use`, e.g. `useCartStore.ts`
- **All other files** — kebab-case, e.g. `menu-data.ts`, `cart-router.ts`
- No `any` types unless absolutely unavoidable (add a comment explaining why)
- Prefer `const` over `let`; avoid `var`

---

## Key Constraints

- Do not scaffold code unless the user explicitly asks for it.
- Do not add features, refactors, or "improvements" beyond what is asked.
- Do not add comments or docstrings to code that was not changed.
- Do not create new files unless strictly necessary.
- Quality bar is production-grade — no placeholder logic, no TODO stubs in final output.
