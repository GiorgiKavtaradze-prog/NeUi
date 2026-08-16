"use client"

import Link from "next/link"
import { SHOWCASE_ITEMS } from "@/constants/showcase-items"
import { ArrowRightIcon } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/custom/heading"
import { Frame, FramePanel } from "@/components/neui/frame"
import { PageGridBackdrop } from "@/components/page-grid-backdrop"

export function MagneticFeaturedBlock() {
  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ overflowX: "hidden", overflowY: "hidden" }}
    >
      <PageGridBackdrop variant="section" />
      <div className="container-wrapper relative z-10">
        <div className="container mx-auto">
          <Heading
            badge="Featured"
            title="Handpicked Components"
            description="The best NeUI components, carefully crafted and ready to use in your project."
            className="mb-12"
          />
          <div
            className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ overflowX: "hidden", overflowY: "hidden" }}
          >
            {SHOWCASE_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                whileHover={{ opacity: 1, transition: { duration: 200 } }}
                whileTap={{ scale: 1 }}
                className="group bg-site-background hover:border-site-primary overflow-hidden rounded-2xl border-2 border-transparent transition-colors"
              >
                <Frame variant="default" className="h-full overflow-hidden">
                  <FramePanel className="dark:bg-site-muted/40 flex h-full flex-col">
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                      {item.badge && (
                        <span className="bg-site-muted/60 text-site-muted-foreground site-rounded-full px-2 py-0.5 text-xs font-semibold">
                          {item.badge}
                        </span>
                      )}
                      <span className="text-site-muted-foreground text-xs">
                        {item.id}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col items-start gap-3 p-4">
                      <div className="flex items-center gap-2">
                        {(() => {
                          const Icon = item.icon
                          if (!Icon) return null
                          return (
                            <Icon className="text-site-muted-foreground size-4" />
                          )
                        })()}
                        <h3 className="text-site-foreground flex-1 text-lg font-medium">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-site-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-auto flex items-center gap-2">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="shrink-0"
                        >
                          <Link
                            href={item.href}
                            className="text-site-primary hover:text-site-primary-foreground flex items-center gap-1.5 transition-colors"
                          >
                            View Component
                            <ArrowRightIcon className="size-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </FramePanel>
                </Frame>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/components">
                Browse All Components
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hover:bg-site-muted/60"
            >
              <Link href="/docs">Read the Docs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
