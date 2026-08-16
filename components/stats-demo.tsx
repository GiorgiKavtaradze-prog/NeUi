"use client"

import { STATS_DATA } from "@/constants/demo-content"
import { motion } from "motion/react"

export default function StatsDemo() {
  return (
    <div className="grid grid-cols-2 gap-4 py-6">
      {STATS_DATA.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-1 text-center"
        >
          <span className="from-site-foreground to-site-foreground/60 bg-linear-to-br bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            {stat.value}
          </span>
          <span className="text-site-muted-foreground text-xs font-medium">
            {stat.label}
          </span>
        </div>
      ))}
      <div className="col-span-2 mt-2">
        <div className="bg-site-muted/60 h-2 w-full overflow-hidden rounded-full">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "94%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="from-site-foreground to-site-foreground/60 h-full rounded-full bg-linear-to-r"
          />
        </div>
        <p className="text-site-muted-foreground mt-1.5 text-center text-[10px]">
          94% of users ship faster with NeUI
        </p>
      </div>
    </div>
  )
}
