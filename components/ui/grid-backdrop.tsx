import { cn } from "@/lib/utils"

function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10",
        "[background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]",
        "[background-size:44px_44px]",
        "[mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]",
        "opacity-40",
        className
      )}
    />
  )
}

export { GridBackdrop }
