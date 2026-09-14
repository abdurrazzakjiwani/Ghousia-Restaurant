"use client";

import { useState, FormEvent } from "react";
import { Star } from "lucide-react";
import Button from "@/components/ui/Button";

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
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setForm({ ...form, rating: star })}
              className="p-0.5"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= (hoverRating || form.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
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
      {status === "success" && (
        <p className="text-green-600 text-sm">Thank you! Your review is pending approval.</p>
      )}
      {status === "error" && <p className="text-red-600 text-sm">Failed to submit. Please try again.</p>}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
