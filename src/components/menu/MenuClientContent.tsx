"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { menuItems, getItemsByCategory, searchItems } from "@/lib/menu-data";
import { useCart } from "@/hooks/useCart";
import { useSearchParams, useRouter } from "next/navigation";
import CategoryFilter from "@/components/menu/CategoryFilter";
import MenuGrid from "@/components/menu/MenuGrid";
import MenuItemModal from "@/components/menu/MenuItemModal";
import { MenuItem } from "@/types";
import Link from "next/link";

export default function MenuClientContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const highlightId = searchParams.get("highlight");
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
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

  const handleViewDetail = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleAddToCart = (item: MenuItem, quantity: number = 1) => {
    addItem(
      {
        menu_item_id: item.id,
        name: item.name,
        price: item.price,
        image_url: item.image_url,
      },
      quantity
    );
  };

  const handleContinueOrder = (item: MenuItem, quantity: number = 1) => {
    addItem(
      {
        menu_item_id: item.id,
        name: item.name,
        price: item.price,
        image_url: item.image_url,
      },
      quantity
    );
    setSelectedItem(null);
    window.location.href = "/order";
  };

  const scrollToHighlight = useCallback(() => {
    if (!highlightId) return;
    setTimeout(() => {
      const el = document.getElementById(`menu-item-${highlightId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-amber-500", "ring-offset-2");
        setTimeout(() => {
          el.classList.remove("ring-2", "ring-amber-500", "ring-offset-2");
        }, 3000);
      }
    }, 300);
  }, [highlightId]);

  useEffect(() => {
    scrollToHighlight();
  }, [scrollToHighlight]);

  const handleCategorySelect = useCallback((slug: string) => {
    setSelectedCategory(slug);
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`/menu?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setSearchQuery("");
    } else {
      setSelectedCategory("all");
    }
  }, [categoryParam]);

  return (
    <>
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
        onSelect={handleCategorySelect}
      />

      <div className="mt-6">
        {filteredItems.length === 0 && selectedCategory !== "all" && !searchQuery ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-lg">No items available in this category</p>
            <p className="text-sm">Try selecting a different category or view all items</p>
          </div>
        ) : (
          <MenuGrid
            items={filteredItems}
            onAdd={handleAdd}
            onViewDetail={handleViewDetail}
            cartItems={cartItemMap}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
      </div>

      <MenuItemModal
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
        onContinueOrder={handleContinueOrder}
      />
    </>
  );
}
