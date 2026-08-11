import { cn } from "@/lib/utils"

export function SectionLabel({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "text-site-muted-foreground font-site-mono text-xs font-medium tracking-[0.12em] uppercase",
        className
      )}
    >
      {children}
    </span>
  )
}
