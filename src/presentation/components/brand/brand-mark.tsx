import { cn } from '@/presentation/utils'
import { useThemeStore } from '@/presentation/store'
import { resolveTheme } from '@/infrastructure/libs/theme/theme'
import { useTranslation } from '@/presentation/hooks/use-translation'

interface BrandMarkProps {
  variant?: 'logo' | 'icon' | 'lockup'
  className?: string
  showTagline?: boolean
}

export const BrandMark = ({
  variant = 'lockup',
  className,
  showTagline = true,
}: BrandMarkProps) => {
  const { t } = useTranslation('common')
  const theme = useThemeStore((state) => state.theme)
  const resolved = resolveTheme(theme)
  const logoSrc = resolved === 'dark' ? '/brand/logo-dark.png' : '/brand/logo-light.png'
  const iconSrc = '/brand/icon.png'

  if (variant === 'icon') {
    return (
      <img src={iconSrc} alt={t('brandName')} className={cn('size-8 object-contain', className)} />
    )
  }

  if (variant === 'logo') {
    return (
      <img
        src={logoSrc}
        alt={`${t('brandName')} — ${t('brandTagline')}`}
        className={cn('h-10 w-auto max-w-64 object-contain object-left', className)}
      />
    )
  }

  return (
    <div className={cn('flex min-w-0 items-center gap-2.5', className)}>
      <img src={iconSrc} alt="" className="size-9 shrink-0 object-contain" />
      <div className="min-w-0 leading-tight">
        <p className="truncate text-sm font-semibold tracking-tight text-foreground">{t('brandName')}</p>
        {showTagline ? (
          <p className="truncate text-xs text-muted-foreground">{t('brandTagline')}</p>
        ) : null}
      </div>
    </div>
  )
}
