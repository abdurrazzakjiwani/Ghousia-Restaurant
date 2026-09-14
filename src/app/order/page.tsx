"use client";

import { useCart } from "@/hooks/useCart";
import { generateWhatsAppUrl, generateOrderMessage, formatPrice } from "@/lib/utils";
import OrderSummary from "@/components/order/OrderSummary";
import { MessageCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function OrderPage() {
  const { items, total, updateQuantity, removeItem, itemCount } = useCart();
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923013631555";

  const whatsappUrl = generateWhatsAppUrl(
    phone,
    generateOrderMessage(
      items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      total
    )
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Order</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review your cart and place your order via WhatsApp
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add items from our menu to get started</p>
          <Link href="/menu" className="btn-primary inline-flex items-center gap-2">
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          <OrderSummary
            items={items}
            total={total}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />

          <div className="mt-8 space-y-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Order {itemCount} items via WhatsApp
            </a>
            <p className="text-center text-sm text-gray-500">
              Total: {formatPrice(total)} • Payment: Cash on Delivery
            </p>
          </div>
        </>
      )}
    </div>
  );
}
