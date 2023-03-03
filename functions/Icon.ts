import { IconType } from "react-icons";

// With this function, You can set icon color and size once (if you use .map, for example)
export const Icon = (iconType: IconType, arg?: { color?: string, size?: number }) =>
  iconType({ color: arg?.color ?? undefined, size: arg?.size ?? undefined })

export const IconColor = (iconType: IconType, arg?: { size?: number }) => (color: string) =>
  iconType({ color: color, size: arg?.size ?? undefined })