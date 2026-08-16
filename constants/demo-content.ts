export const CODE_SNIPPETS = [
  {
    id: "react",
    label: "React",
    code: `import { Tabs } from "@/components/ui/tabs"\n\n<Tabs defaultValue="tab-1">\n  <TabsList>\n    <TabsTrigger value="tab-1">Tab 1</TabsTrigger>\n    <TabsTrigger value="tab-2">Tab 2</TabsTrigger>\n  </TabsList>\n</Tabs>`,
  },
  {
    id: "vue",
    label: "Vue",
    code: `<template>\n  <Tabs default-value="tab-1">\n    <TabsList>\n      <TabsTrigger value="tab-1">Tab 1</TabsTrigger>\n    </TabsList>\n  </Tabs>\n</template>`,
  },
  {
    id: "svelte",
    label: "Svelte",
    code: `<script>\n  import { Tabs, TabsList, TabsTrigger } from "neui"\n</script>\n\n<Tabs defaultValue="tab-1">\n  <TabsList>\n    <TabsTrigger value="tab-1">Tab 1</TabsTrigger>\n  </TabsList>\n</Tabs>`,
  },
]

export const ACCORDION_ITEMS = [
  {
    title: "What is NeUI?",
    content:
      "NeUI is a free, open-source library of production-ready shadcn/ui components and in-house primitives for React and Tailwind CSS.",
  },
  {
    title: "Is it really free?",
    content:
      "Yes! All components are MIT licensed. You can copy them into your project and own them forever — no attribution required.",
  },
  {
    title: "How do I install?",
    content:
      "Use the shadcn CLI just like the official set. Or copy-paste the source directly from our catalog.",
  },
]

export const KEYBOARD_SHORTCUTS = [
  { keys: ["⌘", "K"], label: "Command palette" },
  { keys: ["⌘", "S"], label: "Save changes" },
  { keys: ["⌘", "Z"], label: "Undo" },
  { keys: ["⌘", "Shift", "Z"], label: "Redo" },
  { keys: ["⌘", "D"], label: "Duplicate" },
  { keys: ["⌘", "F"], label: "Search" },
]

export const THEME_SWATCHES = [
  { name: "Vega", colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"] },
  { name: "Nova", colors: ["#ec4899", "#f43f5e", "#a855f7", "#06b6d4"] },
  { name: "Lyra", colors: ["#6366f1", "#d946ef", "#14b8a6", "#eab308"] },
  { name: "Maia", colors: ["#0ea5e9", "#84cc16", "#f97316", "#8b5cf6"] },
  { name: "Mira", colors: ["#ef4444", "#3b82f6", "#22c55e", "#a855f7"] },
]

export const STATS_DATA = [
  { value: "1,000+", label: "Components" },
  { value: "100%", label: "MIT Licensed" },
  { value: "8", label: "Themes" },
  { value: "2", label: "UI Libraries" },
]

export const RATING_STARS = [1, 2, 3, 4, 5]
