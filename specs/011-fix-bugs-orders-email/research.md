# Research: Bug Fixes, Order Persistence & Email Notifications

**Feature**: 011-fix-bugs-orders-email  
**Date**: 2026-09-19  
**Status**: Complete

---

## R1: Cart Reactivity Bug — Context vs. Other Solutions

**Decision**: Convert `useCart` from a plain hook to a React Context + Provider pattern.

**Rationale**: 
- Each component calling `useCart()` currently gets independent state — mutations in one component don't propagate to others
- React Context is the standard solution for shared state across component trees in React 18
- localStorage persistence is already implemented and will be preserved inside the Context provider
- Alternatives considered:
  - Zustand/Redux: Overkill for this use case — adds bundle size for a simple cart
  - Event emitter: Fragile, no dev tools, hard to test
  - Prop drilling: Not feasible with Navbar at top level and cart used deep in pages

**Implementation**: 
- Create `CartContext.tsx` with `CartProvider` wrapping the app
- `useCart()` becomes a thin wrapper calling `useContext(CartContext)`
- All existing APIs preserved: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `total`, `itemCount`
- localStorage read/write happens inside the provider, ensuring single source of truth

---

## R2: Category Dropdown Navigation

**Decision**: Add `searchParams.get("category")` to `menu/page.tsx` and initialize `selectedCategory` from it.

**Rationale**:
- CategoryDropdown already pushes `/menu?category=slug` (MainNav.tsx line 40)
- Menu page ignores the `?category=` param — it only reads `?highlight=`
- Fix: read `category` from searchParams on mount, set `selectedCategory` accordingly
- Must also handle case where user navigates from category link vs. direct URL

**Implementation**:
```typescript
const categoryParam = searchParams.get("category");
const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
useEffect(() => {
  if (categoryParam) setSelectedCategory(categoryParam);
}, [categoryParam]);
```

---

## R3: Search Navigation Bug

**Decision**: Fix `MainNav.handleSearchNavigate` to actually call `router.push()`.

**Rationale**:
- Currently extracts highlight param and sets local state, but never navigates
- The `highlightId` state is set in MainNav but never passed anywhere useful
- Fix: call `router.push(path)` to navigate to `/menu?highlight={id}`
- The menu page already handles `?highlight=` scrolling and highlighting

**Implementation**:
```typescript
const handleSearchNavigate = useCallback((path: string) => {
  router.push(path);
}, [router]);
```

---

## R4: Quantity Controls in MenuItemModal

**Decision**: Add local `quantity` state (1-20) with +/- buttons in the modal.

**Rationale**:
- Modal currently always adds quantity=1
- MenuCard already has inline +/- controls (visible when `cartQuantity > 0`)
- Modal needs its own quantity state since it's a separate component
- Range: 1-20 per spec (FR-004, SC-004)

**Implementation**:
- Add `const [quantity, setQuantity] = useState(1)` in MenuItemModal
- Add minus button (disabled when quantity=1), quantity display, plus button (disabled when quantity=20)
- Pass `quantity` to `onAddToCart(item, quantity)` — update callback signature
- Reset quantity to 1 when modal closes

---

## R5: Order Number Generation (GGS-YYYYMMDD-XXXX)

**Decision**: Generate order numbers server-side in the API route using a date-based sequence with Supabase query for the last sequence number.

**Rationale**:
- Format: `GGS-YYYYMMDD-XXXX` where XXXX is sequential within the day
- Must handle concurrent orders without collisions (FR-013)
- Daily reset at midnight PKT (Assumption)
- Implementation: query `customer_orders` for count of orders today → next sequence = count + 1
- Database unique constraint on `order_number` prevents race condition collisions
- Retry logic: if insert fails due to unique constraint, increment sequence and retry (max 3 attempts)

**Implementation**:
```typescript
async function generateOrderNumber(): Promise<string> {
  const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Karachi' }).replace(/-/g, '');
  const prefix = `GGS-${today}`;
  
  // Get count of orders today for sequence
  const { count } = await supabase
    .from('customer_orders')
    .select('*', { count: 'exact', head: true })
    .like('order_number', `${prefix}-%`);
  
  const seq = (count || 0) + 1;
  return `${prefix}-${String(seq).padStart(4, '0')}`;
}
```

---

## R6: Email Integration (Resend)

**Decision**: Use Resend with test domain (`onboarding@resend.dev`) for initial implementation.

