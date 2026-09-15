# API Contract: Chat Endpoint (Enhanced)

**Feature**: 003-menu-images-chatbot-fix  
**Endpoint**: `POST /api/chat`

## Request

```json
{
  "session_id": "string (required)",
  "message": "string (required)"
}
```

## Response — Order Detected

```json
{
  "session_id": "string",
  "response": "string (order confirmation text)",
  "orderUrl": "string (wa.me URL with pre-filled order)",
  "orderItems": [
    {
      "menu_item_id": "string",
      "name": "string",
      "quantity": "number",
      "price": "number (unit price in PKR)",
      "subtotal": "number (quantity × price)"
    }
  ],
  "orderTotal": "number (sum of all subtotals)"
}
```

## Response — No Order (Conversational)

```json
{
  "session_id": "string",
  "response": "string (LLM-generated text)",
  "orderUrl": null,
  "orderItems": null,
  "orderTotal": null
}
```

## Response — Error

```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| VALIDATION_ERROR | 400 | Missing session_id or message |
| SERVER_ERROR | 500 | Internal server error |

## Behavior

1. Server receives message
2. Runs order intent detection (keyword + menu matching)
3. If order items found: generate wa.me URL, return structured response with `orderUrl` and `orderItems`
4. If no order: send to LLM with conversation history, return text response
5. LLM fallback: if Groq API fails, return hardcoded restaurant contact info
