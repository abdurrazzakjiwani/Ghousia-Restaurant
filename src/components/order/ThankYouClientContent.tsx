"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock, Truck, ArrowRight, Loader2 } from "lucide-react";
import { CustomerOrder } from "@/types";

export default function ThankYouClientContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderNumber) {
      setError("No order number provided");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `/api/orders?order_number=${encodeURIComponent(orderNumber)}`
        );
        if (!response.ok) {
          throw new Error("Order not found");
        }
        const data = await response.json();
        setOrder(data.orders?.[0] || null);
      } catch {
        setError("Could not load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-amber-500 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (error || !orderNumber) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500">{error || "No order number provided"}</p>
          <Link href="/menu" className="btn-primary inline-block">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your order has been placed successfully
        </p>
      </div>

      <div className="card p-6 text-left space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400">Order Number</span>
            <span className="text-lg font-bold text-orange-600">
              {orderNumber}
            </span>
        </div>

        {order && (
          <>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="space-y-2">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between items-center">
              <span className="font-bold">Total</span>
              <span className="text-xl font-bold text-orange-600">
                Rs. {order.total_amount?.toLocaleString()}
              </span>
            </div>
          </>
        )}

        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Estimated preparation time: <strong>30 minutes</strong>
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Link
          href={`/tracking?order=${orderNumber}`}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-gradient-start to-gradient-end text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <Truck className="w-5 h-5" />
          Track Your Order
        </Link>
        <Link
          href="/menu"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
