# Data Model: Bug Fixes, Order Persistence & Email Notifications

**Feature**: 011-fix-bugs-orders-email  
**Date**: 2026-09-19

---

## Entities

### CustomerOrder (Extended)

The primary entity. Extends existing `customer_orders` table in Supabase.

| Field | Type | Nullable | Default | Constraint | Description |
|-------|------|----------|---------|------------|-------------|
| `id` | uuid | No | auto-generated | PK | Primary key |
| `order_number` | text | No | — | UNIQUE, INDEXED | Format: `GGS-YYYYMMDD-XXXX` |
| `customer_name` | text | No | — | — | Customer full name |
| `phone` | text | No | — | — | Customer phone number |
| `customer_email` | text | Yes | null | — | Customer email (optional) |
| `order_mode` | text | No | — | CHECK: delivery/pickup/dine-in | Order type |
| `branch` | text | Yes | null | — | Branch name (for pickup/dine-in) |
| `address` | text | Yes | null | — | Delivery address |
| `latitude` | number | Yes | null | — | GPS latitude |
| `longitude` | number | Yes | null | — | GPS longitude |
| `items` | jsonb | No | — | — | Array of order items |
| `total_amount` | number | No | — | — | Total in PKR |
| `order_status` | text | No | `'pending'` | — | Status value |
| `payment_method` | text | No | `'cash_on_delivery'` | — | Payment method |
| `notes` | text | Yes | null | — | Special instructions |
| `created_at` | timestamp | No | `now()` | — | Order creation time |

### Order Status Values

```
pending → confirmed → preparing → out_for_delivery → delivered
```

- `pending`: Order placed, awaiting restaurant confirmation
- `confirmed`: Restaurant has acknowledged the order
- `preparing`: Food is being prepared
- `out_for_delivery`: Order is on its way (delivery only)
- `delivered`: Order has been handed to customer

**Note**: Status transitions are deferred to a future feature. For now, status defaults to `pending` and can be updated manually in Supabase.

### Order Number Format

```
GGS-YYYYMMDD-XXXX
│    │        │
│    │        └─ Sequence: 4-digit zero-padded, resets daily at midnight PKT
│    └─ Date: YYYYMMDD in PKT timezone
└─ Prefix: Ghousia Golden Spoon
```

Examples: `GGS-20260919-0001`, `GGS-20260919-0042`

### Order Item (Embedded in `items` JSONB)

```typescript
{
  name: string;       // Menu item name
  quantity: number;    // 1-20
  price: number;       // Unit price in PKR
}
```

---

## Relationships

```
CustomerOrder (1) ──contains──► (N) OrderItem (embedded in items JSONB)
```

No separate `order_items` table — items are stored as JSONB in the order record for simplicity.

---

## Validation Rules

| Field | Rule | Source |
|-------|------|--------|
| `order_number` | Must match pattern `GGS-\d{8}-\d{4}`, must be unique | FR-006, FR-013 |
| `customer_name` | Required, non-empty string | Existing API validation |
| `phone` | Required, non-empty string | Existing API validation |
| `customer_email` | If provided, must be valid email format | Edge case |
| `order_mode` | Must be one of: delivery, pickup, dine-in | Existing API validation |
| `items` | Required, non-empty array | Existing API validation |
| `items[*].quantity` | Integer, 1-20 | FR-004 |
| `total_amount` | Positive number | Implied |
| `order_status` | Must be one of the 5 valid statuses | FR-014 |

---

## State Transitions

```
Order Placement Flow:
  [Checkout Form] → POST /api/orders → [pending] → [Thank You Page]

Order Status Updates (manual via Supabase):
  pending → confirmed → preparing → out_for_delivery → delivered
```

---

## Indexes

| Index | Columns | Purpose |
|-------|---------|---------|
| `idx_customer_orders_order_number` | `order_number` (UNIQUE) | Fast lookup by order number, collision prevention |
| `idx_customer_orders_phone` | `phone` | Fast lookup by phone (existing) |
| `idx_customer_orders_created_at` | `created_at` DESC | Chronological ordering |

---

## Migration SQL

```sql
-- Add new columns
ALTER TABLE customer_orders
  ADD COLUMN IF NOT EXISTS order_number TEXT,
  ADD COLUMN IF NOT EXISTS customer_email TEXT,
  ADD COLUMN IF NOT EXISTS order_status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'cash_on_delivery';

-- Add unique constraint and index
CREATE UNIQUE INDEX IF NOT EXISTS idx_customer_orders_order_number 
  ON customer_orders(order_number);

-- Add index for phone lookup (if not exists)
CREATE INDEX IF NOT EXISTS idx_customer_orders_phone 
  ON customer_orders(phone);

-- Add index for chronological ordering
CREATE INDEX IF NOT EXISTS idx_customer_orders_created_at 
  ON customer_orders(created_at DESC);
```
