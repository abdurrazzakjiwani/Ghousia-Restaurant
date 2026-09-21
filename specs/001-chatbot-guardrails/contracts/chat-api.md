# API Contract: POST /api/chat

**Feature**: 001-chatbot-guardrails
**Date**: 2026-09-18

## Request

### Headers

```
Content-Type: application/json
```

### Body

```json
{
  "session_id": "string (required)",
  "message": "string (required, max 500 characters)",
  "history": "Array<{role: 'user' | 'assistant', content: string}> (optional)"
}
```

### Validation

| Field | Rule | Error Response |
|-------|------|----------------|
| session_id | Required, non-empty | 400: `{ error: { code: "VALIDATION_ERROR", message: "session_id and message are required" } }` |
| message | Required, non-empty | 400: Same as above |
| message | Max 500 characters | 200: `{ session_id, response: "Please keep your message short (under 500 characters). Thank you." }` |

## Response

### Success (200)

#### Normal Response

```json
{
  "session_id": "string",
  "response": "string (the AI's response)"
}
```

#### Order Intent Detected

```json
{
  "session_id": "string",
  "response": "string (order confirmation)",
  "orderUrl": "string (WhatsApp URL)",
  "orderItems": [
    {
      "menu_item_id": "string",
      "name": "string",
      "quantity": "number",
      "price": "number",
      "subtotal": "number"
    }
  ],
  "orderTotal": "number"
}
```

#### Abuse Detected (200, not 400)

```json
{
  "session_id": "string",
  "response": "string (polite refusal message)"
}
```

#### Off-Topic (200, not 400)

```json
{
  "session_id": "string",
  "response": "string (polite refusal message)"
}
```

### Error (400)

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "string"
  }
}
```

### Error (500)

```json
{
  "error": {
    "code": "SERVER_ERROR",
    "message": "Internal server error"
  }
}
```

## Processing Flow

```
1. Validate request (session_id, message required)
2. Check message length > 500 chars → return length notice
3. Check isAbusive(message) → return abuse refusal
4. Check isRestaurantContext(message) → return off-topic refusal
5. Check order intent (detectOrderIntent) → return order confirmation
6. Build dynamic system prompt (buildSystemPrompt)
7. Call Groq API with system prompt + history + message
8. Optionally add closing salutation
9. Return response
```

## Response Examples

### Off-Topic Question

Request:
```json
{
  "session_id": "abc123",
  "message": "What is Python?",
  "history": []
}
```

Response:
```json
{
  "session_id": "abc123",
  "response": "Sir, the question you asked isn't relevant right now; please ask questions related to our restaurant. JazakAllah Sir."
}
```

### Abusive Message

Request:
```json
{
  "session_id": "abc123",
  "message": "[contains profanity]",
  "history": []
}
```

Response:
```json
{
  "session_id": "abc123",
  "response": "Sir, please maintain a respectful tone. I'm here to help you with our restaurant information. JazakAllah Sir."
}
```

### Menu Question

Request:
```json
{
  "session_id": "abc123",
  "message": "What's on your menu?",
  "history": []
}
```

Response:
```json
{
  "session_id": "abc123",
  "response": "We have 13 categories with 41 items! Our specialties include Zinger Burger (Rs. 600), Tikka Platter (Rs. 1,200), Chicken Karahi (Rs. 1,400), and Grill Chargha (Rs. 1,100). We also have sandwiches, broast, BBQ, handi, Chinese, rolls, pasta, extras, fried items, and beverages. Would you like to know about any specific category?"
}
```

### Order Intent

Request:
```json
{
  "session_id": "abc123",
  "message": "I want 2 Zinger Burgers",
  "history": []
}
```

Response:
```json
{
  "session_id": "abc123",
  "response": "Great choice! Here's your order:\n\n2x Zinger Burger - Rs. 1,200\n\nTotal: Rs. 1,200\n\nClick the button below to send your order on WhatsApp.",
  "orderUrl": "https://wa.me/923013631555?text=...",
  "orderItems": [
    {
      "menu_item_id": "101",
      "name": "Zinger Burger",
      "quantity": 2,
      "price": 600,
      "subtotal": 1200
    }
  ],
  "orderTotal": 1200
}
```
