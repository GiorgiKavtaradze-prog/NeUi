"use client"

import { useState } from "react"
import { RATING_STARS } from "@/constants/demo-content"
import { StarIcon } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export default function RatingDemo() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="flex items-center gap-1.5">
        {RATING_STARS.map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="cursor-pointer transition-colors"
          >
            <StarIcon
              className={cn(
                "size-8 transition-colors",
                (hovered || rating) >= star
                  ? "fill-amber-400 text-amber-400"
                  : "text-site-border"
              )}
              strokeWidth={1.5}
            />
          </motion.button>
        ))}
      </div>
      <p className="text-site-muted-foreground text-xs">
        {rating > 0
          ? `You rated ${rating} star${rating !== 1 ? "s" : ""}`
          : "Click a star to rate"}
      </p>
    </div>
  )
}
