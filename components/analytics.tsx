"use client"

import * as React from "react"
import { Analytics as VercelAnalytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export function Analytics() {
  const [context] = React.useState<{ embedded: boolean; sameOrigin: boolean }>(
    () => {
      if (typeof window === "undefined") {
        return { embedded: false, sameOrigin: false }
      }
      if (window.self === window.top) {
        return { embedded: false, sameOrigin: false }
      }
      try {
        return {
          embedded: true,
          sameOrigin: window.top!.location.origin === window.location.origin,
        }
      } catch {
        return { embedded: true, sameOrigin: false }
      }
    }
  )

  const trackAnalytics = !context.embedded || !context.sameOrigin
  const trackSpeed = !context.embedded

  return (
    <>
      {trackAnalytics && <VercelAnalytics />}
      {trackSpeed && <SpeedInsights />}
    </>
  )
}
