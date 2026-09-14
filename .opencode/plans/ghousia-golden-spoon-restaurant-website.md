# Ghousia Golden Spoon — Professional Restaurant Website Plan

## 1. Project Overview

**Restaurant**: Ghousia Golden Spoon  
**Type**: Pakistani Restaurant (BBQ, Broast, Chinese, Fast Food)  
**Tech Stack**: Next.js 14 (App Router) + Tailwind CSS + Supabase  
**Design Theme**: White/Black text with purple-blue gradient (no golden), modern & clean  
**Phase 1**: Restaurant Website (this plan)  
**Phase 2**: Live CMS (Admin Dashboard) — planned after Phase 1  

---

## 2. Tech Stack & Tools

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14 (App Router) | SSR/SSG, routing, API routes |
| Styling | Tailwind CSS | Utility-first responsive design |
| Database | Supabase (PostgreSQL) | Orders, menu items, contacts |
| Auth | Supabase Auth | Admin login (for CMS phase) |
| Storage | Supabase Storage | Food images hosting |
| Maps | Google Maps Embed API | Restaurant location |
| Payments | Stripe / JazzCash / EasyPaisa | Online payment (backend) |
| Deployment | Vercel (local dev for now) | Static + serverless |
| AI Images | Generate via prompt descriptions | Missing food item photos |

---

## 3. Pages & Features

### 3.1 Home Page (`/`)
- Hero section with restaurant name, tagline, CTA button
- Featured menu items (top picks)
- About snippet (2-3 lines)
- Testimonials / customer reviews
- Quick contact info + Google Maps preview
- Order Now floating button (WhatsApp/phone link)

### 3.2 About Page (`/about`)
- Restaurant story / history
- Mission & values
- Team / chef highlights
- Restaurant interior/exterior photos

### 3.3 Menu Page (`/menu`)
- **Category tabs**: Burgers, Sandwiches, Broast, BBQ, Chargha, Karahi, Handi, Chinese, Rolls, Pasta, Extras, Fried Items, Beverages
- Each item: Image + Name + Description + Price
- Filter/search by category
- "Add to Order" button per item
- Responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)

### 3.4 Location Page (`/location`)
- Google Maps embed with restaurant pin
- Full address display
- Opening hours
- Directions link (opens Google Maps app)

### 3.5 Contact Page (`/contact`)
- Contact form (Name, Phone, Email, Message)
- Phone number (click to call)
- WhatsApp link
- Social media links
- Working hours

### 3.6 Order Summary (`/order`)
- Cart/order summary with selected items
- Customer details form
- Payment method selection (Cash on Delivery, JazzCash, EasyPaisa, Stripe)
- Order confirmation

---

## 4. Design System

### Color Palette
```
Primary:     #000000 (Black)
Secondary:   #FFFFFF (White)
Accent:      Linear gradient from #667eea → #764ba2 (Purple-blue gradient)
Text:        #1a1a1a (Dark), #ffffff (Light)
Background:  #ffffff (White), #f8f9fa (Light gray)
Card BG:     #ffffff with subtle shadow
```

### Typography
```
Headings:  Inter / Poppins (Bold, 700)
Body:      Inter / Poppins (Regular, 400)
Prices:    Inter (Semi-bold, 600)
```

### Components
- Navbar: Sticky, transparent → solid on scroll, mobile hamburger menu
- Footer: Social links, quick nav, copyright
- Cards: Rounded corners, hover effects, shadow transitions
- Buttons: Gradient background, hover scale effect
- Modal: For item details / order form

---

## 5. Menu Data Structure

### Categories & Items (Complete List)

**1. Burgers**
- Zinger Burger
- Beef Burger
- Chicken Burger
- Grill Burger
- Cheesey Burger
- Volcano Burger

**2. Sandwiches**
- Club Sandwich
- Chicken Sandwich
- Grill Sandwich
- BBQ Sandwich
- Malai Sandwich
- Crispy Sandwich

**3. Broast**
- Leg Broast
- Chest Broast
- Spicy Broast
- Masala Broast
- Dynamite Broast

**4. BBQ**
- Chicken Tikka
- Sizzling Tikka
- Malai Boti
- Chicken Boti
- Bihari Kabab
- Chicken Kabab
- Dhaga Kabab
- Reshmi Kabab
- Chandan Kabab
- Seekh Kabab
- Gola Kabab

