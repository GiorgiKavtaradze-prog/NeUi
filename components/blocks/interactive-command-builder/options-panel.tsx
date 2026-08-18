"use client"

import { TerminalIcon } from "lucide-react"

import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { STYLES } from "@/registry/styles"

import {
  BASES,
  PACKAGE_MANAGERS,
  type BaseName,
  type PackageManager,
} from "./types"

interface OptionsPanelProps {
  packageManager: PackageManager
  base: BaseName
  style: (typeof STYLES)[number]["name"]
  onPmChange: (value: PackageManager) => void
  onBaseChange: (value: BaseName) => void
  onStyleChange: (value: (typeof STYLES)[number]["name"]) => void
}

export function OptionsPanel({
  packageManager,
  base,
  style,
  onPmChange,
  onBaseChange,
  onStyleChange,
}: OptionsPanelProps) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-site-foreground text-xs font-semibold tracking-wider uppercase">
            Package Manager
          </label>
          <Tabs
            value={packageManager}
            onValueChange={(value) => onPmChange(value as PackageManager)}
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
            onValueChange={(value) => onBaseChange(value as BaseName)}
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
      <div className="flex flex-col gap-2">
        <label className="text-site-foreground text-xs font-semibold tracking-wider uppercase">
          Style
        </label>
        <div className="flex flex-wrap gap-1.5">
          {STYLES.map((s) => (
            <button
              key={s.name}
              onClick={() => onStyleChange(s.name)}
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
    </>
  )
}