**Rationale**:
- Resend is simple, has a generous free tier (100 emails/day, 3000/month)
- Test domain works without DNS verification — immediate development
- React Email for templates (already in ecosystem, Next.js compatible)
- Email failure must NOT block order placement (FR-012) — wrap in try/catch, log error, continue

**Implementation**:
- `npm install resend react-email`
- Create `src/lib/email/resend.ts` with Resend client
- Create email templates as React components
- Send emails in API route AFTER successful order insert, in try/catch
- Environment variables: `RESEND_API_KEY`, `RESTAURANT_EMAIL`

**Alternatives considered**:
- Nodemailer: More setup, requires SMTP config, less modern API
- SendGrid: More complex, higher learning curve, paid tier needed for templates
- AWS SES: Requires AWS account, more infrastructure

---

## R7: Thank You Page

**Decision**: Create `/thank-you` page that receives order data via URL search params or localStorage.

**Rationale**:
- After order placement, redirect to `/thank-you?order=GGS-YYYYMMDD-XXXX`
- Page fetches order details from API using the order number
- Displays: order number, order summary, estimated preparation time (30 min fixed)
- Must work even if API is slow — show order number immediately, load details progressively

**Implementation**:
- New page at `src/app/thank-you/page.tsx`
- Read `?order=` param, fetch from `/api/orders?order_number={orderNumber}`
- Show loading skeleton, then order details
- Link to tracking page

---

## R8: Tracking Page Enhancement

**Decision**: Add order number lookup and 30-second polling to existing tracking page.

**Rationale**:
- Currently only supports phone number lookup
- Must add order number input field (FR-008)
- Add `setInterval` for 30-second polling (FR-009)
- Clean up interval on component unmount
- Show "Order not found" for invalid order numbers (FR-015)

**Implementation**:
- Add order number input alongside phone input
- New API endpoint or extend GET to accept `?order_number=` param
- Polling: `useEffect` with `setInterval(fetchOrder, 30000)`, cleanup on unmount
- Visual progress indicator with status steps (already exists in `OrderTracker` component)

---

## R9: Checkout Flow Integration

**Decision**: Modify CheckoutStep2 to call POST API first, then open WhatsApp as secondary action.

**Rationale**:
- Currently only generates WhatsApp URL — order never saved to database
- Fix: call `fetch('/api/orders', { method: 'POST', body: ... })` first
- On success: show thank you page with order number
- WhatsApp link opened in new tab as secondary option (preserve existing behavior)
- Handle API errors gracefully — show error message, don't lose form data

**Implementation**:
- Add loading state during API call
- On success: `router.push(/thank-you?order=${orderNumber})`
- WhatsApp link still available but order is already saved
- Show both "Order placed!" confirmation and WhatsApp option

---

## R10: Database Schema Changes

**Decision**: Add columns to existing `customer_orders` table via Supabase dashboard (no migration files).

**Rationale**:
- No migration system exists in the project
- Supabase dashboard allows direct schema editing
- Columns to add:
  - `order_number` (text, unique, indexed)
  - `customer_email` (text, nullable)
  - `order_status` (text, default: 'pending')
  - `payment_method` (text, default: 'cash_on_delivery')
- Add unique constraint on `order_number` for collision prevention

**Implementation**:
- Manual SQL via Supabase dashboard or SQL editor:
```sql
ALTER TABLE customer_orders
  ADD COLUMN order_number TEXT UNIQUE,
  ADD COLUMN customer_email TEXT,
  ADD COLUMN order_status TEXT DEFAULT 'pending',
  ADD COLUMN payment_method TEXT DEFAULT 'cash_on_delivery';

CREATE UNIQUE INDEX idx_customer_orders_order_number ON customer_orders(order_number);
```

---

## R11: Type Updates

**Decision**: Update `CustomerOrder` and `Order` types to include new fields.

**Rationale**:
- `CustomerOrder` needs: `order_number`, `customer_email`, `order_status`, `payment_method`
- `Order` already has `email` and `payment_method` but needs `order_number`
- Both types are used across the codebase — must update consistently

**Implementation**:
```typescript
export interface CustomerOrder {
  id: string;
  order_number: string;        // NEW
  customer_name: string;
  phone: string;
  customer_email: string | null; // NEW
  order_mode: "delivery" | "pickup" | "dine-in";
  branch: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  items: { name: string; quantity: number; price: number }[];
  total_amount: number;
  order_status: string;        // NEW
  payment_method: string;      // NEW
  notes: string | null;
  created_at: string;
}
```
