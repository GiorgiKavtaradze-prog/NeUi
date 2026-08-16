"use client"

import { useState } from "react"
import { ACCORDION_ITEMS } from "@/constants/demo-content"
import { ChevronDownIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

export default function AccordionDemo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-1 py-4">
      {ACCORDION_ITEMS.map((item, i) => (
        <div key={i} className="border-site-border/60 overflow-hidden border-b">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="hover:bg-site-muted/30 flex w-full items-center justify-between px-3 py-3 text-left text-sm font-medium transition-colors"
          >
            <span>{item.title}</span>
            <motion.span
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="text-site-muted-foreground size-4" />
            </motion.span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-site-muted-foreground px-3 pb-3 text-sm leading-relaxed">
                  {item.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
