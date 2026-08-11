export const componentPreviewLoaders = {
  "c-aspect-ratio-1": () =>
    import("@/registry-neui/bases/base/components/aspect-ratio/c-aspect-ratio-1.tsx"),
  "c-aspect-ratio-2": () =>
    import("@/registry-neui/bases/base/components/aspect-ratio/c-aspect-ratio-2.tsx"),
  "c-aspect-ratio-3": () =>
    import("@/registry-neui/bases/base/components/aspect-ratio/c-aspect-ratio-3.tsx"),
  "c-aspect-ratio-4": () =>
    import("@/registry-neui/bases/base/components/aspect-ratio/c-aspect-ratio-4.tsx"),
  "c-aspect-ratio-5": () =>
    import("@/registry-neui/bases/base/components/aspect-ratio/c-aspect-ratio-5.tsx"),
  "c-aspect-ratio-6": () =>
    import("@/registry-neui/bases/base/components/aspect-ratio/c-aspect-ratio-6.tsx"),
  "c-aspect-ratio-7": () =>
    import("@/registry-neui/bases/base/components/aspect-ratio/c-aspect-ratio-7.tsx"),
  "c-aspect-ratio-8": () =>
    import("@/registry-neui/bases/base/components/aspect-ratio/c-aspect-ratio-8.tsx"),
} as const

export type ComponentName = keyof typeof componentPreviewLoaders
