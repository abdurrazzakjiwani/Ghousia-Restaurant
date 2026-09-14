"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { menuItems, getItemsByCategory, searchItems } from "@/lib/menu-data";
import { useCart } from "@/hooks/useCart";
import CategoryFilter from "@/components/menu/CategoryFilter";
import MenuGrid from "@/components/menu/MenuGrid";
import Link from "next/link";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem, items: cartItems, updateQuantity } = useCart();

  const filteredItems = useMemo(() => {
    if (searchQuery) {
      return searchItems(searchQuery);
    }
    if (selectedCategory === "all") {
      return menuItems.filter((item) => item.is_available);
    }
    return getItemsByCategory(selectedCategory);
  }, [selectedCategory, searchQuery]);

  const cartItemMap = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach((item) => {
      map[item.menu_item_id] = item.quantity;
    });
    return map;
  }, [cartItems]);

  const handleAdd = (item: (typeof menuItems)[0]) => {
    addItem({
      menu_item_id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
    });
  };

  const handleUpdateQuantity = (itemId: string, qty: number) => {
    updateQuantity(itemId, qty);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our wide selection of Pakistani and Chinese dishes
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/order"
            className="btn-primary text-sm whitespace-nowrap"
          >
            View Cart ({cartItems.reduce((s, i) => s + i.quantity, 0)})
          </Link>
        </div>
      </div>

      <CategoryFilter
        selected={selectedCategory}
        onSelect={(slug) => {
          setSelectedCategory(slug);
          setSearchQuery("");
        }}
      />

      <div className="mt-6">
        <MenuGrid
          items={filteredItems}
          onAdd={handleAdd}
          cartItems={cartItemMap}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </div>
    </div>
  );
}
