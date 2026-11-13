import { cn } from '@/presentation/utils'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { KitAvatar, type KitAvatarProps } from './avatar'

export type KitAvatarGroupItem = Pick<KitAvatarProps, 'name' | 'src' | 'online'>

export interface KitAvatarGroupProps {
  items: KitAvatarGroupItem[]
  max?: number
  size?: KitAvatarProps['size']
  className?: string
}

export const KitAvatarGroup = ({ items, max = 4, size = 'sm', className }: KitAvatarGroupProps) => {
  const { t } = useTranslation('kit')
  const visible = items.slice(0, max)
  const overflow = items.length - visible.length

  return (
    <span className={cn('inline-flex items-center', className)}>
      {visible.map((item, index) => (
        <KitAvatar
          key={`${item.name}-${index}`}
          {...item}
          size={size}
          className={cn(index > 0 && '-ms-2')}
        />
      ))}
      {overflow > 0 ? (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background',
            size === 'sm' && 'size-7 -ms-2',
            size === 'md' && 'size-9 -ms-2',
            size === 'lg' && 'size-11 -ms-2',
          )}
        >
          {t('overflowAvatars', { count: overflow })}
        </span>
      ) : null}
    </span>
  )
}
