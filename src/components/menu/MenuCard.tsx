"use client";

import { useState } from "react";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

interface MenuCardProps {
  item: MenuItem;
  onAdd: () => void;
  onViewDetail: () => void;
  cartQuantity?: number;
  onUpdateQuantity?: (qty: number) => void;
}

export default function MenuCard({
  item,
  onAdd,
  onViewDetail,
  cartQuantity = 0,
  onUpdateQuantity,
}: MenuCardProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = item.image_url && !imgError;

  return (
    <motion.div
      className="card overflow-hidden"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div onClick={onViewDetail} className="cursor-pointer">
        <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden relative">
          {showImage ? (
            <Image
              src={item.image_url!}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              loading={item.is_featured ? "eager" : "lazy"}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <span className="text-3xl mb-2">🍽️</span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{item.name}</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-sm">{item.name}</h3>
          <span className="text-sm font-bold bg-linear-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Click for details</span>
          {cartQuantity > 0 && onUpdateQuantity ? (
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => onUpdateQuantity(cartQuantity - 1)}
                className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold w-6 text-center">
                {cartQuantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(cartQuantity + 1)}
                className="w-11 h-11 rounded-full bg-linear-to-r from-gradient-start to-gradient-end text-white flex items-center justify-center hover:opacity-90"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onAdd(); }}
              className="flex items-center gap-1 px-4 py-2.5 text-sm font-semibold rounded-full bg-linear-to-r from-gradient-start to-gradient-end text-white hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
