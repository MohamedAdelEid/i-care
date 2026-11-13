import { Badge } from '@/presentation/components/ui/badge'
import { cn } from '@/presentation/utils'

interface StatusBadgeProps {
  value: string
  className?: string
}

const AI_VALUES = new Set(['ai_active', 'ai', 'handled_by_ai'])

export const StatusBadge = ({ value, className }: StatusBadgeProps) => {
  const isAi = AI_VALUES.has(value.toLowerCase())

  return (
    <Badge
      variant={isAi ? 'outline' : 'default'}
      className={cn(isAi && 'border-ai bg-ai-soft text-ai', className)}
    >
      {value}
    </Badge>
  )
}