**5. Chargha**
- Grill Chargha

**6. Karahi**
- Chicken Karahi
- Koyla Karahi

**7. Handi**
- Chicken Handi

**8. Chinese**
- Chicken Jalfrezi with Rice
- Chicken Shashlik with Rice
- Chicken Chilli with Rice
- Chicken Dry Chilli with Rice
- Chicken Sauce

**9. Rolls**
- Chicken Roll
- Zinger Roll
- Beef Roll

**10. Pasta**
- Chicken Creamy Pasta
- Chicken Pasta

**11. Extras**
- Paratha
- Raita
- French Fries
- Extra Bun
- Halwa
- Roghni Kulcha
- Salad
- BBQ Sauce

**12. Fried Items**
- Fried Beef Kabab

**13. Beverages**
- Pepsi
- 7UP
- Mirinda
- Mountain Dew
- Aquafina Water

---

## 6. Food Images Strategy

### Images Already Available (10 items)
| File | Item |
|------|------|
| `Zinger Burger.png` | Zinger Burger |
| `Club Sandwitch.png` | Club Sandwich |
| `Fried Rice.png` | Chicken Jalfrezi/Shashlik with Rice |
| `Tikka.png` | Chicken Tikka |
| `Gola Kabab.png` | Gola Kabab |
| `Grill Chargha.png` | Grill Chargha |
| `Karahi.png` | Karahi |
| `Malai Boti.png` | Malai Boti |
| `Paratha.png` | Paratha |
| `Shashlik.png` | Chicken Shashlik |

### Images Needed (AI-Generated Descriptions)
For items without photos, generate realistic food photography using AI image generation prompts:

| Category | Missing Items | Count |
|----------|--------------|-------|
| Burgers | Beef, Chicken, Grill, Cheesey, Volcano | 5 |
| Sandwiches | Chicken, Grill, BBQ, Malai, Crispy | 5 |
| Broast | Leg, Chest, Spicy, Masala, Dynamite | 5 |
| BBQ | Sizzling Tikka, Chicken Boti, Bihari Kabab, Chicken Kabab, Dhaga Kabab, Reshmi Kabab, Chandan Kabab, Seekh Kabab | 8 |
| Karahi | Chicken, Koyla (separate from existing) | 1 |
| Handi | Chicken Handi | 1 |
| Chinese | Jalfrezi, Chilli, Dry Chilli, Sauce | 4 |
| Rolls | Chicken, Zinger, Beef | 3 |
| Pasta | Creamy, Regular | 2 |
| Extras | Raita, Fries, Bun, Halwa, Kulcha, Salad, BBQ Sauce | 7 |
| Fried | Fried Beef Kabab | 1 |
| Beverages | Pepsi, 7UP, Mirinda, Dew, Aquafina | 5 |

**Total AI Images Needed: ~47**

---

## 7. Database Schema (Supabase)

### Tables

```sql
-- Menu categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  display_order INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu items
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  payment_method TEXT, -- 'cod', 'jazzcash', 'easypaisa', 'stripe'
  payment_status TEXT DEFAULT 'pending',
  order_status TEXT DEFAULT 'pending', -- pending, confirmed, preparing, delivered
  total_amount DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  menu_item_id UUID REFERENCES menu_items(id),
  quantity INT DEFAULT 1,
  price DECIMAL(10,2)
);

-- Contact messages
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 8. Project Structure

```
ghousia_golden_web/
├── public/
│   ├── images/
│   │   ├── logo/
│   │   │   └── Logo.png
│   │   ├── food/
│   │   │   ├── burgers/
│   │   │   ├── sandwiches/
│   │   │   ├── broast/
│   │   │   ├── bbq/
│   │   │   ├── chargha/
│   │   │   ├── karahi/
│   │   │   ├── handi/
│   │   │   ├── chinese/
│   │   │   ├── rolls/
│   │   │   ├── pasta/
│   │   │   ├── extras/
│   │   │   ├── fried/
│   │   │   └── beverages/
│   │   └── hero/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (navbar + footer)
│   │   ├── page.tsx            # Home page
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── menu/
│   │   │   └── page.tsx
│   │   ├── location/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── order/
│   │   │   └── page.tsx
│   │   └── api/
│   │       ├── orders/
│   │       │   └── route.ts
│   │       └── contact/
│   │           └── route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturedMenu.tsx
│   │   │   ├── AboutPreview.tsx
│   │   │   └── Testimonials.tsx
│   │   ├── menu/
│   │   │   ├── MenuGrid.tsx
│   │   │   ├── MenuCard.tsx
│   │   │   └── CategoryFilter.tsx
│   │   ├── order/
│   │   │   ├── OrderSummary.tsx
│   │   │   └── PaymentForm.tsx
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx
│   │   │   └── MapEmbed.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── GradientText.tsx
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client
│   │   ├── menu-data.ts       # Menu data/config
│   │   └── utils.ts           # Helper functions
│   ├── hooks/
│   │   ├── useCart.ts         # Shopping cart state
│   │   └── useOrder.ts        # Order management
│   └── types/
│       └── index.ts           # TypeScript interfaces
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## 9. Implementation Steps (Ordered)

