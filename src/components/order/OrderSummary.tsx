"use client";

import { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (menuItemId: string, qty: number) => void;
  onRemove: (menuItemId: string) => void;
}

export default function OrderSummary({
  items,
  total,
  onUpdateQuantity,
  onRemove,
}: OrderSummaryProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>Your cart is empty</p>
        <p className="text-sm mt-1">
          Add items from the menu to place an order
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item.menu_item_id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, padding: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap items-center gap-3 p-4 card"
          >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl">🍽️</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">{item.name}</h4>
            <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.menu_item_id, item.quantity - 1)}
              className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold w-6 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.menu_item_id, item.quantity + 1)}
              className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="font-semibold text-sm w-20 text-right">
            {formatPrice(item.price * item.quantity)}
          </p>
          <button
            onClick={() => onRemove(item.menu_item_id)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between items-center">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-xl font-bold bg-linear-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
