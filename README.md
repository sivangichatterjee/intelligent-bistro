# Wokwise

An AI-powered Asian fusion bistro ordering app. Built as a 2-day internship submission for Viridien.

---

## What It Is

Wokwise lets guests browse a curated Asian fusion menu and build their cart through natural conversation. An on-screen AI assistant understands plain-English requests — "add two spicy tuna bowls and remove the dumplings" — and updates the cart in real time, replying in a warm, on-brand voice.

---

## Stack

| Layer | Technology |
|---|---|
| Mobile app | Expo (React Native) + NativeWind v4 |
| Navigation | expo-router |
| State | Zustand |
| Animations | react-native-reanimated |
| AI inference | Together AI — Llama 3.3 70B Instruct Turbo |
| Backend API | Node.js + Express + TypeScript |

---

## Features

- **Browsable menu** — 20–25 items across 7 categories (Appetizers, Bowls, Dumplings, Noodles, Rice, Sides, Drinks), each with a photo, tags, and pricing
- **AI cart assistant** — natural language ordering powered by Together AI with structured JSON output
- **Live cart** — add, remove, update, and clear items via conversation or direct tap
- **Tag filtering** — filter by dietary tags: spicy, vegetarian, vegan, gluten-free
- **Haptic feedback & fluid animations** — premium feel throughout

---

## Project Structure

```
intelligent-bistro/
├── bistro-frontend/   # Expo app
└── bistro-backend/    # Express + TypeScript API
```

---

## Design Language

Warm, editorial, and calm. The palette pairs a warm off-white background (`#FAF7F2`) with a persimmon red accent (`#D64545`) and sage green secondary (`#7A8B6F`). Typography mixes **Inter** for UI legibility with **Fraunces** serif for display headings.

---

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo`)
- A Together AI API key

### Backend
```bash
cd bistro-backend
npm install
cp .env.example .env   # add TOGETHER_API_KEY
npm run dev
```

### Frontend
```bash
cd bistro-frontend
npm install
npx expo start
```

---

## Submission

Built for the Viridien 2-day internship challenge. See `CLAUDE.md` for full technical specification and development conventions.
