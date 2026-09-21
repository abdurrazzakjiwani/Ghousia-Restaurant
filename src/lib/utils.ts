import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { OrderIntentItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function generateWhatsAppUrl(
  phone: string,
  message: string
): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function generateOrderMessage(
  items: { name: string; quantity: number; price: number }[],
  total: number,
  notes?: string
): string {
  let msg = "Assalam-o-Alaikum! I'd like to place an order:\n\n";
  items.forEach((item) => {
    msg += `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}\n`;
  });
  msg += `\nTotal: ${formatPrice(total)}`;
  if (notes) msg += `\nNote: ${notes}`;
  msg += "\n\nThank you!";
  return msg;
}

const WHATSAPP_PHONE = "923013631555";

export function generateChatOrderMessage(items: OrderIntentItem[]): string {
  let msg = "Assalam-o-Alaikum! I'd like to place an order:\n\n";
  items.forEach((item) => {
    msg += `${item.quantity}x ${item.name} - ${formatPrice(item.subtotal)}\n`;
  });
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  msg += `\nTotal: ${formatPrice(total)}`;
  msg += "\n\nThank you!";
  return msg;
}

export function generateChatOrderUrl(items: OrderIntentItem[]): string {
  const message = generateChatOrderMessage(items);
  return generateWhatsAppUrl(WHATSAPP_PHONE, message);
}

interface FullOrderMessageParams {
  customer_name: string;
  phone: string;
  order_mode: "delivery" | "pickup" | "dine-in";
  branch?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  items: { name: string; quantity: number; price: number }[];
  total_amount: number;
  notes?: string;
}

export function generateFullOrderMessage(order: FullOrderMessageParams): string {
  let msg = "🍽️ NEW ORDER - Ghousia Golden Spoon\n\n";
  msg += `👤 Customer: ${order.customer_name}\n`;
  msg += `📞 Phone: ${order.phone}\n\n`;

  if (order.order_mode === "delivery") {
    msg += "📦 Mode: Delivery\n";
    if (order.address) msg += `📍 Address: ${order.address}\n`;
    if (order.latitude && order.longitude) {
      msg += `🗺️ Map: https://maps.google.com/?q=${order.latitude},${order.longitude}\n`;
    }
  } else if (order.order_mode === "pickup") {
    msg += "📦 Mode: Pickup\n";
    if (order.branch) msg += `🏪 Branch: ${order.branch}\n`;
  } else {
    msg += "📦 Mode: Dine-in\n";
    if (order.branch) msg += `🏪 Branch: ${order.branch}\n`;
  }

  msg += "\n📋 Items:\n";
  order.items.forEach((item, i) => {
    msg += `${i + 1}. ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
  });

  msg += `\n💰 Total: ${formatPrice(order.total_amount)}`;
  if (order.notes) msg += `\n📝 Notes: ${order.notes}`;

  return msg;
}

export function generateFullOrderUrl(order: FullOrderMessageParams): string {
  const message = generateFullOrderMessage(order);
  return generateWhatsAppUrl(WHATSAPP_PHONE, message);
}
