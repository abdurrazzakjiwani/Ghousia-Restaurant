import { MenuItem } from "@/types";
import MenuCard from "./MenuCard";
import { motion, AnimatePresence } from "motion/react";
import { staggerContainer } from "@/lib/animations";

interface MenuGridProps {
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
  onViewDetail: (item: MenuItem) => void;
  cartItems: Record<string, number>;
  onUpdateQuantity: (itemId: string, qty: number) => void;
}

export default function MenuGrid({
  items,
  onAdd,
  onViewDetail,
  cartItems,
  onUpdateQuantity,
}: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No items found</p>
        <p className="text-sm">Try a different category or search term</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      variants={staggerContainer}
      initial="visible"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <MenuCard
              item={item}
              onAdd={() => onAdd(item)}
              onViewDetail={() => onViewDetail(item)}
              cartQuantity={cartItems[item.id] || 0}
              onUpdateQuantity={(qty) => onUpdateQuantity(item.id, qty)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
