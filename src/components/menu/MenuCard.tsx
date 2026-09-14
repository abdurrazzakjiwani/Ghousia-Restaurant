"use client";

import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  onAdd: () => void;
  cartQuantity?: number;
  onUpdateQuantity?: (qty: number) => void;
}

export default function MenuCard({
  item,
  onAdd,
  cartQuantity = 0,
  onUpdateQuantity,
}: MenuCardProps) {
  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-5xl">🍽️</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-sm">{item.name}</h3>
          <span className="text-sm font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex justify-end">
          {cartQuantity > 0 && onUpdateQuantity ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(cartQuantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-semibold w-6 text-center">
                {cartQuantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(cartQuantity + 1)}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end text-white flex items-center justify-center hover:opacity-90"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={onAdd}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-gradient-start to-gradient-end text-white hover:opacity-90 transition-opacity"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
