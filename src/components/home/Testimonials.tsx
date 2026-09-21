"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { testimonials } from "@/lib/testimonials-data";

const avatarColors = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16",
  "#f97316", "#6366f1", "#14b8a6", "#e11d48",
];

function ColoredAvatar({ index, name }: { index: number; name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const color = avatarColors[index % avatarColors.length];

  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      className="shrink-0"
      aria-hidden="true"
    >
      <circle cx="28" cy="28" r="28" fill={color} />
      <text
        x="28"
        y="28"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white font-bold text-lg select-none"
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
        {initials}
      </text>
    </svg>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) setIsPaused(true);
  }, []);

  const testimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Trusted by thousands of happy customers across Karachi
          </p>
        </div>

        <div
          className="max-w-2xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="card p-8 relative min-h-[220px] group">
            <button
              onClick={() => { prev(); setIsPaused(true); setTimeout(() => setIsPaused(false), 4000); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100 md:opacity-0 hover:!opacity-100 focus:opacity-100 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => { next(); setIsPaused(true); setTimeout(() => setIsPaused(false), 4000); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100 md:opacity-0 hover:!opacity-100 focus:opacity-100 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col items-center text-center"
              >
                <ColoredAvatar index={currentIndex} name={testimonial.name} />

                <div className="flex gap-1 mt-4 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${
                        j < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed italic">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>

                <p className="font-semibold text-sm">{testimonial.name}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.slice(0, 20).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-gradient-start w-6"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
