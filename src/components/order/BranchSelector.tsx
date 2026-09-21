"use client";

import { motion } from "motion/react";
import { branches } from "@/lib/branches-data";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface BranchSelectorProps {
  selected: string;
  onSelect: (branchName: string) => void;
}

export default function BranchSelector({ selected, onSelect }: BranchSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold mb-2">Select a Branch</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {branches.map((branch) => {
          const isSelected = selected === branch.name;
          return (
            <motion.button
              key={branch.name}
              onClick={() => onSelect(branch.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative overflow-hidden rounded-xl border-2 text-left transition-all",
                isSelected
                  ? "border-gradient-start"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
              )}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 bg-linear-to-r from-gradient-start to-gradient-end text-white w-6 h-6 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-800 relative">
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm">{branch.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {branch.address}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
