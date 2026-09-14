"use client";

import { Sun, Moon } from "lucide-react";

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
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}