### Step 1: Project Initialization
- Initialize Next.js 14 with TypeScript + Tailwind CSS
- Install dependencies: `@supabase/supabase-js`, `lucide-react` (icons)
- Configure Tailwind with custom colors (gradient, theme)
- Set up folder structure

### Step 2: Setup Supabase
- Create Supabase project (free tier)
- Run database schema (categories, menu_items, orders, etc.)
- Configure `.env.local` with Supabase keys
- Create Supabase client helper

### Step 3: Food Image Generation
- Use AI image generation for ~47 missing food items
- Organize into category folders
- Optimize images (WebP, proper sizes)
- Upload to Supabase Storage or public/images/

### Step 4: Data Population
- Seed categories table with 13 categories
- Seed menu_items table with all items + prices + image paths
- Create menu-data.ts config file with fallback data

### Step 5: Core Layout
- Build Navbar (responsive, sticky, mobile menu)
- Build Footer (links, social, copyright)
- Setup root layout.tsx with fonts + metadata

### Step 6: Home Page
- Hero section with gradient background + CTA
- Featured menu items carousel/grid
- About preview section
- Testimonials section
- Google Maps preview

### Step 7: Menu Page
- Category filter tabs
- Responsive menu grid
- MenuCard component (image, name, price, add-to-order)
- Search/filter functionality

### Step 8: About Page
- Restaurant story section
- Image gallery
- Team/chef section

### Step 9: Location Page
- Google Maps embed (full width)
- Address + directions
- Opening hours

### Step 10: Contact Page
- Contact form (validated)
- Phone/WhatsApp links
- Social media links

### Step 11: Order System
- Cart state management (React Context/Zustand)
- Order summary page
- Payment method selection
- Supabase order insertion
- Order confirmation

### Step 12: Polish & Testing
- Responsive testing (mobile, tablet, desktop)
- Performance optimization (Lighthouse)
- SEO meta tags + Open Graph
- Error handling + loading states

---

## 10. Future: Phase 2 — Live CMS

After the website is complete, build an admin dashboard:
- Admin login (Supabase Auth)
- Menu CRUD (add/edit/delete items)
- Order management (view/update status)
- Contact message management
- Review moderation
- Sales analytics

---

## 11. Estimated Timeline

| Step | Task | Est. Time |
|------|------|-----------|
| 1 | Project init + setup | 30 min |
| 2 | Supabase setup | 30 min |
| 3 | AI image generation | 1-2 hours |
| 4 | Data seeding | 30 min |
| 5 | Core layout (nav + footer) | 45 min |
| 6 | Home page | 1 hour |
| 7 | Menu page | 1.5 hours |
| 8 | About page | 30 min |
| 9 | Location page | 20 min |
| 10 | Contact page | 30 min |
| 11 | Order system | 1.5 hours |
| 12 | Polish + testing | 1 hour |
| **Total** | | **~9-10 hours** |

---

## 12. Notes

- **Prices**: Placeholder prices will be used initially — owner can update via Supabase
- **Payment**: Stripe for card payments + JazzCash/EasyPaisa integration (Pakistan-local)
- **Google Maps**: Requires API key (free tier available)
- **WhatsApp Order Button**: Floating button linking to WhatsApp with pre-filled message
- **SEO**: Next.js metadata API for proper meta tags per page
- **Images**: Existing 10 PNG files will be used; ~47 AI-generated images for missing items
