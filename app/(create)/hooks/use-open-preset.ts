"use client"

import * as React from "react"
import { atom, useAtom } from "jotai"

const openPresetOpenAtom = atom(false)

export const OPEN_PRESET_FORWARD_TYPE = "open-preset-forward"

function isEditableTarget(target: EventTarget | null) {
  return (
    (target instanceof HTMLElement && target.isContentEditable) ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  )
}

export function useOpenPreset() {
  const [open, setOpen] = useAtom(openPresetOpenAtom)

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen)
    },
    [setOpen]
  )

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        e.key === "o" &&
        !e.shiftKey &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        if (isEditableTarget(e.target)) return
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [setOpen])

  return {
    open,
    setOpen: handleOpenChange,
  }
}

export function useOpenPresetTrigger() {
  const [, setOpen] = useAtom(openPresetOpenAtom)

  const openPreset = React.useCallback(() => {
    setOpen(true)
  }, [setOpen])

  return { openPreset }
}
