import { sendEmail } from "./resend";
import { renderRestaurantAlert } from "@/emails/RestaurantAlert";
import { renderOrderConfirmation } from "@/emails/OrderConfirmation";

interface RestaurantAlertData {
  orderNumber: string;
  customerName: string;
  phone: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  address: string | null;
  orderMode: string;
}

interface CustomerConfirmationData {
  orderNumber: string;
  customerEmail: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
}

export async function sendRestaurantAlert(data: RestaurantAlertData) {
  const html = renderRestaurantAlert(data);

  return sendEmail({
    to: process.env.RESTAURANT_EMAIL || "abdurrazzakjiwani.work@gmail.com",
    subject: `🍽️ New Order #${data.orderNumber} - Rs. ${data.totalAmount.toLocaleString()}`,
    html,
  });
}

export async function sendCustomerConfirmation(data: CustomerConfirmationData) {
  const html = renderOrderConfirmation({
    orderNumber: data.orderNumber,
    items: data.items,
    totalAmount: data.totalAmount,
  });

  return sendEmail({
    to: data.customerEmail,
    subject: `✅ Order Confirmed #${data.orderNumber} - Ghousia Golden Spoon`,
    html,
  });
}
