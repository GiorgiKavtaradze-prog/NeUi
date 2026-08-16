"use client"

import { ArrowRight, RocketIcon } from "lucide-react"
import { motion } from "motion/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const SHADCN_AVATAR = "https://github.com/shadcn.png"

export function HeroBlock() {
  const variants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  }

  return (
    <section
      className="container-wrapper relative overflow-hidden py-16 lg:py-24"
      aria-labelledby="hero-heading"
    >
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <div className="bg-site-background border-site-border site-rounded-full flex items-center justify-center border shadow-xs shadow-black/5">
          <a
            href="/docs/changelog"
            className="group bg-site-muted/40 hover:bg-site-muted/60 site-rounded-full flex items-center gap-2 p-1 transition-colors duration-200"
          >
            <span className="flex items-center justify-center pl-2">
              <RocketIcon
                className="text-site-foreground size-4"
                aria-hidden="true"
              />
            </span>
            <span className="text-site-foreground text-sm font-medium">
              1,000+ free shadcn components, MIT licensed
            </span>
            <span className="bg-site-border/80 h-4 w-px" aria-hidden="true" />
            <span className="bg-site-background group-hover:bg-site-background site-rounded-full flex size-6 items-center justify-center shadow-sm transition-colors duration-200">
              <ArrowRight
                className="text-site-foreground size-3.5"
                aria-hidden="true"
              />
            </span>
          </a>
        </div>
        <motion.h1
          id="hero-heading"
          className="inline-flex max-w-4xl flex-wrap items-center justify-center gap-x-2 gap-y-1 text-3xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <span>Design-forward</span>
          <span className="inline-flex items-center gap-1.5">
            <Avatar className="mt-0.5 size-9 shrink-0" aria-hidden="true">
              <AvatarImage
                src={SHADCN_AVATAR}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <AvatarFallback className="text-sm">S</AvatarFallback>
            </Avatar>
            <span>shadcn/ui</span>
          </span>
          <span>platform for interfaces that stand out</span>
        </motion.h1>
        <motion.p
          className="text-site-accent-foreground/80 max-w-xl text-base leading-relaxed text-pretty sm:text-lg"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          Free, open-source shadcn/ui components and in-house primitives,
          curated by senior design engineers and ready to copy into your project
        </motion.p>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button asChild className="min-w-36">
          <a href="/components">Browse Components</a>
        </Button>
        <Button asChild variant="outline" className="min-w-36">
          <a href="/docs">Read the Docs</a>
        </Button>
      </div>
    </section>
  )
}
