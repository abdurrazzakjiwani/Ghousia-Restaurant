"use client";

import { Check } from "lucide-react";

const statuses = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

interface OrderTrackerProps {
  currentStatus: string;
}

export default function OrderTracker({ currentStatus }: OrderTrackerProps) {
  const currentIndex = statuses.findIndex((s) => s.key === currentStatus);

  return (
    <div className="flex items-center w-full">
      {statuses.map((status, index) => (
        <div key={status.key} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                index <= currentIndex
                  ? "bg-gradient-to-r from-gradient-start to-gradient-end text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-500"
              }`}
            >
              {index <= currentIndex ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span className="text-xs mt-1 text-center whitespace-nowrap">{status.label}</span>
          </div>
          {index < statuses.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 rounded ${
                index < currentIndex
                  ? "bg-gradient-to-r from-gradient-start to-gradient-end"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
