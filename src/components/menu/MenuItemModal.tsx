"use client";

import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import { ShoppingCart, ArrowRight, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";

interface MenuItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onContinueOrder: (item: MenuItem, quantity: number) => void;
}

export default function MenuItemModal({
  item,
  isOpen,
  onClose,
  onAddToCart,
  onContinueOrder,
}: MenuItemModalProps) {
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setImgError(false);
    }
  }, [isOpen, item]);

  if (!item) return null;

  const showImage = item.image_url && !imgError;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative">
          {showImage ? (
            <Image
              src={item.image_url!}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, 500px"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center h-full">
              <span className="text-5xl mb-3">🍽️</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.name}
              </span>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold">{item.name}</h2>
          <p className="text-lg font-bold bg-linear-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent mt-1">
            {formatPrice(item.price)}
          </p>
        </div>

        {item.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-center gap-4 py-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="w-11 h-11 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-lg font-bold w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            disabled={quantity >= 20}
            className="w-11 h-11 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              onAddToCart(item, quantity);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-gradient-start to-gradient-end text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart ({quantity})
          </button>
          <button
            onClick={() => {
              onContinueOrder(item, quantity);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Continue Order
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
