# Data Model: Ghousia Golden Spoon Restaurant Website

**Feature**: 001-restaurant-website  
**Date**: 2026-09-14  
**Database**: Supabase (PostgreSQL)

## Entity Relationship Diagram

```
categories 1───* menu_items
orders 1───* order_items
menu_items 1───* order_items
```

## Entities

### categories

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, default gen_random_uuid() | Unique identifier |
| name | TEXT | NOT NULL | Category name (e.g., "Burgers") |
| slug | TEXT | UNIQUE, NOT NULL | URL-friendly identifier (e.g., "burgers") |
| display_order | INT | NOT NULL | Sort order for display |
| icon | TEXT | NULLABLE | Emoji or icon identifier |
| created_at | TIMESTAMPTZ | default NOW() | Creation timestamp |

**Validation Rules**:
- name: 1-100 characters
- slug: lowercase alphanumeric with hyphens, unique
- display_order: positive integer

**State Transitions**: None (static data)

---

### menu_items

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, default gen_random_uuid() | Unique identifier |
| category_id | UUID | FK → categories.id, NOT NULL | Parent category |
| name | TEXT | NOT NULL | Item name |
| description | TEXT | NULLABLE | Item description |
| price | DECIMAL(10,2) | NOT NULL | Price in PKR |
| image_url | TEXT | NULLABLE | Path to item image |
| is_available | BOOLEAN | default true | Availability status |
| is_featured | BOOLEAN | default false | Show on home page |
| created_at | TIMESTAMPTZ | default NOW() | Creation timestamp |

**Validation Rules**:
- name: 1-200 characters
- price: positive decimal, max 99999.99
- image_url: valid URL or relative path

**State Transitions**:
- is_available: true ↔ false (admin toggle)
- is_featured: true ↔ false (admin toggle)

---

### orders

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, default gen_random_uuid() | Unique identifier |
| customer_name | TEXT | NOT NULL | Customer name |
| phone | TEXT | NOT NULL | Phone number |
| email | TEXT | NULLABLE | Email address |
| address | TEXT | NULLABLE | Delivery address |
| payment_method | TEXT | default 'cod' | Payment method |
| order_status | TEXT | default 'pending' | Current status |
| total_amount | DECIMAL(10,2) | NOT NULL | Total order amount |
| notes | TEXT | NULLABLE | Special instructions |
| created_at | TIMESTAMPTZ | default NOW() | Order timestamp |

**Validation Rules**:
- customer_name: 1-100 characters
- phone: valid Pakistani format (03XXXXXXXXX)
- payment_method: one of 'cod', 'jazzcash', 'easypaisa'
- total_amount: positive decimal

**State Transitions**:
```
pending → confirmed → preparing → out_for_delivery → delivered
   ↓          ↓           ↓              ↓
cancelled  cancelled   cancelled       delivered
```

---

### order_items

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, default gen_random_uuid() | Unique identifier |
| order_id | UUID | FK → orders.id, NOT NULL | Parent order |
| menu_item_id | UUID | FK → menu_items.id, NOT NULL | Menu item reference |
| quantity | INT | NOT NULL, default 1 | Item quantity |
| price | DECIMAL(10,2) | NOT NULL | Price at time of order |

**Validation Rules**:
- quantity: positive integer, max 100
- price: positive decimal (snapshot of menu price)

---

### reservations

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, default gen_random_uuid() | Unique identifier |
| customer_name | TEXT | NOT NULL | Customer name |
| phone | TEXT | NOT NULL | Phone number |
| date | DATE | NOT NULL | Reservation date |
| time | TIME | NOT NULL | Reservation time |
| guests | INT | NOT NULL | Number of guests |
| status | TEXT | default 'pending' | Reservation status |
| notes | TEXT | NULLABLE | Special requests |
| created_at | TIMESTAMPTZ | default NOW() | Creation timestamp |

**Validation Rules**:
- date: must be today or future
- time: must be within business hours (17:30 - 02:00)
- guests: 1-20

**State Transitions**:
```
pending → confirmed → completed
   ↓
cancelled
```

---

### reviews

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, default gen_random_uuid() | Unique identifier |
| customer_name | TEXT | NOT NULL | Reviewer name |
| rating | INT | NOT NULL | 1-5 star rating |
| comment | TEXT | NULLABLE | Review text |
| is_approved | BOOLEAN | default false | Moderation status |
| created_at | TIMESTAMPTZ | default NOW() | Submission timestamp |

**Validation Rules**:
- customer_name: 1-100 characters
- rating: integer 1-5
- comment: max 1000 characters

**State Transitions**:
```
pending → approved
   ↓
rejected (deleted)
```

---

### contacts

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, default gen_random_uuid() | Unique identifier |
| name | TEXT | NOT NULL | Contact name |
| phone | TEXT | NULLABLE | Phone number |
| email | TEXT | NULLABLE | Email address |
| message | TEXT | NOT NULL | Message content |
| is_read | BOOLEAN | default false | Read status |
| created_at | TIMESTAMPTZ | default NOW() | Submission timestamp |

**Validation Rules**:
- name: 1-100 characters
- message: 1-2000 characters
- email: valid format if provided

---

### chat_messages

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, default gen_random_uuid() | Unique identifier |
| session_id | TEXT | NOT NULL | Chat session identifier |
| role | TEXT | NOT NULL | 'user' or 'assistant' |
| content | TEXT | NOT NULL | Message content |
| created_at | TIMESTAMPTZ | default NOW() | Message timestamp |

**Validation Rules**:
- session_id: non-empty string
- role: one of 'user', 'assistant'
- content: 1-5000 characters

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_featured ON menu_items(is_featured) WHERE is_featured = true;
CREATE INDEX idx_menu_items_available ON menu_items(is_available) WHERE is_available = true;
CREATE INDEX idx_orders_phone ON orders(phone);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_reservations_date ON reservations(date);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reviews_approved ON reviews(is_approved) WHERE is_approved = true;
CREATE INDEX idx_contacts_read ON contacts(is_read) WHERE is_read = false;
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
```

## Row Level Security (RLS) Policies

```sql
-- Public read access for menu items and approved reviews
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read for available items
CREATE POLICY "Public can view available items" ON menu_items
  FOR SELECT USING (is_available = true);

-- Public read for approved reviews
CREATE POLICY "Public can view approved reviews" ON reviews
  FOR SELECT USING (is_approved = true);

-- Insert-only for orders, reservations, contacts, chat_messages
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create chat messages" ON chat_messages FOR INSERT WITH CHECK (true);

-- Read own data by phone
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (phone = current_setting('request.jwt.claims', true)::json->>'phone');
```
