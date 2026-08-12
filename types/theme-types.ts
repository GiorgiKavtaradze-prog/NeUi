export type OklchColor = `oklch(${string})`

export type ColorMode = "light" | "dark"

interface SurfaceVars {
  background: OklchColor
  foreground: OklchColor
  card: OklchColor
  "card-foreground": OklchColor
  popover: OklchColor
  "popover-foreground": OklchColor
}

interface RoleVars {
  primary: OklchColor
  "primary-foreground": OklchColor
  secondary: OklchColor
  "secondary-foreground": OklchColor
  muted: OklchColor
  "muted-foreground": OklchColor
  accent: OklchColor
  "accent-foreground": OklchColor
  destructive: OklchColor
}

interface FormVars {
  border: OklchColor
  input: OklchColor
  ring: OklchColor
}

interface ChartVars {
  "chart-1": OklchColor
  "chart-2": OklchColor
  "chart-3": OklchColor
  "chart-4": OklchColor
  "chart-5": OklchColor
}

interface SidebarVars {
  sidebar: OklchColor
  "sidebar-foreground": OklchColor
  "sidebar-primary": OklchColor
  "sidebar-primary-foreground": OklchColor
  "sidebar-accent": OklchColor
  "sidebar-accent-foreground": OklchColor
  "sidebar-border": OklchColor
  "sidebar-ring": OklchColor
}

export interface BaseThemeVars
  extends SurfaceVars, RoleVars, FormVars, ChartVars, SidebarVars {
  radius?: `${number}rem`
}

export type AccentThemeVars = Pick<
  BaseThemeVars,
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5"
  | "sidebar-primary"
  | "sidebar-primary-foreground"
>

type LightDarkPair<T> = {
  light: T
  dark: T
}

interface BaseThemeItem {
  kind: "base"
  name: string
  title: string
  type: "registry:theme"
  cssVars: LightDarkPair<BaseThemeVars>
}

interface AccentThemeItem {
  kind: "accent"
  name: string
  title: string
  type: "registry:theme"
  cssVars: LightDarkPair<AccentThemeVars>
}

export type ThemeItem = BaseThemeItem | AccentThemeItem

export const THEME_NAMES = [
  "neutral",
  "stone",
  "zinc",
  "mauve",
  "olive",
  "mist",
  "taupe",
  "amber",
  "blue",
  "cyan",
  "emerald",
  "fuchsia",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "purple",
  "red",
  "rose",
  "sky",
  "teal",
  "violet",
  "yellow",
] as const

export type ThemeName = (typeof THEME_NAMES)[number]

export type ThemeVarKey = keyof BaseThemeVars

export type ThemeVarValue<
  T extends ThemeItem,
  M extends ColorMode,
  K extends keyof T["cssVars"][M],
> = T["cssVars"][M][K]

export function isBaseTheme(theme: ThemeItem): theme is BaseThemeItem {
  return theme.kind === "base"
}

export function isAccentTheme(theme: ThemeItem): theme is AccentThemeItem {
  return theme.kind === "accent"
}

export type ThemeRegistry = readonly ThemeItem[]
