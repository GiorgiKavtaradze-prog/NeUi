import * as React from "react"

import { cn } from "@/lib/utils"

interface SectionHeadingProps extends React.ComponentPropsWithoutRef<"div"> {
  badge?: string
  title: string
  description?: string
  align?: "start" | "center"
  titleId?: string
}

function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  titleId,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "mx-auto max-w-2xl text-center" : "text-left",
        className
      )}
      {...props}
    >
      {badge ? (
        <span
          className={cn(
            "text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase",
            align === "center" && "mx-auto"
          )}
        >
          {badge}
        </span>
      ) : null}
      <h2
        id={titleId}
        className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground text-base leading-relaxed text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export { SectionHeading, type SectionHeadingProps }
