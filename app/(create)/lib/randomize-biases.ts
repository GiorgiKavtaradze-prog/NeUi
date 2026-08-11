import type {
  BaseColorName,
  Radius,
  StyleName,
  ThemeName,
} from "@/registry/config"

import { type FONTS } from "./fonts"

export type RandomizeContext = {
  style?: StyleName
  baseColor?: BaseColorName
  theme?: ThemeName
  iconLibrary?: string
  font?: string
  menuAccent?: string
  menuColor?: string
  radius?: string
}

export type BiasFilter<T> = (
  items: readonly T[],
  context: RandomizeContext
) => readonly T[]

export type RandomizeBiases = {
  fonts?: BiasFilter<(typeof FONTS)[number]>
  radius?: BiasFilter<Radius>
}

export const RANDOMIZE_BIASES: RandomizeBiases = {
  fonts: (fonts, context) => {
    if (context.style === "lyra") {
      return fonts.filter((font) => font.value === "jetbrains-mono")
    }

    return fonts
  },
  radius: (radii, context) => {
    if (context.style === "lyra") {
      return radii.filter((radius) => radius.name === "none")
    }

    return radii
  },
}

export function applyBias<T>(
  items: readonly T[],
  context: RandomizeContext,
  biasFilter?: BiasFilter<T>
): readonly T[] {
  if (!biasFilter) {
    return items
  }

  return biasFilter(items, context)
}
