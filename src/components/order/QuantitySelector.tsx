"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { motion } from "motion/react";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Minus className="w-4 h-4" />
      </motion.button>
      <span className="w-12 text-center text-lg font-semibold">
        {quantity}
      </span>
      <motion.button
        onClick={() => setQuantity((q) => Math.min(99, q + 1))}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full bg-linear-to-r from-gradient-start to-gradient-end text-white flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <Plus className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
