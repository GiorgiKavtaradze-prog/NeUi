"use client"

import { THEME_SWATCHES } from "@/constants/demo-content"

export default function ThemeDemo() {
  return (
    <div className="flex flex-col gap-3 py-4">
      <div className="grid grid-cols-5 gap-2 px-3">
        {THEME_SWATCHES.map((theme) => (
          <div key={theme.name} className="flex flex-col items-center gap-2">
            <div className="flex -space-x-1">
              {theme.colors.map((color, i) => (
                <div
                  key={i}
                  className="dark:border-site-background size-5 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-site-muted-foreground text-[10px] font-medium">
              {theme.name}
            </span>
          </div>
        ))}
      </div>
      <p className="text-site-muted-foreground px-3 text-center text-[11px]">
        8 handcrafted themes included
      </p>
    </div>
  )
}
