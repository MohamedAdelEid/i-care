import { X } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import { cn } from '@/presentation/utils'
import { useTranslation } from '@/presentation/hooks/use-translation'

export interface KitFilterChipProps {
  label: string
  value?: string
  onRemove?: () => void
  className?: string
}

export const KitFilterChip = ({ label, value, onRemove, className }: KitFilterChipProps) => {
  const { t } = useTranslation('kit')

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 py-0.5 ps-2.5 text-xs font-medium text-foreground',
        onRemove ? 'pe-1' : 'pe-2.5',
        className,
      )}
    >
      <span className="text-muted-foreground">{label}</span>
      {value ? <span>{value}</span> : null}
      {onRemove ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="size-6 rounded-full"
          onClick={onRemove}
          aria-label={t('filterRemove')}
        >
          <X className="size-3" />
        </Button>
      ) : null}
    </span>
  )
}
