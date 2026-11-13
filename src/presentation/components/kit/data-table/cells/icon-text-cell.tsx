import type { LucideIcon } from 'lucide-react'

import { cn } from '@/presentation/utils'

export interface KitIconTextCellProps {
  icon: LucideIcon
  label: string
  muted?: boolean
  className?: string
}

export const KitIconTextCell = ({ icon: Icon, label, muted, className }: KitIconTextCellProps) => (
  <span className={cn('inline-flex items-center gap-2 text-sm', className)}>
    <Icon className={cn('size-4 shrink-0', muted ? 'text-muted-foreground' : 'text-foreground')} />
    <span className={cn('truncate', muted && 'text-muted-foreground')}>{label}</span>
  </span>
)
