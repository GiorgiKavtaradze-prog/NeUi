"use client"

import { cn } from "@/lib/utils"

import type { ComponentName } from "./types"

interface ComponentPillsProps {
  items: readonly ComponentName[]
  activeComponent: ComponentName
  query: string
  onSelect: (name: ComponentName) => void
}

export function ComponentPills({
  items,
  activeComponent,
  query,
  onSelect,
}: ComponentPillsProps) {
  return (
    <div className="no-scrollbar flex max-h-28 flex-wrap gap-1.5 overflow-y-auto pr-1">
      {items.map((name) => {
        const isActive = name === activeComponent
        return (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={cn(
              "site-rounded-md cursor-pointer border px-2.5 py-1 text-xs font-medium transition-colors",
              isActive
                ? "bg-site-primary text-site-primary-foreground border-site-primary"
                : "text-site-muted-foreground hover:text-site-foreground border-site-border/60 hover:border-site-border bg-site-background"
            )}
          >
            {name}
          </button>
        )
      })}
      {items.length === 0 && (
        <p className="text-site-muted-foreground text-xs italic">
          No components match "{query}".
        </p>
      )}
    </div>
  )
}
