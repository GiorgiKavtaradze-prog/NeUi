"use client"

import * as React from "react"

import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect"

export function useScrollActiveIntoView<T extends HTMLElement>(
  activeKey: unknown
) {
  const ref = React.useRef<T>(null)

  useIsomorphicLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    const viewport = node.closest<HTMLElement>(
      '[data-slot="scroll-area-viewport"]'
    )
    if (!viewport) return

    const active = viewport.querySelector<HTMLElement>('[data-active="true"]')
    if (!active) return

    const v = viewport.getBoundingClientRect()
    const a = active.getBoundingClientRect()

    if (v.height === 0) return

    if (a.top >= v.top && a.bottom <= v.bottom) return

    viewport.scrollTop += a.top - v.top - (v.height - a.height) / 2
  }, [activeKey])

  return ref
}
