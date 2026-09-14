"use client";

import { categories } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selected: string;
  onSelect: (slug: string) => void;
}

export default function CategoryFilter({
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
      <button
        onClick={() => onSelect("all")}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
          selected === "all"
            ? "bg-gradient-to-r from-gradient-start to-gradient-end text-white"
            : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            selected === cat.slug
              ? "bg-gradient-to-r from-gradient-start to-gradient-end text-white"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}
