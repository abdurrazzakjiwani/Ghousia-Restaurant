"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState, useEffect } from "react";

export default function CartBadge() {
  const { itemCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href="/order"
      className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
      aria-label={`Shopping cart, ${mounted ? itemCount : 0} items`}
    >
      <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-amber-500 rounded-full animate-bounce">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
