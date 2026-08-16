"use client"

import { useState } from "react"
import Link from "next/link"
import { SHOWCASE_ITEMS, type ShowcaseItem } from "@/constants/showcase-items"
import { ArrowRightIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/custom/heading"
import { Frame, FramePanel } from "@/components/neui/frame"
import { PageGridBackdrop } from "@/components/page-grid-backdrop"

export function LiveShowcaseBlock() {
  const [activeId, setActiveId] = useState(SHOWCASE_ITEMS[0].id)
  const direction = 0

  const activeItem =
    SHOWCASE_ITEMS.find((item: ShowcaseItem) => item.id === activeId) ??
    SHOWCASE_ITEMS[0]
  const activeIndex = SHOWCASE_ITEMS.findIndex((item) => item.id === activeId)

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <section className="relative isolate overflow-hidden py-16 lg:py-24">
      <PageGridBackdrop variant="section" />
      <div className="container-wrapper relative z-10">
        <div className="container">
          <Heading
            badge="Live Demo"
            title={
              <span className="inline-flex items-center gap-3">
                Interactive Component Showcase
              </span>
            }
            description="Real NeUI components, rendered live. Click, hover, and interact — just like in your production app."
          />
        </div>
        <div className="mx-auto mt-10 max-w-6xl">
          <div className="relative">
            <div className="absolute -top-2 right-0 left-0 z-10 flex items-center gap-2 px-1">
              {SHOWCASE_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "h-1 flex-1 cursor-pointer rounded-full transition-all",
                    i === activeIndex
                      ? "bg-site-foreground"
                      : "bg-site-border/60 hover:bg-site-border"
                  )}
                />
              ))}
            </div>
            <Frame variant="default" className="overflow-hidden pt-8">
              <FramePanel className="dark:bg-site-muted/20">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-site-primary/10 text-site-primary site-rounded-md flex size-8 items-center justify-center">
                        {(() => {
                          const Icon = activeItem.icon
                          if (!Icon) return null
                          return <Icon className="size-4" />
                        })()}
                      </span>
                      <h3 className="text-site-foreground text-lg font-semibold">
                        {activeItem.name}
                      </h3>
                      {activeItem.badge && (
                        <span className="bg-site-muted/60 text-site-muted-foreground site-rounded-full hidden border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase sm:inline-block">
                          {activeItem.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-site-muted-foreground mt-1 max-w-md text-sm leading-relaxed">
                      {activeItem.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="shrink-0"
                  >
                    <Link
                      href={activeItem.href}
                      className="flex items-center gap-1.5"
                    >
                      View Component
                      <ArrowRightIcon className="size-3.5" />
                    </Link>
                  </Button>
                </div>
                <div className="border-site-border/60 my-4 border-t" />
                <div className="relative min-h-50">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeId}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="w-full"
                    >
                      {activeItem.component}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </FramePanel>
            </Frame>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-site-muted-foreground max-w-lg text-sm leading-relaxed">
            Every component in this showcase is a real NeUI component —
            production-ready, accessible, and fully customizable.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/components">
                Browse All Components
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/docs">Read the Docs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
