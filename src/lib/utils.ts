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
