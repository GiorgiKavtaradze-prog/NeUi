import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Frame, FramePanel } from "@/components/neui/frame"

export function Card({
  children,
  className,
  outerClassName,
  url,
}: {
  children: React.ReactNode
  className?: string
  outerClassName?: string
  url?: string
}) {
  const innerContent = (
    <FramePanel
      className={cn("relative flex w-full flex-col gap-6", className)}
    >
      {children}
    </FramePanel>
  )

  if (url) {
    return (
      <Link
        href={url}
        className={cn(
          "relative flex break-inside-avoid items-stretch transition-all hover:-translate-y-1 hover:shadow-md",
          outerClassName
        )}
      >
        <Frame className="h-full w-full">{innerContent}</Frame>
      </Link>
    )
  }

  return (
    <Frame className={cn("break-inside-avoid", outerClassName)}>
      {innerContent}
    </Frame>
  )
}
