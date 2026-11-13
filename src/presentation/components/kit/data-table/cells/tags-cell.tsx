import { KitStatusBadge } from '@/presentation/components/kit/badges/status-badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/presentation/components/ui/tooltip'
import { useTranslation } from '@/presentation/hooks/use-translation'

export interface KitTagsCellProps {
  tags: string[]
  maxVisible?: number
}

export const KitTagsCell = ({ tags, maxVisible = 2 }: KitTagsCellProps) => {
  const { t } = useTranslation('kit')
  const visible = tags.slice(0, maxVisible)
  const hidden = tags.slice(maxVisible)

  return (
    <div className="flex flex-wrap items-center gap-1">
      {visible.map((tag) => (
        <KitStatusBadge key={tag} tone="neutral" variant="soft" label={tag} />
      ))}
      {hidden.length > 0 ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-default text-xs text-muted-foreground">
              {t('tagsMore', { count: hidden.length })}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-xs">{hidden.join(', ')}</p>
          </TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  )
}
