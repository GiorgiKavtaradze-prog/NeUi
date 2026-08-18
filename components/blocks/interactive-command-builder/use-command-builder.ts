"use client"

import * as React from "react"

import { useConfig } from "@/hooks/use-config"
import { STYLES } from "@/registry/styles"

import {
  COMPONENTS,
  PACKAGE_MANAGERS,
  type BaseName,
  type ComponentName,
  type PackageManager,
} from "./types"

export interface CommandBuilderState {
  query: string
  setQuery: (q: string) => void
  selectedComponent: ComponentName
  setSelectedComponent: (c: ComponentName) => void
  base: BaseName
  setBase: (b: BaseName) => void
  style: (typeof STYLES)[number]["name"]
  setStyle: (s: (typeof STYLES)[number]["name"]) => void
  packageManager: PackageManager
  setPackageManager: (pm: PackageManager) => void
  hasCopied: boolean
  hasRun: boolean
  setHasRun: React.Dispatch<React.SetStateAction<boolean>>
  filteredComponents: readonly ComponentName[]
  activeComponent: ComponentName
  selectedPm: (typeof PACKAGE_MANAGERS)[number]
  command: string

  copyCommand: () => Promise<void>
}

export function useCommandBuilder(): CommandBuilderState {
  const [config] = useConfig()

  const [query, setQuery] = React.useState("")
  const [selectedComponent, setSelectedComponent] =
    React.useState<ComponentName>("accordion")
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

  const activeComponent = React.useMemo(() => {
    return filteredComponents.includes(selectedComponent)
      ? selectedComponent
      : (filteredComponents[0] ?? COMPONENTS[0])
  }, [filteredComponents, selectedComponent])

  const selectedPm =
    PACKAGE_MANAGERS.find((pm) => pm.value === packageManager) ??
    PACKAGE_MANAGERS[0]

  const command = React.useMemo(() => {
    return `${selectedPm.command} shadcn@latest add @neui/${activeComponent}`
  }, [selectedPm.command, activeComponent])

  const copyCommand = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command)
      setHasCopied(true)
      setTimeout(() => setHasCopied(false), 2000)
    } catch {}
  }, [command])

  return {
    query,
    setQuery,
    selectedComponent,
    setSelectedComponent,
    base,
    setBase,
    style,
    setStyle,
    packageManager,
    setPackageManager,
    hasCopied,
    hasRun,
    setHasRun,
    filteredComponents,
    activeComponent,
    selectedPm,
    command,
    copyCommand,
  }
}
