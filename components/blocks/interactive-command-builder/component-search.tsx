"use client"

import { SearchIcon, XIcon } from "lucide-react"

interface ComponentSearchProps {
  query: string
  onQueryChange: (value: string) => void
}

export function ComponentSearch({
  query,
  onQueryChange,
}: ComponentSearchProps) {
  return (
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
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search 70+ components…"
          className="text-site-foreground placeholder:text-site-muted-foreground/50 h-10 flex-1 bg-transparent text-sm outline-none"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => onQueryChange("")}
            className="text-site-muted-foreground hover:text-site-foreground cursor-pointer"
            aria-label="Clear search"
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
