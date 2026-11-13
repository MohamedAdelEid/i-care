import { Bookmark, Trash2 } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'
import { cn } from '@/presentation/utils'
import { useTranslation } from '@/presentation/hooks/use-translation'

export interface KitSavedView {
  id: string
  name: string
}

export interface KitSavedViewsProps {
  views: KitSavedView[]
  activeViewId?: string
  onSelect?: (id: string) => void
  onSave?: () => void
  onDelete?: (id: string) => void
  className?: string
}

export const KitSavedViews = ({
  views,
  activeViewId,
  onSelect,
  onSave,
  onDelete,
  className,
}: KitSavedViewsProps) => {
  const { t } = useTranslation('kit')
  const active = views.find((v) => v.id === activeViewId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm" className={cn('gap-2', className)}>
          <Bookmark className="size-4" />
          <span className="max-w-[8rem] truncate">{active?.name ?? t('savedViews')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        {views.map((view) => (
          <DropdownMenuItem key={view.id} onClick={() => onSelect?.(view.id)}>
            <span className={cn(view.id === activeViewId && 'font-medium text-primary')}>
              {view.name}
            </span>
          </DropdownMenuItem>
        ))}
        {views.length > 0 ? <DropdownMenuSeparator /> : null}
        {onSave ? (
          <DropdownMenuItem onClick={onSave}>{t('saveView')}</DropdownMenuItem>
        ) : null}
        {activeViewId && onDelete ? (
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete(activeViewId)}
            className="gap-2"
          >
            <Trash2 className="size-4" />
            {t('deleteView')}
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
