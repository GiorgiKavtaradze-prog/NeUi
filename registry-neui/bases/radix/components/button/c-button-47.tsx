import { Badge } from "@/registry-neui/bases/radix/neui/badge"

import { Button } from "@/registry/bases/radix/ui/button"

export default function Pattern() {
  return (
    <Button aria-label="Updates (new)">
      Updates
      <Badge variant="success" size="xs" aria-hidden="true">
        New
      </Badge>
    </Button>
  )
}

