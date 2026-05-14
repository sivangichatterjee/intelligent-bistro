# Wokwise — Backend API

Node.js + Express + TypeScript API powering the Wokwise bistro ordering app.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/menu` | Returns the full menu array |
| POST | `/api/chat` | Sends a message + cart to the AI, returns cart actions + reply |

## POST /api/chat

**Request**
```json
{
  "message": "Add two spicy tuna bowls and a matcha latte",
  "cart": [
    { "item_id": "crispy_spring_rolls", "quantity": 1 }
  ]
}
```

**Response**
```json
{
  "reply": "Done! I've added two Spicy Tuna Bowls and a Matcha Latte to your cart.",
  "actions": [
    { "type": "add", "item_id": "spicy_tuna_bowl", "quantity": 2 },
    { "type": "add", "item_id": "matcha_latte", "quantity": 1 }
  ]
}
```

## Development

```bash
cp .env.example .env   # add your TOGETHER_API_KEY
npm install
npm run dev            # tsx watch — auto-reloads on save
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `TOGETHER_API_KEY` | Together AI API key |
| `PORT` | Server port (default: 3000) |
