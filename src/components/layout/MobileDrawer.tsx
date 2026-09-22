"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

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
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleTab(e: KeyboardEvent) {
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, a, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleTab);
      setTimeout(() => {
        const first = drawerRef.current?.querySelector<HTMLElement>(
          'button, a, [tabindex]:not([tabindex="-1"])'
        );
        first?.focus();
      }, 50);
    }
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
      />
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 w-72 bg-gray-900 dark:bg-gray-900 z-50 shadow-xl translate-x-0 transition-transform duration-300"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700 dark:border-gray-800">
          <span className="text-lg font-bold text-white dark:text-gray-100">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none min-w-[44px] min-h-[44px]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-200 dark:text-gray-200" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          <Link
            href="/menu"
            onClick={onClose}
            className={cn(
              "block px-4 py-3 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none",
              pathname === "/menu"
                ? "bg-amber-900/30 text-amber-400"
                : "hover:bg-gray-800 text-gray-200"
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
                  ? "bg-amber-900/30 text-amber-400"
                  : "hover:bg-gray-800 text-gray-200"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700 dark:border-gray-800 space-y-3">
          <a
            href="tel:923013631555"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 text-gray-200 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
            aria-label="Call restaurant"
          >
            <Phone className="w-5 h-5" />
            <span>Call Restaurant</span>
          </a>
        </div>
      </div>
    </div>
  );
}
