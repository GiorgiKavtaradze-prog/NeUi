import { Badge } from "@/registry-neui/bases/radix/neui/badge"

import { Button } from "@/registry/bases/radix/ui/button"

export default function Pattern() {
  return (
    <Button variant="outline" className="gap-2" aria-label="Messages (12)">
      Messages
      <Badge variant="destructive-outline" size="sm" aria-hidden="true">
        12
      </Badge>
    </Button>
  )
}

