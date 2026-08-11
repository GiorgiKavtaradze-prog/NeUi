import { cn } from "@/lib/utils"
import { SectionLabel } from "@/components/custom/section-label"

export function Heading({
  badge,
  title,
  description,
  align = "center",
  className,
}: {
  badge?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "left"
  className?: string
}) {
  const left = align === "left"

  return (
    <div
      className={cn(
        "flex flex-col gap-3.5",
        left ? "items-start text-left" : "mb-12 items-center text-center",
        className
      )}
    >
      {badge != null && badge !== "" && <SectionLabel>{badge}</SectionLabel>}
      <h2
        className={cn(
          "text-site-foreground text-3xl font-bold tracking-tight text-pretty lg:text-4xl",
          left ? "max-w-xl" : "mx-auto max-w-125"
        )}
      >
        {title}
      </h2>
      {description != null && description !== "" && (
        <p
          className={cn(
            "text-site-muted-foreground text-lg leading-relaxed",
            left ? "max-w-xl" : "mx-auto max-w-125"
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

