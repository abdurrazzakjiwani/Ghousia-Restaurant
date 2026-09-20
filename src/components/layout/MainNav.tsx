"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import CartBadge from "@/components/layout/CartBadge";
import SearchInput from "@/components/layout/SearchInput";
import CategoryDropdown from "@/components/layout/CategoryDropdown";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { cn } from "@/lib/utils";
import { useState, useCallback, useEffect } from "react";
import { categories } from "@/lib/menu-data";

interface NavItem {
  href: string;
  label: string;
}

interface MainNavProps {
  navLinks: NavItem[];
}

export default function MainNav({
  navLinks,
}: MainNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCategorySelect = useCallback(
    (slug: string) => {
      router.push(`/menu?category=${slug}`);
    },
    [router]
  );

  const handleSearchNavigate = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            Ghousia Golden Spoon
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none",
              pathname === "/"
                ? "bg-amber-50 text-amber-600"
                : "hover:bg-gray-100 text-gray-700"
            )}
          >
            Home
          </Link>
          <CategoryDropdown
            categories={categories}
            onSelect={handleCategorySelect}
          />
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none",
                pathname === link.href
                  ? "bg-amber-50 text-amber-600"
                  : "hover:bg-gray-100 text-gray-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <SearchInput onNavigate={handleSearchNavigate} />
          {mounted && <CartBadge />}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <a
            href="tel:923013631555"
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
            aria-label="Call restaurant"
          >
            <Phone className="w-5 h-5 text-gray-700" />
          </a>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
          >
            {drawerOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </div>

    <MobileDrawer
      isOpen={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      navLinks={navLinks}
    />
    </>
  );
}
