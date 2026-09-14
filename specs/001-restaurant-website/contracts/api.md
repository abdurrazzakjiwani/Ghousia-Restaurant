# API Contracts: Ghousia Golden Spoon Restaurant Website

**Feature**: 001-restaurant-website  
**Date**: 2026-09-14  
**Base URL**: `/api`

## Orders

### POST /api/orders

Create a new order.

**Request**:
```json
{
  "customer_name": "Ahmed Khan",
  "phone": "03211234567",
  "email": "ahmed@example.com",
  "address": "Block 5, Gulshan-e-Iqbal, Karachi",
  "payment_method": "cod",
  "items": [
    { "menu_item_id": "uuid", "quantity": 2 },
    { "menu_item_id": "uuid", "quantity": 1 }
  ],
  "notes": "Extra spicy please"
}
```

**Response 201**:
```json
{
  "id": "uuid",
  "customer_name": "Ahmed Khan",
  "phone": "03211234567",
  "order_status": "pending",
  "total_amount": 2000.00,
  "created_at": "2026-09-14T18:00:00Z"
}
```

**Errors**:
- 400: Missing required fields
- 400: Invalid menu_item_id
- 400: Item not available
- 500: Server error

---

### GET /api/orders?phone={phone}

Get orders by phone number.

**Response 200**:
```json
{
  "orders": [
    {
      "id": "uuid",
      "customer_name": "Ahmed Khan",
      "phone": "03211234567",
      "order_status": "preparing",
      "total_amount": 2000.00,
      "items": [
        { "name": "Zinger Burger", "quantity": 2, "price": 600.00 }
      ],
      "created_at": "2026-09-14T18:00:00Z"
    }
  ]
}
```

**Errors**:
- 400: Missing phone parameter
- 404: No orders found

---

## Reservations

### POST /api/reservations

Create a table reservation.

**Request**:
```json
{
  "customer_name": "Ahmed Khan",
  "phone": "03211234567",
  "date": "2026-09-20",
  "time": "19:30",
  "guests": 6,
  "notes": "Birthday celebration"
}
```

**Response 201**:
```json
{
  "id": "uuid",
  "customer_name": "Ahmed Khan",
  "phone": "03211234567",
  "date": "2026-09-20",
  "time": "19:30",
  "guests": 6,
  "status": "pending",
  "created_at": "2026-09-14T18:00:00Z"
}
```

**Errors**:
- 400: Missing required fields
- 400: Date is in the past
- 400: Time outside business hours (17:30 - 02:00)
- 400: Guests exceeds maximum (20)

---

## Reviews

### POST /api/reviews

Submit a customer review.

**Request**:
```json
{
  "customer_name": "Ahmed Khan",
  "rating": 5,
  "comment": "Excellent food and service!"
}
```

**Response 201**:
```json
{
  "id": "uuid",
  "customer_name": "Ahmed Khan",
  "rating": 5,
  "comment": "Excellent food and service!",
  "is_approved": false,
  "created_at": "2026-09-14T18:00:00Z"
}
```

**Errors**:
- 400: Missing required fields
- 400: Rating must be 1-5

---

### GET /api/reviews

Get approved reviews.

**Response 200**:
```json
{
  "reviews": [
    {
      "id": "uuid",
      "customer_name": "Ahmed Khan",
      "rating": 5,
      "comment": "Excellent food and service!",
      "created_at": "2026-09-14T18:00:00Z"
    }
  ]
}
```

---

## Contacts

### POST /api/contacts

Submit a contact form message.

**Request**:
```json
{
  "name": "Ahmed Khan",
  "phone": "03211234567",
  "email": "ahmed@example.com",
  "message": "Do you offer catering services?"
}
```

**Response 201**:
```json
{
  "id": "uuid",
  "name": "Ahmed Khan",
  "message": "Do you offer catering services?",
  "is_read": false,
  "created_at": "2026-09-14T18:00:00Z"
}
```

**Errors**:
- 400: Missing required fields (name, message)

---

## Chat

### POST /api/chat

Send a message to the AI chatbot.

**Request**:
```json
{
  "session_id": "session_abc123",
  "message": "I want 2 Zinger Burgers"
}
```

**Response 200**:
```json
{
  "session_id": "session_abc123",
  "response": "Great choice! Your order:\n• 2x Zinger Burger - Rs. 1,200\n\nTotal: Rs. 1,200\n\nShould I place this order via WhatsApp?",
  "order_data": {
    "items": [
      { "name": "Zinger Burger", "quantity": 2, "price": 600 }
    ],
    "total": 1200,
    "whatsapp_url": "https://wa.me/923013631555?text=..."
  }
}
```

**Errors**:
- 400: Missing session_id or message
- 500: AI service unavailable (fallback response provided)

---

## Delivery Check

### POST /api/delivery-check

Check if delivery is available to an address.

**Request**:
```json
{
  "address": "Block 5, Gulshan-e-Iqbal, Karachi"
}
```

**Response 200**:
```json
{
  "deliverable": true,
  "message": "Great news! We deliver to your area.",
  "estimated_time": "45-60 minutes"
}
```

**Notes**: All Karachi addresses are deliverable (simple check).

---

## Menu (Static/Data)

### GET /api/menu (optional - can use static data)

Get all menu items grouped by category.

**Response 200**:
```json
{
  "categories": [
    {
      "id": "uuid",
      "name": "Burgers",
      "slug": "burgers",
      "items": [
        {
          "id": "uuid",
          "name": "Zinger Burger",
          "description": "Crispy chicken fillet with special sauce",
          "price": 600.00,
          "image_url": "/images/food/burgers/zinger.png",
          "is_available": true,
          "is_featured": true
        }
      ]
    }
  ]
}
```

## Error Response Format

All errors follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Phone number is required",
    "details": {
      "field": "phone",
      "rule": "required"
    }
  }
}
```

## Rate Limiting

- API routes: 60 requests per minute per IP
- Chat API: 10 requests per minute per session
- No rate limiting on static/menu data

## Authentication

Phase 1: No authentication required for customer-facing features.  
Phase 2: Admin authentication via Supabase Auth for CMS operations.
