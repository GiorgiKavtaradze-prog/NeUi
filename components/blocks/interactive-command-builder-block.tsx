"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  CommandIcon,
  CopyIcon,
  PackageIcon,
  SearchIcon,
  TerminalIcon,
  XIcon,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Heading } from "@/components/custom/heading"
import { Frame, FrameHeader, FramePanel } from "@/components/neui/frame"
import { PageGridBackdrop } from "@/components/page-grid-backdrop"
import { STYLES } from "@/registry/styles"

/** Real NeUI component names (derived from the registry workspace packages). */
const COMPONENTS = [
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "autocomplete",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "button-group",
  "calendar",
  "card",
  "carousel",
  "chart",
  "checkbox",
  "collapsible",
  "combobox",
  "command",
  "context-menu",
  "data-grid",
  "date-selector",
  "dialog",
  "drawer",
  "dropdown-menu",
  "empty",
  "event-calendar",
  "field",
  "file-upload",
  "filters",
  "frame",
  "gantt",
  "hover-card",
  "icon-stack",
  "icon-tile",
  "input",
  "input-group",
  "input-otp",
  "item",
  "kanban",
  "kbd",
  "label",
  "menubar",
  "native-select",
  "navigation-menu",
  "number-field",
  "pagination",
  "phone-input",
  "popover",
  "progress",
  "radio-group",
  "rating",
  "resizable",
  "scroll-area",
  "scrollspy",
  "select",
  "separator",
  "sheet",
  "skeleton",
  "slider",
  "sonner",
  "sortable",
  "spinner",
  "stepper",
  "switch",
  "table",
  "tabs",
  "textarea",
  "timeline",
  "toggle",
  "toggle-group",
  "tooltip",
  "tree",
] as const

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"
type BaseName = "base" | "radix" | "aria"

const PACKAGE_MANAGERS: Array<{
  value: PackageManager
  label: string
  command: string
}> = [
  { value: "pnpm", label: "pnpm", command: "pnpm dlx" },
  { value: "npm", label: "npm", command: "npx" },
  { value: "yarn", label: "yarn", command: "yarn dlx" },
  { value: "bun", label: "bun", command: "bunx --bun" },
]

const BASES: Array<{ value: BaseName; label: string; description: string }> = [
  { value: "base", label: "Base UI", description: "Base UI primitives" },
  { value: "radix", label: "Radix UI", description: "Radix primitives" },
  { value: "aria", label: "React Aria", description: "Accessible ARIA" },
]

