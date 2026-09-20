"use client";

import InfoBar from "@/components/layout/InfoBar";
import MainNav from "@/components/layout/MainNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <InfoBar phone="923013631555" hours="5:30 PM - 2:00 AM" />
      <MainNav
        navLinks={navLinks}
      />
    </nav>
  );
}
