"use client";

import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import { motion } from "motion/react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function Footer() {
  const phone1 = process.env.NEXT_PUBLIC_RESTAURANT_PHONE1 || "0321-8221010";
  const phone2 = process.env.NEXT_PUBLIC_RESTAURANT_PHONE2 || "0301-3631555";
  const address = process.env.NEXT_PUBLIC_RESTAURANT_ADDRESS || "Block 3, Federal B Area, Hussainabad, Gulberg Town, Karachi";
  const hours = process.env.NEXT_PUBLIC_RESTAURANT_HOURS || "5:30 PM - 2:00 AM";

  return (
    <footer className="bg-gray-900 text-gray-300">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="visible"
        variants={staggerContainer}
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerContainer}>
          <motion.div variants={staggerItem}>
            <h3 className="text-lg font-bold text-white mb-4">
              Ghousia Golden Spoon
            </h3>
            <p className="text-sm leading-relaxed dark:text-gray-400">
              Authentic Pakistani cuisine with a modern touch. Serving Karachi&apos;s finest food since establishment.
            </p>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/menu" className="block text-sm hover:text-white transition-colors">
                Our Menu
              </Link>
              <Link href="/about" className="block text-sm hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/reservation" className="block text-sm hover:text-white transition-colors">
                Reserve Table
              </Link>
              <Link href="/contact" className="block text-sm hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
              <div className="flex flex-wrap items-center gap-y-1 text-sm">
                  <a href={`tel:${phone1}`} className="hover:text-white dark:text-gray-400">{phone1}</a>
                  <span className="mx-1">|</span>
                  <a href={`tel:${phone2}`} className="hover:text-white dark:text-gray-400">{phone2}</a>
                </div>
              </div>
<div className="flex items-start gap-2 text-sm dark:text-gray-400">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm dark:text-gray-400">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{hours} (Daily)</span>
                </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm">
          <p className="text-sm dark:text-gray-400">&copy; {new Date().getFullYear()} Ghousia Golden Spoon. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
}
