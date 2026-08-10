import { IconTile } from "@/registry-neui/bases/radix/neui/icon-tile"

import { IconPlaceholder } from "@/app/(create)/components/icon-placeholder"

const variants = ["outline", "elevated", "soft", "solid", "frame"] as const

export default function Pattern() {
  return (
    <div className="flex items-center justify-center gap-4">
      {variants.map((variant) => (
        <IconTile key={variant} variant={variant} aria-hidden="true">
          <IconPlaceholder
            lucide="PackageIcon"
            tabler="IconPackage"
            hugeicons="Package01Icon"
            phosphor="PackageIcon"
            remixicon="RiBox3Line"
          />
        </IconTile>
      ))}
    </div>
  )
}

