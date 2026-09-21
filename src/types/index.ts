export interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  icon: string | null;
  created_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string | null;
  payment_method: string;
  order_status: string;
  total_amount: number;
  notes: string | null;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
}

export interface Reservation {
  id: string;
  customer_name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  notes: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string | null;
  is_approved: boolean;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface CartItem {
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string | null;
}

export interface WhatsAppOrder {
  items: CartItem[];
  total: number;
  customer_name?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface OrderIntentItem {
  menu_item_id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderIntent {
  items: OrderIntentItem[];
  total: number;
  is_valid: boolean;
  unmatched_text: string | null;
}

export interface CustomerOrder {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  customer_email: string | null;
  order_mode: "delivery" | "pickup" | "dine-in";
  branch: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  items: { name: string; quantity: number; price: number }[];
  total_amount: number;
  order_status: string;
  payment_method: string;
  notes: string | null;
  created_at: string;
}
