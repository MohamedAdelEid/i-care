import { Download } from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import type { OverviewDatePreset, OverviewDateRange } from '@/domain/entities'
import { notify } from '@/infrastructure/libs/toast/toast'
import { KitDateRangePicker, KitPageHeader } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { cn } from '@/presentation/utils'

type Exporter = (() => void) | null

type AnalyticsShellContextValue = {
  range: OverviewDateRange
  setRange: (range: OverviewDateRange) => void
  registerExporter: (fn: Exporter) => void
}

const AnalyticsShellContext = createContext<AnalyticsShellContextValue | null>(null)

// eslint-disable-next-line react-refresh/only-export-components -- shell context hook
export const useAnalyticsShell = () => {
  const ctx = useContext(AnalyticsShellContext)
  if (!ctx) throw new Error('useAnalyticsShell must be used within AnalyticsShell')
  return ctx
}

const TABS = [
  { to: ROUTES.ANALYTICS.PERFORMANCE, labelKey: 'tabPerformance' as const },
  { to: ROUTES.ANALYTICS.INSIGHTS, labelKey: 'tabInsights' as const },
  { to: ROUTES.ANALYTICS.UNANSWERED, labelKey: 'tabUnanswered' as const },
  { to: ROUTES.ANALYTICS.CSAT, labelKey: 'tabCsat' as const },
]

export const AnalyticsShell = () => {
  const { t } = useTranslation('analytics')
  const [range, setRange] = useState<OverviewDateRange>({ preset: '7d' })
  const [customOpen, setCustomOpen] = useState(false)
  const exporterRef = useRef<Exporter>(null)

  const registerExporter = useCallback((fn: Exporter) => {
    exporterRef.current = fn
  }, [])

  const setPreset = (preset: OverviewDatePreset) => {
    if (preset === 'custom') {
      setCustomOpen(true)
      setRange((prev) => ({ ...prev, preset: 'custom' }))
      return
    }
    setCustomOpen(false)
    setRange({ preset })
  }

  const onExport = () => {
    if (!exporterRef.current) {
      notify.error({ title: t('exportEmpty') })
      return
    }
    exporterRef.current()
    notify.success({ title: t('exportSuccess') })
  }

  const ctx = useMemo(
    () => ({ range, setRange, registerExporter }),
    [range, registerExporter],
  )

  const rangeActions = (
    <div className="flex flex-wrap items-center gap-2">
      {(
        [
          ['today', 'rangeToday'],
          ['7d', 'range7d'],
          ['30d', 'range30d'],
          ['custom', 'rangeCustom'],
        ] as const
      ).map(([preset, key]) => (
        <Button
          key={preset}
          type="button"
          size="sm"
          variant={range.preset === preset ? 'default' : 'outline'}
          onClick={() => setPreset(preset)}
        >
          {t(key)}
        </Button>
      ))}
      {customOpen || range.preset === 'custom' ? (
        <KitDateRangePicker
          from={range.from ? new Date(range.from) : undefined}
          to={range.to ? new Date(range.to) : undefined}
          onChange={({ from, to }) => {
            setRange({
              preset: 'custom',
              from: from?.toISOString(),
              to: to?.toISOString(),
            })
          }}
          className="h-8"
        />
      ) : null}
      <Button type="button" size="sm" variant="outline" onClick={onExport}>
        <Download className="size-3.5" aria-hidden />
        {t('export')}
      </Button>
    </div>
  )

  return (
    <AnalyticsShellContext.Provider value={ctx}>
      <div className="space-y-5 p-6">
        <KitPageHeader
          title={t('shellTitle')}
          description={t('shellDescription')}
          primaryActions={rangeActions}
        />
        <nav className="flex flex-wrap gap-2" aria-label={t('tabsLabel')}>
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full border px-3 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground',
                )
              }
            >
              {t(tab.labelKey)}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>
    </AnalyticsShellContext.Provider>
  )
}

/** Helper for tab pages that only need a typed children slot when not using Outlet. */
export type AnalyticsShellChildrenProps = { children?: ReactNode }
