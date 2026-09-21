"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface OrderDetailsFormProps {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  address: string;
  setAddress: (address: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  isDelivery: boolean;
  errors: Record<string, string>;
}

export default function OrderDetailsForm({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  address,
  setAddress,
  notes,
  setNotes,
  isDelivery,
  errors,
}: OrderDetailsFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Your Details</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gradient-start",
            errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-700"
          )}
          placeholder="Ahmed Khan"
        />
        {errors.name && (
          <motion.p initial={{ opacity: 0 }} className="text-red-500 text-xs mt-1">
            {errors.name}
          </motion.p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone *</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gradient-start",
            errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-700"
          )}
          placeholder="0301-3631555"
        />
        {errors.phone && (
          <motion.p initial={{ opacity: 0 }} className="text-red-500 text-xs mt-1">
            {errors.phone}
          </motion.p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email (optional)</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gradient-start"
          placeholder="ahmed@example.com"
        />
      </div>

      {isDelivery && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }}>
          <div>
            <label className="block text-sm font-medium mb-1">Delivery Address *</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className={cn(
                "w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gradient-start resize-none",
                errors.address ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              )}
              placeholder="Block 3, Federal B Area, Hussainabad..."
            />
            {errors.address && (
              <motion.p initial={{ opacity: 0 }} className="text-red-500 text-xs mt-1">
                {errors.address}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Special Instructions (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gradient-start resize-none"
          placeholder="Extra spicy, no onions, etc."
        />
      </div>
    </div>
  );
}
