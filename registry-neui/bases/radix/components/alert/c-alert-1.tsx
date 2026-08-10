import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry-neui/bases/radix/neui/alert"

export default function Pattern() {
  return (
    <Alert>
      <AlertTitle>Alert!</AlertTitle>
      <AlertDescription>
        This is an alert with a title and description.
      </AlertDescription>
    </Alert>
  )
}

