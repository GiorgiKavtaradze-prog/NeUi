export const COMPONENTS = [
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "autocomplete",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "button-group",
  "calendar",
  "card",
  "carousel",
  "chart",
  "checkbox",
  "collapsible",
  "combobox",
  "command",
  "context-menu",
  "data-grid",
  "date-selector",
  "dialog",
  "drawer",
  "dropdown-menu",
  "empty",
  "event-calendar",
  "field",
  "file-upload",
  "filters",
  "frame",
  "gantt",
  "hover-card",
  "icon-stack",
  "icon-tile",
  "input",
  "input-group",
  "input-otp",
  "item",
  "kanban",
  "kbd",
  "label",
  "menubar",
  "native-select",
  "navigation-menu",
  "number-field",
  "pagination",
  "phone-input",
  "popover",
  "progress",
  "radio-group",
  "rating",
  "resizable",
  "scroll-area",
  "scrollspy",
  "select",
  "separator",
  "sheet",
  "skeleton",
  "slider",
  "sonner",
  "sortable",
  "spinner",
  "stepper",
  "switch",
  "table",
  "tabs",
  "textarea",
  "timeline",
  "toggle",
  "toggle-group",
  "tooltip",
  "tree",
] as const

export type ComponentName = (typeof COMPONENTS)[number]
export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"
export type BaseName = "base" | "radix" | "aria"

export const PACKAGE_MANAGERS: Array<{
  value: PackageManager
  label: string
  command: string
}> = [
  { value: "pnpm", label: "pnpm", command: "pnpm dlx" },
  { value: "npm", label: "npm", command: "npx" },
  { value: "yarn", label: "yarn", command: "yarn dlx" },
  { value: "bun", label: "bun", command: "bunx --bun" },
]

export const BASES: Array<{
  value: BaseName
  label: string
  description: string
}> = [
  { value: "base", label: "Base UI", description: "Base UI primitives" },
  { value: "radix", label: "Radix UI", description: "Radix primitives" },
  { value: "aria", label: "React Aria", description: "Accessible ARIA" },
]
