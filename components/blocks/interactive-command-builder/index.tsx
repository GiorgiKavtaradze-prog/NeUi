"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/custom/heading"
import { Frame, FramePanel } from "@/components/neui/frame"
import { PageGridBackdrop } from "@/components/page-grid-backdrop"

import { ComponentPills } from "./component-pills"
import { ComponentSearch } from "./component-search"
import { OptionsPanel } from "./options-panel"
import { TerminalPreview } from "./terminal-preview"
import { useCommandBuilder } from "./use-command-builder"

export function InteractiveCliCommandBuilderBlock() {
  const {
    query,
    setQuery,
    base,
    setBase,
    style,
    setStyle,
    packageManager,
    setPackageManager,
    hasRun,
    setHasRun,
    hasCopied,
    filteredComponents,
    activeComponent,
    selectedPm,
    command,
    copyCommand,
    setSelectedComponent,
  } = useCommandBuilder()

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
            <Frame variant="default" className="h-full">
              <FramePanel className="dark:bg-site-muted/40 flex h-full flex-col gap-4">
                <ComponentSearch query={query} onQueryChange={setQuery} />
                <ComponentPills
                  items={filteredComponents}
                  activeComponent={activeComponent}
                  query={query}
                  onSelect={(name) => {
                    setSelectedComponent(name)
                    setQuery("")
                  }}
                />
                <OptionsPanel
                  packageManager={packageManager}
                  base={base}
                  style={style}
                  onPmChange={setPackageManager}
                  onBaseChange={setBase}
                  onStyleChange={setStyle}
                />
              </FramePanel>
            </Frame>
            <TerminalPreview
              command={command}
              selectedPm={selectedPm}
              activeComponent={activeComponent}
              base={base}
              style={style}
              hasCopied={hasCopied}
              hasRun={hasRun}
              onCopy={copyCommand}
              onToggleRun={() => setHasRun((prev) => !prev)}
            />
          </div>
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
