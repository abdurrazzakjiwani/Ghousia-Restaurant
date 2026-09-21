# Quickstart: Bug Fixes, Order Persistence & Email Notifications

**Feature**: 011-fix-bugs-orders-email
**Date**: 2026-09-19

---

## Prerequisites

- Node.js 18+
- npm
- Supabase project access (existing `customer_orders` table)
- Resend account (free tier: https://resend.com)
- Git

---

## Environment Variables

Add to `.env.local`:

```bash
# Existing (should already be set)
NEXT_PUBLIC_SUPABASE_URL=https://obcrnyhpgjpntwtttlin.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# New for email
RESEND_API_KEY=re_your_resend_api_key
RESTAURANT_EMAIL=abdurrazzakjiwani.work@gmail.com
```

---

## Database Setup

Run in Supabase SQL Editor:

```sql
-- Add new columns to customer_orders
ALTER TABLE customer_orders
  ADD COLUMN IF NOT EXISTS order_number TEXT,
  ADD COLUMN IF NOT EXISTS customer_email TEXT,
  ADD COLUMN IF NOT EXISTS order_status TEXT DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'cash_on_delivery';

-- Unique constraint for order numbers
CREATE UNIQUE INDEX IF NOT EXISTS idx_customer_orders_order_number 
  ON customer_orders(order_number);

-- Index for phone lookup
CREATE INDEX IF NOT EXISTS idx_customer_orders_phone 
  ON customer_orders(phone);

-- Index for chronological ordering
CREATE INDEX IF NOT EXISTS idx_customer_orders_created_at 
  ON customer_orders(created_at DESC);
```

---

## Install Dependencies

```bash
npm install resend react-email
```

---

## File Changes Summary

### Bug Fixes (Phase 1)

| File | Change | FR |
|------|--------|----|
| `src/contexts/CartContext.tsx` | NEW: React Context for cart state | FR-003 |
| `src/hooks/useCart.ts` | REWRITE: thin wrapper around CartContext | FR-003 |
| `src/app/layout.tsx` | MODIFY: wrap with CartProvider | FR-003 |
| `src/components/layout/CartBadge.tsx` | MODIFY: use CartContext | FR-003 |
| `src/app/menu/page.tsx` | MODIFY: read ?category= param | FR-001 |
| `src/components/layout/MainNav.tsx` | MODIFY: fix search router.push() | FR-002 |
| `src/components/menu/MenuItemModal.tsx` | MODIFY: add quantity +/- controls | FR-004 |

### Order Persistence (Phase 2)

| File | Change | FR |
|------|--------|----|
| `src/types/index.ts` | MODIFY: add order_number to types | FR-006 |
| `src/lib/orders.ts` | NEW: order number generation | FR-006, FR-013 |
| `src/app/api/orders/route.ts` | MODIFY: add order_number, email trigger | FR-005, FR-006 |
| `src/components/order/CheckoutStep2.tsx` | MODIFY: call POST API | FR-005 |
| `src/app/thank-you/page.tsx` | NEW: post-order confirmation page | FR-007 |
| `src/app/tracking/page.tsx` | MODIFY: order_number lookup + polling | FR-008, FR-009 |

### Email Notifications (Phase 3)

| File | Change | FR |
|------|--------|----|
| `src/lib/email/resend.ts` | NEW: Resend client setup | FR-010, FR-011 |
| `src/emails/OrderConfirmation.tsx` | NEW: customer email template | FR-011 |
| `src/emails/RestaurantAlert.tsx` | NEW: restaurant email template | FR-010 |
| `src/app/api/email/send/route.ts` | NEW: email API endpoint | FR-010, FR-011 |

---

## Development Commands

```bash
# Start dev server
npm run dev

# Build
npm run build

# Lint
npm run lint

# Deploy to production
npx vercel --prod --yes
```

---

## Testing Checklist

### Bug Fixes
- [ ] Click category in navbar dropdown → navigates to /menu?category=burgers → shows only burgers
- [ ] Type in navbar search → click result → navigates to /menu?highlight=ID → item scrolled and highlighted
- [ ] Add item to cart → badge updates in navbar immediately
- [ ] Remove item from order page → badge updates immediately
- [ ] Click menu item → modal shows +/- quantity controls
- [ ] Set quantity to 5 → click Add to Cart → 5 units added

### Order Persistence
- [ ] Complete checkout → order saved to database with order_number
- [ ] Order number format: GGS-YYYYMMDD-XXXX
- [ ] Thank you page shows order number, summary, estimated time
- [ ] Navigate to /tracking?order=GGS-YYYYMMDD-XXXX → shows order status
- [ ] Wait 30 seconds → status refreshes automatically
- [ ] Enter invalid order number → shows "Order not found"

### Email Notifications
- [ ] Place order → restaurant receives email notification
- [ ] Provide email during checkout → customer receives confirmation email
- [ ] Email service down → order still succeeds (check console for error)

---

## Key Architecture Decisions

1. **Cart as Context**: Cart state is now managed via React Context, ensuring all components share the same state
2. **Order numbers generated server-side**: Prevents client-side race conditions
3. **Email is non-blocking**: Orders succeed even if email fails (try/catch wrapper)
4. **Polling over WebSocket**: 30-second interval polling is simpler and sufficient for restaurant scale
5. **WhatsApp preserved**: Orders are saved to DB AND sent to WhatsApp (dual path)
