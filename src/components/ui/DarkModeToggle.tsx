"use client";

import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function DarkModeToggle({
  isDark,
  onToggle,
}: DarkModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle dark mode"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-gray-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
