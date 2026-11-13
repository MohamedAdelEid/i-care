import type { LucideIcon } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import type { ReactNode } from 'react'

import type { KitSavedView } from '@/presentation/components/kit/filters'
import type { KitFilterChipProps } from '@/presentation/components/kit/filters'

export type KitTableDensity = 'compact' | 'comfortable' | 'spacious'

export type KitTableTab = {
  id: string
  label: string
  count?: number
}

export type KitTableFilterOption = {
  label: string
  value: string
}

export type KitTableFilterConfig = {
  id: string
  label: string
  options: KitTableFilterOption[]
  value?: string
  onChange?: (value: string | undefined) => void
}

export type KitBulkAction<T> = {
  id: string
  label: string
  icon?: LucideIcon
  variant?: 'default' | 'destructive'
  onAction: (rows: T[], ids: string[]) => void | Promise<void>
}

export type KitRowAction<T = unknown> = {
  id: string
  label: string
  icon?: LucideIcon
  variant?: 'default' | 'destructive'
  onAction: (row: T) => void
}

export type KitDataTableProps<T> = {
  columns: ColumnDef<T, unknown>[]
  data: T[]
  getRowId?: (row: T) => string
  searchPlaceholder?: string
  filters?: KitTableFilterConfig[]
  filterChips?: KitFilterChipProps[]
  tabs?: KitTableTab[]
  activeTabId?: string
  onTabChange?: (tabId: string) => void
  getTabPredicate?: (row: T, tabId: string) => boolean
  bulkActions?: KitBulkAction<T>[]
  rowActions?: (row: T) => KitRowAction<T>[]
  onRowClick?: (row: T) => void
  density?: KitTableDensity
  onDensityChange?: (density: KitTableDensity) => void
  enableExport?: boolean
  urlStateKey?: string
  isLoading?: boolean
  error?: Error | null
  onRetry?: () => void
  emptyMessage?: string
  noResultsMessage?: string
  onClearFilters?: () => void
  renderMobileCard?: (row: T) => ReactNode
  savedViews?: KitSavedView[]
  activeSavedViewId?: string
  onSavedViewSelect?: (id: string) => void
  onSavedViewSave?: () => void
  onSavedViewDelete?: (id: string) => void
  dateRangeSlot?: ReactNode
  /** Hide search/filter toolbar (compact embedded tables). */
  hideToolbar?: boolean
  /** Hide pagination footer. */
  hidePagination?: boolean
  className?: string
}
