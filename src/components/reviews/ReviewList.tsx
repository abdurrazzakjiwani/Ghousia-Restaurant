"use client";

import { Review } from "@/types";
import { Star } from "lucide-react";

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-center py-8 text-gray-500">No reviews yet. Be the first to review!</p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="card p-5">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm">{review.customer_name}</h4>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          {review.comment && (
            <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
