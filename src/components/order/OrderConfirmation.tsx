"use client";

import { motion } from "motion/react";
import { generateFullOrderMessage } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

interface OrderConfirmationProps {
  customerName: string;
  customerPhone: string;
  orderMode: string;
  branch: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  notes: string | null;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export default function OrderConfirmation({
  customerName,
  customerPhone,
  orderMode,
  branch,
  address,
  latitude,
  longitude,
  items,
  totalAmount,
  notes,
  onConfirm,
  isSubmitting,
}: OrderConfirmationProps) {
  const whatsappUrl = `https://wa.me/923013631555?text=${encodeURIComponent(
    generateFullOrderMessage({
      customer_name: customerName,
      phone: customerPhone,
      order_mode: orderMode as "delivery" | "pickup" | "dine-in",
      branch: branch || undefined,
      address: address || undefined,
      latitude: latitude || undefined,
      longitude: longitude || undefined,
      items,
      total_amount: totalAmount,
      notes: notes || undefined,
    })
  )}`;

  const modeLabels: Record<string, string> = {
    delivery: "Delivery",
    pickup: "Pickup",
    "dine-in": "Dine-in",
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Order Summary</h3>

      <div className="card p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Mode</span>
          <span className="font-semibold">{modeLabels[orderMode]}</span>
        </div>
        {branch && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Branch</span>
            <span className="font-semibold">{branch}</span>
          </div>
        )}
        {orderMode === "delivery" && address && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Address</span>
            <span className="font-semibold text-right max-w-[60%]">{address}</span>
          </div>
        )}
        {orderMode === "delivery" && latitude && longitude && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Location</span>
            <a
              href={`https://maps.google.com/?q=${latitude},${longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gradient-start hover:text-gradient-end font-semibold text-xs"
            >
              View on Map →
            </a>
          </div>
        )}
      </div>

      <div className="card p-4">
        <h4 className="font-semibold text-sm mb-2">Items</h4>
        <div className="space-y-1">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span className="bg-linear-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            {formatPrice(totalAmount)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Confirm & Open WhatsApp
        </a>
        <button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="w-full btn-secondary text-center"
        >
          {isSubmitting ? "Saving..." : "Save Order to System"}
        </button>
      </div>
    </div>
  );
}
