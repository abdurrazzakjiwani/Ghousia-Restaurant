"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import OrderTracker from "@/components/tracking/OrderTracker";

export default function TrackingPage() {
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "not-found">("idle");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders?phone=${encodeURIComponent(phone)}`);
      if (!res.ok) {
        setStatus("not-found");
        return;
      }
      const data = await res.json();
      if (data.orders?.length > 0) {
        setOrder(data.orders[0]);
        setStatus("found");
      } else {
        setStatus("not-found");
      }
    } catch {
      setStatus("not-found");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your phone number to check your order status
        </p>
      </div>

      <form onSubmit={handleSearch} className="card p-6 mb-8">
        <div className="flex gap-3">
          <input
            type="tel"
            required
            placeholder="03XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Searching..." : "Track"}
          </Button>
        </div>
      </form>

      {status === "found" && order && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Order #{order.id.slice(0, 8)}</h2>
          <OrderTracker currentStatus={order.order_status} />
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500">Status: <span className="font-medium text-gray-900 dark:text-gray-100">{order.order_status}</span></p>
            <p className="text-sm text-gray-500">Total: <span className="font-medium text-gray-900 dark:text-gray-100">Rs. {order.total_amount}</span></p>
          </div>
        </div>
      )}

      {status === "not-found" && (
        <div className="text-center py-8 text-gray-500">
          <p>No orders found for this phone number.</p>
        </div>
      )}
    </div>
  );
}
