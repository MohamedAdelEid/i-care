import { Columns3, Download, Rows3 } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Table } from '@tanstack/react-table'

import { KitFilterChip } from '@/presentation/components/kit/filters'
import { KitSavedViews } from '@/presentation/components/kit/filters'
import { Button } from '@/presentation/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'
import { SearchInput } from '@/presentation/components/ui/search-input'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { cn } from '@/presentation/utils'

import type { KitTableDensity, KitTableFilterConfig } from './types'
import type { KitSavedView } from '@/presentation/components/kit/filters'

export interface KitDataTableToolbarProps<T> {
  table: Table<T>
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  filters?: KitTableFilterConfig[]
  filterChips?: React.ComponentProps<typeof KitFilterChip>[]
  enableExport?: boolean
  onExport?: () => void
  density?: KitTableDensity
  onDensityChange?: (density: KitTableDensity) => void
  savedViews?: KitSavedView[]
  activeSavedViewId?: string
  onSavedViewSelect?: (id: string) => void
  onSavedViewSave?: () => void
  onSavedViewDelete?: (id: string) => void
  dateRangeSlot?: ReactNode
  extra?: ReactNode
  className?: string
}

export const KitDataTableToolbar = <T,>({
  table,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filters,
  filterChips,
  enableExport,
  onExport,
  density = 'comfortable',
  onDensityChange,
  savedViews,
  activeSavedViewId,
  onSavedViewSelect,
  onSavedViewSave,
  onSavedViewDelete,
  dateRangeSlot,
  extra,
  className,
}: KitDataTableToolbarProps<T>) => {
  const { t } = useTranslation('kit')
  const searchRef = useRef<HTMLInputElement>(null)
  const [localSearch, setLocalSearch] = useState(searchValue)

  useEffect(() => {
    setLocalSearch(searchValue)
  }, [searchValue])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => onSearchChange(localSearch), 300)
    return () => window.clearTimeout(id)
  }, [localSearch, onSearchChange])

  return (
    <div className={cn('flex flex-col gap-3 border-b border-border p-3', className)}>
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <SearchInput
          ref={searchRef}
          value={localSearch}
          onValueChange={setLocalSearch}
          placeholder={searchPlaceholder ?? t('searchPlaceholder')}
          showShortcut
          containerClassName="w-full lg:max-w-sm"
        />
        <div className="flex flex-wrap items-center gap-2 lg:ms-auto">
          {filters?.map((filter) => (
            <DropdownMenu key={filter.id}>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  {filter.label}
                  {filter.value ? `: ${filter.options.find((o) => o.value === filter.value)?.label}` : ''}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => filter.onChange?.(undefined)}>
                  —
                </DropdownMenuItem>
                {filter.options.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => filter.onChange?.(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          {dateRangeSlot}
          {savedViews?.length || onSavedViewSave ? (
            <KitSavedViews
              views={savedViews ?? []}
              activeViewId={activeSavedViewId}
              onSelect={onSavedViewSelect}
              onSave={onSavedViewSave}
              onDelete={onSavedViewDelete}
            />
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="sm" className="gap-2">
                <Columns3 className="size-4" />
                {t('columns')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="outline" size="sm" className="gap-2">
                <Rows3 className="size-4" />
                {t('density')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('density')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(
                [
                  ['compact', t('densityCompact')],
                  ['comfortable', t('densityComfortable')],
                  ['spacious', t('densitySpacious')],
                ] as const
              ).map(([id, label]) => (
                <DropdownMenuItem key={id} onClick={() => onDensityChange?.(id)}>
                  <span className={density === id ? 'font-medium text-primary' : undefined}>
                    {label}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {enableExport ? (
            <Button type="button" variant="outline" size="sm" className="gap-2" onClick={onExport}>
              <Download className="size-4" />
              {t('export')}
            </Button>
          ) : null}
          {extra}
        </div>
      </div>
      {filterChips?.length ? (
        <div className="flex flex-wrap gap-2">
          {filterChips.map((chip, index) => (
            <KitFilterChip key={`${chip.label}-${index}`} {...chip} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
