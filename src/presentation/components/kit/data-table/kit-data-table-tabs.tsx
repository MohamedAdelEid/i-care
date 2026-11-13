import { KitStatusBadge } from '@/presentation/components/kit/badges/status-badge'
import { cn } from '@/presentation/utils'

import type { KitTableTab } from './types'

export interface KitDataTableTabsProps {
  tabs: KitTableTab[]
  activeId?: string
  onChange?: (id: string) => void
  className?: string
}

export const KitDataTableTabs = ({ tabs, activeId, onChange, className }: KitDataTableTabsProps) => (
  <div className={cn('flex flex-wrap gap-2 border-b border-border px-3 py-2', className)} role="tablist">
    {tabs.map((tab) => {
      const active = tab.id === activeId
      return (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active}
          onClick={() => onChange?.(tab.id)}
          className={cn(
            'inline-flex items-center gap-2 rounded-control px-3 py-1.5 text-sm font-medium transition-colors',
            active
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
          )}
        >
          {tab.label}
          {tab.count != null ? (
            <KitStatusBadge
              tone={active ? 'info' : 'neutral'}
              variant="soft"
              label={String(tab.count)}
              className="px-1.5 py-0"
            />
          ) : null}
        </button>
      )
    })}
  </div>
)
