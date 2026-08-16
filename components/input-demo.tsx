"use client"

import { useState } from "react"
import { CheckIcon, CommandIcon, CopyIcon } from "lucide-react"

export default function InputDemo() {
  const [value, setValue] = useState("")
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("npx shadcn@latest add https://neui.io/")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-3 py-4">
      <div className="bg-site-muted/40 border-site-border flex items-center gap-2 rounded-lg border px-3 py-2.5">
        <CommandIcon className="text-site-muted-foreground size-4 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="npm install @neui/components"
          className="text-site-foreground placeholder:text-site-muted-foreground/50 flex-1 bg-transparent text-sm outline-none"
        />
        <kbd className="text-site-muted-foreground bg-site-muted border-site-border site-rounded hidden items-center gap-0.5 border px-1.5 text-[10px] font-medium sm:flex">
          <span>⌘</span>
          <span>K</span>
        </kbd>
      </div>
      <button
        onClick={handleCopy}
        className="hover:bg-site-muted/60 border-site-border/60 text-site-muted-foreground hover:text-site-foreground flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors"
      >
        {copied ? (
          <>
            <CheckIcon className="size-3.5 text-emerald-500" />
            Copied to clipboard
          </>
        ) : (
          <>
            <CopyIcon className="size-3.5" />
            Copy CLI command
          </>
        )}
      </button>
    </div>
  )
}
