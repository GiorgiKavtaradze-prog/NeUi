import { PhoneInput } from "@/registry-neui/bases/base/neui/phone-input"

export default function Pattern() {
  return (
    <PhoneInput
      variant="sm"
      placeholder="Enter phone number"
      defaultCountry="NL"
      value="+31612345678"
    />
  )
}

