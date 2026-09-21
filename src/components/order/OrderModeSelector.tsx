"use client";

import { motion } from "motion/react";
import { Truck, Store, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

const modes = [
  {
    value: "delivery",
    label: "Delivery",
    icon: Truck,
    description: "Get it delivered to your door",
  },
  {
    value: "pickup",
    label: "Pickup",
    icon: Store,
    description: "Grab & go from your nearest branch",
  },
  {
    value: "dine-in",
    label: "Dine-in",
    icon: Utensils,
    description: "Enjoy your meal at our restaurant",
  },
];

interface OrderModeSelectorProps {
  selected: string;
  onSelect: (mode: string) => void;
}

export default function OrderModeSelector({ selected, onSelect }: OrderModeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold mb-2">Select Order Mode</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selected === mode.value;
          return (
            <motion.button
              key={mode.value}
              onClick={() => onSelect(mode.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative flex flex-col items-center p-4 rounded-xl border-2 text-center transition-all",
                isSelected
                  ? "border-gradient-start"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              )}
            >
              <Icon className="w-8 h-8 mb-2" />
              <span className="font-semibold text-sm">{mode.label}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {mode.description}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
