"use client";

import { useState } from "react";
import { Star, Package } from "lucide-react";

type Review = {
  id: number;
  product: string;
  rating: number;
  comment: string;
  date: string;
};

export default function ReviewsPage() {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      product: "iPhone 14 Pro",
      rating: 5,
      comment: "Very good product, loved it!",
      date: "2026-06-18",
    },
    {
      id: 2,
      product: "Samsung Watch",
      rating: 4,
      comment: "Nice quality but battery average.",
      date: "2026-06-10",
    },
  ]);

  return (
    <div className="space-y-6">

      {/* Title */}
      <h1 className="md:text-2xl font-bold">My Reviews</h1>

      {/* Empty state */}
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 mt-10">
          <Package className="w-10 h-10 mb-2" />
          <p>No reviews yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="border rounded-lg p-5 hover:shadow-md transition space-y-2 bg-white dark:bg-zinc-900"
            >
              {/* Product name */}
              <p className="font-semibold text-sm md:text-base">{rev.product}</p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3 md:w-4 h-4 fill-yellow-500" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm md:text-base">{rev.comment}</p>

              {/* Date */}
              <p className="text-sm text-gray-400">{rev.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}