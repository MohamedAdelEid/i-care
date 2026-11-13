import { KitStatusBadge } from '@/presentation/components/kit/badges/status-badge'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { cn } from '@/presentation/utils'

export type KitSlaStatus = 'overdue' | 'due' | 'on_track'

export interface KitSlaTimerCellProps {
  status: KitSlaStatus
  label: string
  className?: string
}

const toneMap: Record<KitSlaStatus, 'danger' | 'warning' | 'success'> = {
  overdue: 'danger',
  due: 'warning',
  on_track: 'success',
}

export const KitSlaTimerCell = ({ status, label, className }: KitSlaTimerCellProps) => {
  const { t } = useTranslation('kit')
  const statusLabel =
    status === 'overdue' ? t('slaOverdue') : status === 'due' ? t('slaDue') : t('slaOnTrack')

  return (
    <span className={cn('inline-flex flex-col gap-0.5', className)}>
      <span className="text-sm font-medium tabular-nums text-foreground">{label}</span>
      <KitStatusBadge tone={toneMap[status]} variant="soft" label={statusLabel} showDot />
    </span>
  )
}
