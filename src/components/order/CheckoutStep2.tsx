"use client";

import { CartItem } from "@/types";
import { formatPrice, generateFullOrderUrl } from "@/lib/utils";
import { MessageCircle, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { CheckoutDetails } from "./CheckoutStep1";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CheckoutStep2Props {
  items: CartItem[];
  total: number;
  details: CheckoutDetails;
  onBack: () => void;
}

export default function CheckoutStep2({
  items,
  total,
  details,
  onBack,
}: CheckoutStep2Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const whatsappUrl = generateFullOrderUrl({
    customer_name: details.customer_name,
    phone: details.phone,
    order_mode: details.order_mode,
    address: details.order_mode === "delivery" ? details.address : undefined,
    branch: details.order_mode !== "delivery" ? details.branch : undefined,
    items: items.map((i) => ({
      name: i.name,
      quantity: i.quantity,
      price: i.price,
    })),
    total_amount: total,
    notes: details.notes || undefined,
  });

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: details.customer_name,
          phone: details.phone,
          customer_email: details.email || null,
          order_mode: details.order_mode,
          branch: details.branch || null,
          address: details.address || null,
          items: items.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            price: i.price,
          })),
          total_amount: total,
          notes: details.notes || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Failed to place order");
      }

      const order = await response.json();
      router.push(`/thank-you?order=${order.order_number}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="card p-6 space-y-4">
        <h3 className="text-lg font-bold">Order Summary</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.menu_item_id}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-gray-600 dark:text-gray-400">
                {item.name} x{item.quantity}
              </span>
              <span className="font-semibold">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-3 flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
            <span className="text-xl font-bold text-orange-600">
              {formatPrice(total)}
            </span>
        </div>
      </div>

      <div className="card p-6 space-y-3">
        <h3 className="text-lg font-bold">Customer Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Name</span>
            <p className="font-semibold">{details.customer_name}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Phone</span>
            <p className="font-semibold">{details.phone}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Mode</span>
            <p className="font-semibold capitalize">{details.order_mode}</p>
          </div>
          {details.order_mode === "delivery" && details.address && (
            <div className="col-span-2">
              <span className="text-gray-500 dark:text-gray-400">Address</span>
              <p className="font-semibold">{details.address}</p>
            </div>
          )}
          {details.order_mode !== "delivery" && details.branch && (
            <div>
              <span className="text-gray-500 dark:text-gray-400">Branch</span>
              <p className="font-semibold">{details.branch}</p>
            </div>
          )}
          {details.notes && (
            <div className="col-span-2">
              <span className="text-gray-500 dark:text-gray-400">Notes</span>
              <p className="font-semibold">{details.notes}</p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Placing Order...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Place Order
            </>
          )}
        </button>
      </div>

      {!isSubmitting && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors w-full"
        >
          <MessageCircle className="w-5 h-5" />
          Also Send via WhatsApp
        </a>
      )}
    </motion.div>
  );
}
