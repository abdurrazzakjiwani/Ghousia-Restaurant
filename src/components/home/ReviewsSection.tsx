"use client";

import { useState, useEffect } from "react";
import { Review } from "@/types";
import ReviewList from "@/components/reviews/ReviewList";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => {});
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
          <p className="text-gray-600 dark:text-gray-400">
            See what our customers have to say
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </section>
  );
}
