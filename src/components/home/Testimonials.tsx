"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Khan",
    rating: 5,
    comment: "Best karahi in Federal B Area! The chicken karahi is always perfectly spiced and fresh.",
  },
  {
    name: "Fatima Malik",
    rating: 5,
    comment: "Love the BBQ platter! The seekh kebabs are melt-in-your-mouth delicious. Highly recommended.",
  },
  {
    name: "Usman Ali",
    rating: 4,
    comment: "Great zinger burgers and fast delivery. The staff is very friendly and professional.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${
                      j < t.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                &ldquo;{t.comment}&rdquo;
              </p>
              <p className="font-semibold text-sm">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
