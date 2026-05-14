# Wokwise 

> Just ask. We'll wok it out.

An AI-powered Asian fusion ordering app built for the **Viridien AI Full-Stack Engineering Internship** challenge. Users browse a 25-item menu, add to cart, and place orders through a conversational AI assistant named **Woki** that parses natural language into structured cart actions.

**Author:** Sivangi Chatterjee
**Primary AI coding tool:** Claude Code (Anthropic)
**Build time:** ~20 hours over 2 days

---

## 📽️ Demo

**5-minute walkthrough:** _(Loom link will be added after recording)_

---

##  What it does

- **Browse a curated menu** — 25 dishes across 8 categories (Appetizers, Bowls, Dumplings, Noodles, Rice, Main Course, Sides, Drinks) with photos, descriptions, prices, spice levels, calorie estimates, and dietary/allergen tags.
- **Conversational ordering with Woki** — type natural-language requests like *"add two spicy tuna bowls and a pad thai"* or *"what's good for someone who's vegetarian?"* The AI returns both a friendly reply and structured JSON cart actions that mutate the cart in real time.
- **Smart recommendations as inline cards** — when Woki suggests dishes, they appear as tappable cards directly in the chat (image, name, price, one-tap add) — not as a wall of text.
- **Constraint-aware suggestions** — asking for "chicken" returns only chicken dishes; asking for vegetarian returns only dietary-tagged items. The AI is explicitly instructed not to pad the list with unrelated options.
- **Item detail sheets** — tap any menu card to see full description, spice meter, calorie info, dietary pills, and allergen warnings.
- **Premium cart UX** — quantity steppers on cards, swipe-to-delete in the cart drawer, haptic feedback throughout, and a celebratory order-confirmation screen.

---

##  Architecture

```
intelligent-bistro/
├── bistro-frontend/        # Expo (React Native) app
│   ├── app/                # File-based routing (expo-router)
│   │   ├── index.tsx       # Landing page
│   │   └── menu.tsx        # Main menu screen
│   ├── src/
│   │   ├── components/     # Menu cards, chat sheet, cart drawer, FABs, etc.
│   │   ├── store/          # Zustand stores: cart, chat, UI
│   │   ├── lib/            # API client, action applier, haptics
│   │   └── types/          # Shared TypeScript types
│   └── assets/images/      # Mascot + icons
│
├── bistro-backend/         # Node.js API
│   ├── src/
│   │   ├── server.ts       # Express setup, CORS, route mounting
│   │   ├── routes/
│   │   │   ├── menu.ts     # GET /api/menu
│   │   │   └── chat.ts     # POST /api/chat
│   │   ├── ai/
│   │   │   ├── system-prompt.ts        # System prompt builder
│   │   │   ├── cart-action-schema.ts   # Zod validation
│   │   │   └── together-client.ts      # Together AI client
│   │   ├── data/menu.ts    # 25-item menu (typed)
│   │   └── types/          # Backend types
│   └── .env.example
│
├── CLAUDE.md               # Project context for Claude Code
└── README.md
```

### Frontend stack

- **Expo SDK 54** (React Native) with TypeScript
- **expo-router** for file-based routing
- **NativeWind v4** (Tailwind for RN) for styling and design tokens
- **Zustand** for cart, chat, and UI state
- **react-native-reanimated** for sheet animations and gestures
- **expo-haptics**, **expo-blur**, **expo-linear-gradient**, **@expo/vector-icons** for premium feel
- **@expo-google-fonts/inter** + **@expo-google-fonts/fraunces** — Inter (UI) + Fraunces (serif accents)

### Backend stack

- **Node.js + Express + TypeScript** (running via `tsx watch` in dev — no build step)
- **Together AI** as the LLM provider, called using the **OpenAI SDK** pointed at `https://api.together.xyz/v1`
- **Model:** `meta-llama/Llama-3.3-70B-Instruct-Turbo`
- **JSON mode** (`response_format: { type: "json_object" }`) for structured output
- **Zod** for runtime validation of every LLM response — the endpoint never crashes on malformed AI output, it falls back gracefully

---

## 🔌 AI Contract

The frontend POSTs to `/api/chat` with the user's message, the current cart, and bounded conversation history:

```ts
POST /api/chat
{
  message: string;
  cart: { item_id: string; quantity: number }[];
  history: { role: "user" | "assistant"; text: string }[];
}
```

The backend embeds the menu, current cart state, and conversation history into a system prompt, calls the LLM, validates the response with Zod, and returns:

```ts
{
  reply: string;                                  // natural conversational message
  suggestions?: string[];                         // item IDs to render as inline cards
  actions: {
    type: "add" | "remove" | "update" | "clear";
    item_id: string;
    quantity: number;
  }[];
}
```

The frontend applies actions to the cart store (`applyCartActions`) and renders the reply plus any inline suggestion cards in the chat.

### Design decisions

