"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import { useTheme } from "@/hooks/useTheme";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
  { href: "/reservation", label: "Reserve" },
  { href: "/tracking", label: "Track Order" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggle, mounted } = useTheme();

  return (
    <nav className="sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
              Ghousia Golden Spoon
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {mounted && (
              <DarkModeToggle isDark={isDark} onToggle={toggle} />
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {link.label}
              </Link>
            ))}
            {mounted && (
              <div className="pt-2">
                <DarkModeToggle isDark={isDark} onToggle={toggle} />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
