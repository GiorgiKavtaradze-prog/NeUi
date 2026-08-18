"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface SegmentedOption<T extends string> {
  value: T
  label: React.ReactNode
  srLabel?: string
}

interface SegmentedControlProps<T extends string> {
  value: T
  onValueChange: (value: T) => void
  options: ReadonlyArray<SegmentedOption<T>>
  "aria-label": string
  className?: string
}

function SegmentedControl<T extends string>({
  value,
  onValueChange,
  options,
  className,
  "aria-label": ariaLabel,
}: SegmentedControlProps<T>) {
  const move = (direction: 1 | -1) => {
    const index = options.findIndex((option) => option.value === value)
    const next = (index + direction + options.length) % options.length
    onValueChange(options[next].value)
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "bg-muted/60 flex w-full gap-0.5 rounded-lg border p-0.5",
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={option.srLabel}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onValueChange(option.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault()
                move(1)
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault()
                move(-1)
              }
            }}
            className={cn(
              "focus-visible:ring-ring/50 h-7 flex-1 cursor-pointer rounded-md px-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export { SegmentedControl, type SegmentedOption }
