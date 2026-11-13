import { useMemo } from 'react'
import type { LucideIcon } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { adminNavigationConfig } from '@/presentation/navigation/config/admin.config'
import { findNavItemByPath } from '@/presentation/navigation/helpers'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { useBreadcrumbStore } from '@/presentation/store/breadcrumb.store'

export interface BreadcrumbEntry {
  id: string
  label: string
  href?: string
  icon?: LucideIcon
}

export const useBreadcrumbs = (): BreadcrumbEntry[] => {
  const { pathname } = useLocation()
  const { t } = useTranslation('navigation')
  const dynamicLabel = useBreadcrumbStore((state) => state.dynamicLabel)

  return useMemo(() => {
    const match = findNavItemByPath(adminNavigationConfig, pathname)
    if (!match) return [{ id: 'overview', label: t('overview'), href: '/overview' }]

    const crumbs: BreadcrumbEntry[] = []
    if (match.group?.titleKey) {
      crumbs.push({ id: `group-${match.group.titleKey}`, label: t(match.group.titleKey) })
    }
    if (match.parent?.titleKey) {
      crumbs.push({
        id: `parent-${match.parent.titleKey}`,
        label: t(match.parent.titleKey),
        href: match.parent.href,
        icon: match.parent.icon,
      })
    }
    crumbs.push({
      id: `item-${match.item.titleKey}`,
      label: dynamicLabel ?? t(match.item.titleKey),
      href: match.item.href,
      icon: match.item.icon,
    })
    return crumbs
  }, [dynamicLabel, pathname, t])
}
