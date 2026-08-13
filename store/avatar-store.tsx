"use client"

import { ChannelTypeEnum, getChannelIcon } from "@/constants/channels"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ChannelAvatarProps = {
  type: ChannelTypeEnum
  color: string
  profileImage?: string | null
  name?: string | null
  size?: "sm" | "md"
  className?: string
}

const ChannelAvatar = ({
  type,
  color,
  profileImage,
  name,
  size = "md",
  className = "inline-flex items-center gap-2",
}: ChannelAvatarProps) => {
  const icon = getChannelIcon(type)

  return (
    <div className={cn(className)}>
      <Avatar className={cn(size === "sm" ? "size-8" : "size-10", "border")}>
        <AvatarFallback>LM</AvatarFallback>
        <AvatarImage
          src={profileImage || "./images/avatar.webp"}
          className="rounded-xl!"
        />
        {icon ? (
          <div
            className={cn(
              "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center",
              "right-0.75 bottom-0.75 rounded-sm bg-white p-px ring-0",
              size === "sm" ? "size-3.75" : "size-5"
            )}
          >
            <span
              className="flex size-full items-center justify-center rounded-sm p-1!"
              style={{ backgroundColor: color }}
            >
              <HugeiconsIcon
                icon={icon}
                className={cn("size-2.5! text-white!")}
              />
            </span>
          </div>
        ) : null}
      </Avatar>

      {name ? (
        <span className="truncate text-[14.0px] font-medium">{name}</span>
      ) : null}
    </div>
  )
}

export default ChannelAvatar
