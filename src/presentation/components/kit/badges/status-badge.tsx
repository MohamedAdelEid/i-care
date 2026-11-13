import type { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/presentation/utils'

export type KitStatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'ai'
export type KitStatusVariant = 'soft' | 'outline' | 'solid'
export type KitStatusPriority = 'urgent' | 'high' | 'medium' | 'low'

const statusBadgeVariants = cva(
  'inline-flex max-w-full items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        soft: '',
        outline: 'bg-transparent',
        solid: 'border-transparent text-white',
      },
      tone: {
        success: '',
        warning: '',
        danger: '',
        info: '',
        neutral: '',
        ai: '',
      },
    },
    compoundVariants: [
      { variant: 'soft', tone: 'success', className: 'border-success/25 bg-success/10 text-success' },
      { variant: 'soft', tone: 'warning', className: 'border-warning/25 bg-warning/10 text-warning' },
      { variant: 'soft', tone: 'danger', className: 'border-destructive/25 bg-destructive/10 text-destructive' },
      { variant: 'soft', tone: 'info', className: 'border-primary/25 bg-primary/10 text-primary' },
      { variant: 'soft', tone: 'neutral', className: 'border-border bg-muted text-muted-foreground' },
      { variant: 'soft', tone: 'ai', className: 'border-ai/30 bg-ai-soft text-ai' },
      { variant: 'outline', tone: 'success', className: 'border-success/40 text-success' },
      { variant: 'outline', tone: 'warning', className: 'border-warning/40 text-warning' },
      { variant: 'outline', tone: 'danger', className: 'border-destructive/40 text-destructive' },
      { variant: 'outline', tone: 'info', className: 'border-primary/40 text-primary' },
      { variant: 'outline', tone: 'neutral', className: 'border-border text-muted-foreground' },
      { variant: 'outline', tone: 'ai', className: 'border-ai/40 text-ai' },
      { variant: 'solid', tone: 'success', className: 'bg-success' },
      { variant: 'solid', tone: 'warning', className: 'bg-warning text-foreground' },
      { variant: 'solid', tone: 'danger', className: 'bg-destructive' },
      { variant: 'solid', tone: 'info', className: 'bg-primary' },
      { variant: 'solid', tone: 'neutral', className: 'bg-muted-foreground' },
      { variant: 'solid', tone: 'ai', className: 'bg-ai' },
    ],
    defaultVariants: {
      variant: 'soft',
      tone: 'neutral',
    },
  },
)

const priorityDotClass: Record<KitStatusPriority, string> = {
  urgent: 'bg-destructive',
  high: 'bg-warning',
  medium: 'bg-primary',
  low: 'bg-muted-foreground',
}

export interface KitStatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  label: string
  subLabel?: string
  tone?: KitStatusTone
  variant?: KitStatusVariant
  priority?: KitStatusPriority
  showDot?: boolean
  icon?: LucideIcon
  className?: string
}

export const KitStatusBadge = ({
  label,
  subLabel,
  tone = 'neutral',
  variant = 'soft',
  priority,
  showDot,
  icon: Icon,
  className,
}: KitStatusBadgeProps) => (
  <span className={cn(statusBadgeVariants({ variant, tone }), className)}>
    {(showDot || priority) && (
      <span
        className={cn(
          'size-1.5 shrink-0 rounded-full',
          priority ? priorityDotClass[priority] : 'bg-current opacity-70',
        )}
        aria-hidden
      />
    )}
    {Icon ? <Icon className="size-3 shrink-0 opacity-80" aria-hidden /> : null}
    <span className="truncate">{label}</span>
    {subLabel ? <span className="truncate font-normal opacity-75">· {subLabel}</span> : null}
  </span>
)
