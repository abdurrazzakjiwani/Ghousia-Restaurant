"use client";

import { useState, FormEvent } from "react";
import { Star } from "lucide-react";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";

function AnimatedCheckmark() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke="#22c55e" strokeWidth="3" fill="none" />
      <path
        d="M14 24 L21 31 L34 18"
        stroke="#22c55e"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-draw-checkmark"
      />
    </svg>
  );
}

export default function ReviewForm() {
  const [form, setForm] = useState({ customer_name: "", rating: 5, comment: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ customer_name: "", rating: 5, comment: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Your Name *</label>
        <input
          type="text"
          required
          value={form.customer_name}
          onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Rating *</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setForm({ ...form, rating: star })}
              className="p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star
                className={`w-6 h-6 ${
                  star <= (hoverRating || form.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Comment</label>
        <textarea
          rows={3}
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          placeholder="Tell us about your experience..."
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm resize-none"
        />
      </div>
      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 text-green-600"
          >
            <AnimatedCheckmark />
            <span className="text-sm font-medium">Thank you! Your review is pending approval.</span>
          </motion.div>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-red-600 text-sm animate-shake"
          >
            Failed to submit. Please try again.
          </motion.p>
        )}
      </AnimatePresence>
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Submitting...
          </span>
        ) : (
          "Submit Review"
        )}
      </Button>
    </form>
  );
}
