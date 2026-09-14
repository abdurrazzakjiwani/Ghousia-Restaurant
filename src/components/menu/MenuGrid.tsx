import { MenuItem } from "@/types";
import MenuCard from "./MenuCard";

interface MenuGridProps {
  items: MenuItem[];
  onAdd: (item: MenuItem) => void;
  cartItems: Record<string, number>;
  onUpdateQuantity: (itemId: string, qty: number) => void;
}

export default function MenuGrid({
  items,
  onAdd,
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          onAdd={() => onAdd(item)}
          cartQuantity={cartItems[item.id] || 0}
          onUpdateQuantity={(qty) => onUpdateQuantity(item.id, qty)}
        />
      ))}
    </div>
  );
}
