"use client";

import { categories } from "@/lib/menu-data";
import { motion } from "motion/react";
import { fadeIn, viewportConfig } from "@/lib/animations";

interface CategoryFilterProps {
  selected: string;
  onSelect: (slug: string) => void;
}

export default function CategoryFilter({
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <motion.div
      className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeIn}
    >
      <button
        onClick={() => onSelect("all")}
        className="relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
      >
        {selected === "all" && (
          <motion.div
            layoutId="category-pill"
            className="absolute inset-0 bg-linear-to-r from-gradient-start to-gradient-end text-white rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
        <span className="relative z-10" style={{ color: selected === "all" ? "white" : undefined }}>
          All
        </span>
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          className="relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
        >
          {selected === cat.slug && (
            <motion.div
              layoutId="category-pill"
              className="absolute inset-0 bg-linear-to-r from-gradient-start to-gradient-end rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
          <span className="relative z-10" style={{ color: selected === cat.slug ? "white" : undefined }}>
            {cat.icon} {cat.name}
          </span>
        </button>
      ))}
    </motion.div>
  );
}
