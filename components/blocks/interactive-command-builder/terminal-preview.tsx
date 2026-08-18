"use client"

import Link from "next/link"
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  CommandIcon,
  CopyIcon,
  PackageIcon,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Frame, FrameHeader, FramePanel } from "@/components/neui/frame"

import type { BaseName, ComponentName } from "./types"
import { PACKAGE_MANAGERS } from "./types"

interface TerminalPreviewProps {
  command: string
  selectedPm: (typeof PACKAGE_MANAGERS)[number]
  activeComponent: ComponentName
  base: BaseName
  style: string
  hasCopied: boolean
  hasRun: boolean
  onCopy: () => void
  onToggleRun: () => void
}

export function TerminalPreview({
  command,
  selectedPm,
  activeComponent,
  base,
  style,
  hasCopied,
  hasRun,
  onCopy,
  onToggleRun,
}: TerminalPreviewProps) {
  return (
    <Frame variant="default" className="h-full overflow-hidden">
      <FrameHeader className="border-site-border/80 bg-site-muted/30 dark:bg-site-muted/20 flex flex-row items-center gap-3 border-b px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="font-site-mono text-site-muted-foreground text-xs">
          shadcn — install
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                variant="ghost"
                className="hover:bg-site-muted/60 size-7"
                onClick={onCopy}
                aria-label="Copy command"
              >
                {hasCopied ? (
                  <CheckIcon className="size-3.5 text-emerald-500" />
                ) : (
                  <CopyIcon className="size-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {hasCopied ? "Copied!" : "Copy command"}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                variant="ghost"
                className="hover:bg-site-muted/60 size-7"
                onClick={onToggleRun}
                aria-label="Toggle demo run"
              >
                {hasRun ? (
                  <CommandIcon className="size-3.5" />
                ) : (
                  <ChevronsUpDownIcon className="size-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {hasRun ? "Show command" : "Simulate run"}
            </TooltipContent>
          </Tooltip>
        </div>
      </FrameHeader>
      <FramePanel className="dark:bg-site-code/60 bg-site-code/40 flex min-h-56 flex-col gap-3 p-0">
        <div className="font-site-mono p-4 text-[13px] leading-7">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400" aria-hidden="true">
              ➜
            </span>
            <span className="text-sky-400">~</span>
            <span className="bg-site-foreground/70 inline-block h-4 w-2 animate-pulse align-middle" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={command}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="mt-2"
            >
              <div className="border-site-border/50 rounded-lg border bg-black/30 px-3 py-2.5 dark:bg-black/20">
                <code className="text-site-foreground/90 break-all whitespace-pre-wrap">
                  <span className="text-site-primary font-semibold">
                    {selectedPm.command}
                  </span>{" "}
                  <span className="text-sky-500 dark:text-sky-400">
                    shadcn@latest
                  </span>{" "}
                  <span className="text-amber-600 dark:text-amber-400">
                    add
                  </span>{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">
                    @neui/{activeComponent}
                  </span>
                </code>
              </div>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence>
            {hasRun && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 overflow-hidden"
              >
                <div className="border-site-border/50 space-y-1 rounded-lg border bg-black/30 px-3 py-2.5 text-xs dark:bg-black/20">
                  <p className="text-site-muted-foreground">
                    <span className="text-emerald-500">✓</span> Installing{" "}
                    <span className="text-site-foreground/90">
                      @neui/{activeComponent}
                    </span>
                    …
                  </p>
                  <p className="text-site-muted-foreground">
                    <span className="text-emerald-500">✓</span> Using{" "}
                    <span className="text-site-foreground/90">
                      {base}–{style}
                    </span>{" "}
                    style configuration
                  </p>
                  <p className="text-site-muted-foreground">
                    <span className="text-emerald-500">✓</span> Component
                    registered in your project
                  </p>
                  <p className="font-site-mono text-site-foreground/60">
                    Done in 1.2s
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="border-site-border/60 mt-auto flex items-center justify-between gap-2 border-t px-4 py-2.5">
          <span className="font-site-mono text-site-muted-foreground inline-flex items-center gap-1.5 text-[11px]">
            <PackageIcon
              className="text-site-muted-foreground size-3"
              aria-hidden="true"
            />
            {base} / {style}
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              asChild
              size="xs"
              variant="outline"
              className="h-6 text-[11px]"
            >
              <Link href="/components">
                Catalog
                <ArrowRightIcon className="size-3" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="xs" className="h-6 text-[11px]" onClick={onCopy}>
              {hasCopied ? (
                <>
                  <CheckIcon className="size-3" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <CopyIcon className="size-3" aria-hidden="true" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </FramePanel>
    </Frame>
  )
}
