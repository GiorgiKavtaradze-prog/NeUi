import { PhoneInput } from "@/registry-neui/bases/base/neui/phone-input"

export default function Pattern() {
  return (
    <PhoneInput
      readOnly
      value="+12125551234"
      placeholder="Enter phone number"
    />
  )
}

