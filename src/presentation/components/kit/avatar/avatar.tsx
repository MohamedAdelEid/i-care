import { cn } from '@/presentation/utils'
import { useTranslation } from '@/presentation/hooks/use-translation'

import { avatarColorFromName, initialsFromName } from './avatar-utils'

export type KitAvatarSize = 'sm' | 'md' | 'lg'

const sizeClass: Record<KitAvatarSize, string> = {
  sm: 'size-7 text-[10px]',
  md: 'size-9 text-xs',
  lg: 'size-11 text-sm',
}

export interface KitAvatarProps {
  name: string
  src?: string
  size?: KitAvatarSize
  online?: boolean
  className?: string
}

export const KitAvatar = ({ name, src, size = 'md', online, className }: KitAvatarProps) => {
  const { t } = useTranslation('kit')
  const initials = initialsFromName(name)

  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center overflow-hidden rounded-full font-medium text-white ring-2 ring-background',
          sizeClass[size],
        )}
        style={src ? undefined : { backgroundColor: avatarColorFromName(name) }}
      >
        {src ? (
          <img src={src} alt="" className="size-full object-cover" />
        ) : (
          <span aria-hidden>{initials}</span>
        )}
      </span>
      {online ? (
        <span
          className="absolute end-0 bottom-0 size-2.5 rounded-full border-2 border-background bg-success"
          title={t('online')}
          aria-label={t('online')}
        />
      ) : null}
    </span>
  )
}