- **Structured output over free-form text.** The LLM doesn't directly mutate the cart — it returns a typed action schema that the client applies. This makes the integration testable, auditable, and resilient to LLM failure modes.
- **Zod validation on every response.** Even with JSON mode, LLMs occasionally produce malformed output. Zod's `safeParse` catches anything off and returns a graceful "could you rephrase?" fallback instead of crashing.
- **Conversation history is bounded** to the last 20 messages to keep token cost predictable and prevent context drift.
- **Constraint-aware system prompt.** The model is explicitly instructed to filter by protein, dietary, and spice constraints rather than pad the list with "similar" items — solving a common LLM failure mode where recommendations include off-topic results.
- **`suggestions` vs `actions` are mutually distinct.** Suggestions are for the user to consider (rendered as tappable cards); actions are confirmed mutations to the cart. The system prompt enforces this distinction.

---

##  Running locally

### Prerequisites

- Node.js 20 or newer
- An iPhone with **Expo Go** installed (free from the App Store)
- A **Together AI** API key (free signup at [api.together.ai](https://api.together.ai))
- iPhone and Mac on the **same WiFi network**

### Backend

```bash
cd bistro-backend
npm install
cp .env.example .env
# Edit .env and paste your TOGETHER_API_KEY
npm run dev
```

The API listens on `http://localhost:3000`. Verify with:

```bash
curl http://localhost:3000/health      # → {"status":"ok"}
curl http://localhost:3000/api/menu    # → the menu JSON
```

### Frontend

Find your Mac's LAN IP:

```bash
ipconfig getifaddr en0      # e.g. 10.0.0.135
```

In `bistro-frontend/src/lib/api.ts`, update `API_BASE` to `http://<your-mac-ip>:3000`.

```bash
cd bistro-frontend
npm install --legacy-peer-deps
npx expo start --clear
```

Open the **Camera app** on your iPhone, scan the QR code in the terminal, and tap the banner. The Wokwise app loads in Expo Go.

---

##  How I used Claude Code

This project was built primarily with **Claude Code** (Anthropic's terminal-based agentic coding assistant), guided by careful prompt engineering at every step. Concretely:

- **Scaffolding.** Claude Code generated the initial Expo + Node monorepo structure, NativeWind v4 setup, expo-router config, Together AI client, Zod schemas, and Zustand stores from a single comprehensive specification.
- **Iterative refinement.** Every UI component was specified with explicit visual requirements (typography, spacing, color tokens, animation timings) and Claude Code implemented them with NativeWind classes. I reviewed each change, tested on device, and prompted for refinements.
- **AI integration tuning.** The system prompt, JSON output schema, and conversation context handling were designed iteratively. Bugs like the LLM dropping conversation context after "yes" responses, or padding constraint-based recommendations with off-topic items, were diagnosed by inspecting the actual chat responses and fixed by tightening the system prompt's explicit rules.
- **Diagnostic loop.** When bugs appeared (iOS Modal stacking issues, keyboard handling inside Modals, broken image URLs, category routing), I used Claude Code to read the relevant files via `grep`/`sed`, identify root causes, and apply targeted fixes — rather than vague "make it work" prompts.

The pattern that worked: **specify the contract, let the AI implement, verify on device, prompt for precise fixes.** Vague prompts produced vague code; specific prompts with quality bars produced production-grade output.

---

##  Assignment requirements coverage

| Requirement | Where to find it |
|---|---|
| **Visual Excellence** | Landing page, menu, chat sheet, item detail sheet, cart drawer, order confirmation — all coherently styled with Fraunces serif + Inter, sage/persimmon palette, NativeWind v4 |
| **Conversational Logic** | `bistro-backend/src/ai/system-prompt.ts` defines Woki's behavior. The endpoint parses orders, handles "yes" confirmations, fuzzy item matching, modify intents, constraint-aware recommendations, and never resets context mid-conversation. |
| **State Management** | Zustand stores in `bistro-frontend/src/store/`. Cart can be modified via UI (cards, stepper, swipe-delete) AND via AI (action JSON applied through `apply-cart-actions.ts`) — both write to the same source of truth. |
| **Backend NLP** | `bistro-backend/src/routes/chat.ts` + `src/ai/`. POST `/api/chat` accepts natural language with cart and history context, returns Zod-validated structured JSON. |

---

##  Known limitations & future work

- **Image URLs** point to Unsplash. If a URL ever 404s, the menu card shows blank space — a fallback asset would be a 30-minute follow-up.
- **No persistent cart.** Refreshing the app loses cart state. Adding AsyncStorage hydration is a small follow-up.
- **No user auth.** The assignment scope didn't require it; the app uses a single anonymous session. A real version would add OAuth and per-user order history.
- **Checkout is a visual flow only** — no payment integration. A real version would integrate Stripe or similar.

---

## 📂 License

Built as an internship submission. Not for production use.