"use client";

import Link from "next/link";
import { Phone, Clock, Truck } from "lucide-react";

interface InfoBarProps {
  phone: string;
  hours: string;
}

export default function InfoBar({ phone, hours }: InfoBarProps) {
  const formattedPhone = phone.startsWith("92")
    ? `0${phone.slice(2)}`
    : phone;

  return (
    <div className="flex lg:flex items-center justify-between px-4 sm:px-6 lg:px-8 py-1.5 text-xs border-b border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/60 text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded"
            aria-label="Call restaurant"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{formattedPhone}</span>
          </a>
          <div className="hidden md:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{hours}</span>
          </div>
        </div>
        <Link
          href="/tracking"
          className="flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded"
          aria-label="Track your order"
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Track Order</span>
        </Link>
      </div>
    </div>
  );
}
