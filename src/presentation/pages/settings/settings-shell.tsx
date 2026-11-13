import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import { notify } from '@/infrastructure/libs/toast/toast'
import { KitPageHeader } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { cn } from '@/presentation/utils'

type SaveFn = (() => Promise<void>) | null

type SettingsShellContextValue = {
  setDirty: (dirty: boolean) => void
  registerSave: (fn: SaveFn) => void
}

const SettingsShellContext = createContext<SettingsShellContextValue | null>(null)

// eslint-disable-next-line react-refresh/only-export-components -- shell context hook
export const useSettingsShell = () => {
  const ctx = useContext(SettingsShellContext)
  if (!ctx) throw new Error('useSettingsShell must be used within SettingsShell')
  return ctx
}

const NAV = [
  { to: ROUTES.SETTINGS.GENERAL, labelKey: 'navGeneral' as const },
  { to: ROUTES.SETTINGS.TEAM, labelKey: 'navTeam' as const },
  { to: ROUTES.SETTINGS.ROLES, labelKey: 'navRoles' as const },
  { to: ROUTES.SETTINGS.HOURS, labelKey: 'navHours' as const },
  { to: ROUTES.SETTINGS.NOTIFICATIONS, labelKey: 'navNotifications' as const },
  { to: ROUTES.SETTINGS.API, labelKey: 'navApi' as const },
]

export const SettingsShell = () => {
  const { t } = useTranslation('settings')
  const [dirty, setDirtyState] = useState(false)
  const [saving, setSaving] = useState(false)
  const saveRef = useRef<SaveFn>(null)

  const setDirty = useCallback((value: boolean) => {
    setDirtyState(value)
  }, [])

  const registerSave = useCallback((fn: SaveFn) => {
    saveRef.current = fn
  }, [])

  const onSave = async () => {
    if (!saveRef.current) return
    setSaving(true)
    try {
      await saveRef.current()
      setDirtyState(false)
      notify.success({ title: t('saved') })
    } finally {
      setSaving(false)
    }
  }

  const ctx = useMemo(() => ({ setDirty, registerSave }), [setDirty, registerSave])

  return (
    <SettingsShellContext.Provider value={ctx}>
      <div className="relative flex min-h-[calc(100vh-4rem)] flex-col gap-4 p-6 pb-24 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-52">
          <KitPageHeader title={t('shellTitle')} description={t('shellDescription')} />
          <nav className="mt-4 flex flex-row gap-1 overflow-x-auto lg:flex-col" aria-label={t('navLabel')}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm whitespace-nowrap transition-colors',
                    isActive
                      ? 'bg-muted font-medium text-foreground'
                      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                  )
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>

        {dirty ? (
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-card/80">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">{t('unsavedChanges')}</p>
              <Button type="button" size="sm" disabled={saving} onClick={() => void onSave()}>
                {saving ? t('saving') : t('saveChanges')}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </SettingsShellContext.Provider>
  )
}
