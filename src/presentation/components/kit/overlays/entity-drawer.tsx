import type { ReactNode } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/presentation/components/ui/sheet'
import { useDirection } from '@/presentation/hooks/use-direction'
import { cn } from '@/presentation/utils'

export interface KitEntityDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  side?: 'start' | 'end'
  className?: string
}

export const KitEntityDrawer = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  side,
  className,
}: KitEntityDrawerProps) => {
  const { isRtl } = useDirection()
  const resolvedSide =
    side === 'start'
      ? isRtl
        ? 'right'
        : 'left'
      : side === 'end'
        ? isRtl
          ? 'left'
          : 'right'
        : isRtl
          ? 'left'
          : 'right'

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={resolvedSide} className={cn('w-full sm:max-w-md', className)}>
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle>{title}</SheetTitle>
          {description ? <SheetDescription>{description}</SheetDescription> : null}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
