import type { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  titleKey: string
  href?: string
  icon: LucideIcon
  badgeCount?: number
  children?: NavigationItem[]
}

export type NavigationPlacement = 'main' | 'footer'

export interface NavigationGroup {
  titleKey?: string
  placement?: NavigationPlacement
  items: NavigationItem[]
}
