"use client"

import * as React from "react"
import { RotateCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CreateError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Surface for observability (Vercel captures console.error).
    console.error("[create-error-boundary]", error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex flex-col gap-1">
        <h2 className="text-site-foreground text-lg font-semibold tracking-tight">
          Something went wrong loading this page
        </h2>
        <p className="text-site-muted-foreground max-w-md text-sm">
          This is usually a transient hiccup. Try again, or reload the page.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={reset} className="gap-1.5">
          <RotateCwIcon className="size-3.5" aria-hidden="true" />
          Try again
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Reload page
        </Button>
      </div>
    </div>
  )
}

