export const componentPreviewLoaders = {
  "c-breadcrumb-1": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-1.tsx"),
  "c-breadcrumb-2": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-2.tsx"),
  "c-breadcrumb-3": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-3.tsx"),
  "c-breadcrumb-4": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-4.tsx"),
  "c-breadcrumb-5": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-5.tsx"),
  "c-breadcrumb-6": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-6.tsx"),
  "c-breadcrumb-7": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-7.tsx"),
  "c-breadcrumb-8": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-8.tsx"),
  "c-breadcrumb-9": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-9.tsx"),
  "c-breadcrumb-10": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-10.tsx"),
  "c-breadcrumb-11": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-11.tsx"),
  "c-breadcrumb-12": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-12.tsx"),
  "c-breadcrumb-13": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-13.tsx"),
  "c-breadcrumb-14": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-14.tsx"),
  "c-breadcrumb-15": () =>
    import("@/registry-neui/bases/base/components/breadcrumb/c-breadcrumb-15.tsx"),
} as const

export type ComponentName = keyof typeof componentPreviewLoaders
