import { Suspense } from "react"

import {
  getComponentCategories,
  getComponentsTotalCount,
} from "@/lib/component-stats"
import { DEFAULT_COMPONENTS_STATE, DEFAULT_CONFIG } from "@/lib/preferences"
import {
  DesignSystemProvider,
  DesignSystemSyncProvider,
} from "@/app/(create)/design-system/design-system-provider"
import { LocksProvider } from "@/app/(create)/hooks/use-locks"

import { ComponentsLayoutShell } from "../components/components-layout-shell"
import { ComponentsProvider } from "../components/components-provider"

export default async function ComponentCategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialConfig = DEFAULT_CONFIG
  const initialComponentsLayout = DEFAULT_COMPONENTS_STATE
  const totalCount = getComponentsTotalCount()
  const categories = getComponentCategories()
  const categoryCounts = categories.reduce(
    (acc, category) => {
      acc[category.slug] = category.count
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="has-[.bordered-sidebar]:bg-site-muted/60 dark:has-[.bordered-sidebar]:bg-site-background flex min-h-0 flex-1 flex-col">
      <LocksProvider>
        <DesignSystemSyncProvider>
          <ComponentsProvider
            initialConfig={initialConfig}
            initialComponentsLayout={initialComponentsLayout}
            totalCount={totalCount}
            categoryCounts={categoryCounts}
          >
            <Suspense fallback={null}>
              <DesignSystemProvider effectsOnly />
            </Suspense>
            <ComponentsLayoutShell>{children}</ComponentsLayoutShell>
          </ComponentsProvider>
        </DesignSystemSyncProvider>
      </LocksProvider>
    </div>
  )
}
