import { KitAvatar } from '@/presentation/components/kit/avatar'

export interface KitAvatarCellProps {
  name: string
  src?: string
  subtitle?: string
  online?: boolean
}

export const KitAvatarCell = ({ name, src, subtitle, online }: KitAvatarCellProps) => (
  <div className="flex items-center gap-2.5">
    <KitAvatar name={name} src={src} size="sm" online={online} />
    <div className="min-w-0">
      <p className="truncate text-sm font-medium text-foreground">{name}</p>
      {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
    </div>
  </div>
)
