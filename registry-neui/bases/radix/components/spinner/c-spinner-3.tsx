import { Badge } from "@/registry-neui/bases/radix/neui/badge"

import { Spinner } from "@/registry/bases/radix/ui/spinner"

export default function Pattern() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Badge>
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Loading
      </Badge>
      <Badge variant="destructive-light">
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
      <Badge variant="success-light">
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="info-light">
        <Spinner data-icon="inline-start" />
        Loading
      </Badge>
    </div>
  )
}

