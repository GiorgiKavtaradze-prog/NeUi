"use client"

import * as React from "react"

import { normalizeComponentSearchQuery } from "@/lib/component-search-filter"

import { ComponentsGrid } from "../components/components-grid"
import type { Component } from "../types"

interface CategoryPageContentProps {
  components: Component[]
}

export function CategoryPageContent({ components }: CategoryPageContentProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    const syncFromLocation = () => {
      setSearchQuery(
        normalizeComponentSearchQuery(
          new URLSearchParams(window.location.search).get("search") || ""
        )
      )
    }

    const handleSearchChange = (event: Event) => {
      const detail = (event as CustomEvent<{ search?: string | null }>).detail
      if (!detail) {
        syncFromLocation()
        return
      }

      setSearchQuery(normalizeComponentSearchQuery(detail.search || ""))
    }

    syncFromLocation()
    window.addEventListener("popstate", syncFromLocation)
    window.addEventListener("neui-components-search", handleSearchChange)

    return () => {
      window.removeEventListener("popstate", syncFromLocation)
      window.removeEventListener("neui-components-search", handleSearchChange)
    }
  }, [])

  return (
    <div className="theme-container w-full" data-slot="components-preview">
      <ComponentsGrid components={components} searchQuery={searchQuery} />
    </div>
  )
}
