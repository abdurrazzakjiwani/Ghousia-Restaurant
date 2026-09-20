"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Phone, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavItem {
  href: string;
  label: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavItem[];
}

export default function MobileDrawer({
  isOpen,
  onClose,
  navLinks,
}: MobileDrawerProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-white md:hidden shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              <Link
                href="/menu"
                onClick={onClose}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none",
                  pathname === "/menu"
                    ? "bg-amber-50 text-amber-600"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                Menu
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none",
                    pathname === link.href
                      ? "bg-amber-50 text-amber-600"
                      : "hover:bg-gray-100 text-gray-700"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-200 space-y-3">
              <a
                href="tel:923013631555"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 text-gray-700 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                aria-label="Call restaurant"
              >
                <Phone className="w-5 h-5" />
                <span>Call Restaurant</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}