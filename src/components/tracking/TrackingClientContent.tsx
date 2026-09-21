"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import OrderTracker from "@/components/tracking/OrderTracker";
import { CustomerOrder } from "@/types";
import { Search, Loader2 } from "lucide-react";

export default function TrackingClientContent() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get("order");

  const [searchType, setSearchType] = useState<"order_number" | "phone">(
    initialOrder ? "order_number" : "phone"
  );
  const [orderNumber, setOrderNumber] = useState(initialOrder || "");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "found" | "not-found"
  >(initialOrder ? "loading" : "idle");

  const fetchOrder = useCallback(async () => {
    if (!orderNumber && !phone) return;

    try {
      let url: string;
      if (searchType === "order_number" && orderNumber) {
        url = `/api/orders?order_number=${encodeURIComponent(orderNumber)}`;
      } else if (searchType === "phone" && phone) {
        url = `/api/orders?phone=${encodeURIComponent(phone)}`;
      } else {
        return;
      }

      const res = await fetch(url);
      if (!res.ok) {
        setStatus("not-found");
        setOrder(null);
        return;
      }
      const data = await res.json();
      if (data.orders?.length > 0) {
        setOrder(data.orders[0]);
        setStatus("found");
      } else {
        setStatus("not-found");
        setOrder(null);
      }
    } catch {
      setStatus("not-found");
      setOrder(null);
    }
  }, [orderNumber, phone, searchType]);

  useEffect(() => {
    if (initialOrder) {
      fetchOrder();
    }
  }, [initialOrder, fetchOrder]);

  useEffect(() => {
    if (status !== "found") return;

    const interval = setInterval(() => {
      fetchOrder();
    }, 30000);

    return () => clearInterval(interval);
  }, [status, fetchOrder]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setOrder(null);
    await fetchOrder();
  };

  return (
    <>
      <form onSubmit={handleSearch} className="card p-6 mb-8 space-y-4">
        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={() => setSearchType("order_number")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === "order_number"
                ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Order Number
          </button>
          <button
            type="button"
            onClick={() => setSearchType("phone")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchType === "phone"
                ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            Phone Number
          </button>
        </div>

        <div className="flex gap-3">
          {searchType === "order_number" ? (
            <input
              type="text"
              required
              placeholder="GGS-YYYYMMDD-XXXX"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm"
            />
          ) : (
            <input
              type="tel"
              required
              placeholder="03XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm"
            />
          )}
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {status === "loading" ? "Searching..." : "Track"}
          </Button>
        </div>
      </form>

      {status === "found" && order && (
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              Order #{order.order_number || order.id.slice(0, 8)}
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Auto-refreshes every 30s
            </span>
          </div>
          <OrderTracker currentStatus={order.order_status} />
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
            <p className="text-sm text-gray-500">
              Status:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                {order.order_status?.replace(/_/g, " ")}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Total:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Rs. {order.total_amount?.toLocaleString()}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Mode:{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                {order.order_mode}
              </span>
            </p>
          </div>
        </div>
      )}

      {status === "not-found" && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium mb-2">Order not found</p>
          <p className="text-sm">
            Please check your{" "}
            {searchType === "order_number" ? "order number" : "phone number"}{" "}
            and try again.
          </p>
        </div>
      )}

      {status === "idle" && (
        <div className="text-center py-8 text-gray-400">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Enter your order number or phone number to track your order</p>
        </div>
      )}
    </>
  );
}