export function InteractiveCliCommandBuilderBlock() {
  const [config] = useConfig()
  const [query, setQuery] = React.useState("")
  const [base, setBase] = React.useState<BaseName>("base")
  const [style, setStyle] = React.useState<(typeof STYLES)[number]["name"]>(
    config.style || "vega"
  )
  const [packageManager, setPackageManager] = React.useState<PackageManager>(
    config.packageManager || "pnpm"
  )
  const [hasCopied, setHasCopied] = React.useState(false)
  const [hasRun, setHasRun] = React.useState(false)

  const filteredComponents = React.useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return COMPONENTS
    return COMPONENTS.filter((name) => name.includes(normalized))
  }, [query])

  const selectedPm =
    PACKAGE_MANAGERS.find((pm) => pm.value === packageManager) ??
    PACKAGE_MANAGERS[0]

  // Real-time command built from the current selection.
  const command = React.useMemo(() => {
    const target = filteredComponents[0] ?? COMPONENTS[0]
    return `${selectedPm.command} shadcn@latest add @neui/${target}`
  }, [selectedPm.command, filteredComponents])

  const copyCommand = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command)
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 2000)
    } catch {
      // Clipboard unavailable — the user can select the text manually.
    }
  }, [command])

  return (
    <section
      className="relative isolate overflow-hidden py-16 lg:py-24"
      aria-labelledby="cli-command-builder-title"
    >
      <PageGridBackdrop variant="section" />
      <div className="container-wrapper relative z-10">
        <div className="container">
          <Heading
            badge="Interactive CLI"
            title="Build your install command"
            description="Pick a component, package manager, base, and style — copy the exact command your terminal needs. Built on the real NeUI registry."
          />

          <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_1fr]">
            {/* ── Controls panel ─────────────────────────────────────── */}
            <Frame variant="default" className="h-full">
              <FramePanel className="dark:bg-site-muted/40 flex h-full flex-col gap-4">
                {/* Component search */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="cli-component-search"
                    className="text-site-foreground text-xs font-semibold tracking-wider uppercase"
                  >
                    Component
                  </label>
                  <div className="bg-site-muted/40 border-site-border focus-within:border-site-primary/60 relative flex items-center gap-2 rounded-lg border px-3 transition-colors">
                    <SearchIcon
                      className="text-site-muted-foreground size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <input
                      id="cli-component-search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search 70+ components…"
                      className="text-site-foreground placeholder:text-site-muted-foreground/50 h-10 flex-1 bg-transparent text-sm outline-none"
                      autoComplete="off"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="text-site-muted-foreground hover:text-site-foreground cursor-pointer"
                        aria-label="Clear search"
                      >
                        <XIcon className="size-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Component pills */}
                <div className="no-scrollbar flex max-h-28 flex-wrap gap-1.5 overflow-y-auto pr-1">
                  {filteredComponents.map((name) => {
                    const isActive =
                      name === (filteredComponents[0] ?? COMPONENTS[0])
                    return (
                      <button
                        key={name}
                        onClick={() => setQuery("")}
                        className={cn(
                          "site-rounded-md cursor-pointer border px-2.5 py-1 text-xs font-medium transition-colors",
                          isActive
                            ? "bg-site-primary text-site-primary-foreground border-site-primary"
                            : "text-site-muted-foreground hover:text-site-foreground border-site-border/60 hover:border-site-border bg-site-background"
                        )}
                      >
                        {name}
                      </button>
                    )
                  })}
                  {filteredComponents.length === 0 && (
                    <p className="text-site-muted-foreground text-xs italic">
                      No components match “{query}”.
                    </p>
                  )}
                </div>

                {/* Package manager + base */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-site-foreground text-xs font-semibold tracking-wider uppercase">
                      Package Manager
                    </label>
                    <Tabs
                      value={packageManager}
                      onValueChange={(value) =>
                        setPackageManager(value as PackageManager)
                      }
                    >
                      <TabsList className="bg-site-muted/60 dark:bg-site-muted/30 border-site-border/60 h-auto w-full gap-0.5 p-0.5">
                        {PACKAGE_MANAGERS.map((pm) => (
                          <TabsTrigger
                            key={pm.value}
                            value={pm.value}
                            className="h-7 flex-1 px-1 text-xs"
                          >
                            {pm.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-site-foreground text-xs font-semibold tracking-wider uppercase">
                      Base
                    </label>
                    <Tabs
                      value={base}
                      onValueChange={(value) => setBase(value as BaseName)}
                    >
                      <TabsList className="bg-site-muted/60 dark:bg-site-muted/30 border-site-border/60 h-auto w-full gap-0.5 p-0.5">
                        {BASES.map((b) => (
                          <TabsTrigger
                            key={b.value}
                            value={b.value}
                            className="h-7 flex-1 px-1 text-xs"
                          >
                            {b.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                {/* Style selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-site-foreground text-xs font-semibold tracking-wider uppercase">
                    Style
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {STYLES.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => setStyle(s.name)}
                        className={cn(
                          "site-rounded-md cursor-pointer border px-2.5 py-1 text-xs font-medium transition-colors",
                          style === s.name
                            ? "bg-site-primary text-site-primary-foreground border-site-primary"
                            : "text-site-muted-foreground hover:text-site-foreground border-site-border/60 hover:border-site-border bg-site-background"
                        )}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-site-muted-foreground border-site-border/60 mt-auto border-t pt-3 text-xs leading-relaxed">
                  <TerminalIcon
                    className="text-site-primary relative -top-0.5 mr-1 inline-block size-3.5"
                    aria-hidden="true"
                  />
                  The command targets the live NeUI registry at{" "}
                  <code className="font-site-mono text-site-foreground/80 text-[11px]">
                    {siteConfig.url}
                  </code>{" "}
                  — no npm package required.
                </p>
              </FramePanel>
            </Frame>

            {/* ── Terminal preview ───────────────────────────────────── */}
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
                        onClick={copyCommand}
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
                        onClick={() => setHasRun((run) => !run)}
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
                            @neui/{filteredComponents[0] ?? COMPONENTS[0]}
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
                            <span className="text-emerald-500">✓</span>{" "}
                            Installing{" "}
                            <span className="text-site-foreground/90">
                              @neui/{filteredComponents[0] ?? COMPONENTS[0]}
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
                            <span className="text-emerald-500">✓</span>{" "}
                            Component registered in your project
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
                    <Button
                      size="xs"
                      className="h-6 text-[11px]"
                      onClick={copyCommand}
                    >
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
          </div>

          {/* ── Secondary CTA row ────────────────────────────────────── */}
          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <p className="text-site-muted-foreground max-w-lg text-sm leading-relaxed">
              Every component is MIT licensed and drops straight into your
              project. No account, no lock-in — your source stays yours.
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
      </div>
    </section>
  )
}
