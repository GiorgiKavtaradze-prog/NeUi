"use client"

import { KEYBOARD_SHORTCUTS } from "@/constants/demo-content"

export default function KbdDemo() {
  return (
    <div className="flex flex-col gap-2 py-4">
      {KEYBOARD_SHORTCUTS.map((shortcut) => (
        <div
          key={shortcut.label}
          className="flex items-center justify-between px-3 py-2"
        >
          <span className="text-site-foreground/80 text-sm">
            {shortcut.label}
          </span>
          <div className="flex items-center gap-1">
            {shortcut.keys.map((key, i) => (
              <span
                key={i}
                className="bg-site-muted border-site-border text-site-foreground/80 site-rounded-md inline-flex min-w-6 items-center justify-center border px-1.5 py-0.5 text-[11px] font-medium shadow-xs"
              >
                {key}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
