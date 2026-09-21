"use client";

import { useState, useEffect } from "react";
import { Review } from "@/types";
import ReviewList from "@/components/reviews/ReviewList";
import Skeleton from "@/components/ui/Skeleton";
import { motion } from "motion/react";
import { fadeInUp, viewportConfig } from "@/lib/animations";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
          <p className="text-gray-600 dark:text-gray-400">
            See what our customers have to say
          </p>
        </motion.div>
        <motion.div
          className="max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Skeleton key={j} className="w-3.5 h-3.5" rounded="full" />
                      ))}
                    </div>
                  </div>
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <ReviewList reviews={reviews} />
          )}
        </motion.div>
      </div>
    </section>
  );
}
