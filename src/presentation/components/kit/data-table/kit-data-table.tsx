import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type VisibilityState,
} from '@tanstack/react-table'
import { AlertCircle, MoreHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { KitEmptyState } from '@/presentation/components/kit/feedback'
import { KitTableSkeleton } from '@/presentation/components/kit/feedback'
import { Button } from '@/presentation/components/ui/button'
import { Checkbox } from '@/presentation/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { cn } from '@/presentation/utils'

import { exportVisibleRowsToCsv } from './export-csv'
import { KitDataTableBulkBar } from './kit-data-table-bulk-bar'
import { KitDataTablePagination } from './kit-data-table-pagination'
import { KitDataTableTabs } from './kit-data-table-tabs'
import { KitDataTableToolbar } from './kit-data-table-toolbar'
import type { KitDataTableProps, KitTableDensity } from './types'
import { useKitTableUrlState } from './use-kit-table-url-state'

const densityCellClass: Record<KitTableDensity, string> = {
  compact: 'py-1.5',
  comfortable: 'py-2.5',
  spacious: 'py-4',
}

export const KitDataTable = <T,>({
  columns,
  data,
  getRowId,
  searchPlaceholder,
  filters,
  filterChips,
  tabs,
  activeTabId,
  onTabChange,
  getTabPredicate,
  bulkActions,
  rowActions,
  onRowClick,
  density: densityProp,
  onDensityChange,
  enableExport,
  urlStateKey = 'kit',
  isLoading,
  error,
  onRetry,
  emptyMessage,
  noResultsMessage,
  onClearFilters,
  renderMobileCard,
  savedViews,
  activeSavedViewId,
  onSavedViewSelect,
  onSavedViewSave,
  onSavedViewDelete,
  dateRangeSlot,
  hideToolbar,
  hidePagination,
  className,
}: KitDataTableProps<T>) => {
  const { t } = useTranslation('kit')
  const url = useKitTableUrlState(urlStateKey)
  const [density, setDensity] = useState<KitTableDensity>(densityProp ?? 'comfortable')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState(url.search)

  useEffect(() => {
    if (globalFilter !== url.search) url.setSearch(globalFilter)
  }, [globalFilter, url])

  const activeTab = activeTabId ?? url.tab ?? tabs?.[0]?.id

  const filteredData = useMemo(() => {
    let rows = data
    if (tabs?.length && activeTab && getTabPredicate) {
      rows = rows.filter((row) => getTabPredicate(row, activeTab))
    }
    return rows
  }, [data, tabs, activeTab, getTabPredicate])

  const selectionColumn: ColumnDef<T, unknown> = {
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    header: ({ table: tbl }) => (
      <Checkbox
        checked={
          tbl.getIsAllPageRowsSelected() || (tbl.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => tbl.toggleAllPageRowsSelected(!!value)}
        aria-label={t('selectAll')}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={t('selectRow')}
      />
    ),
  }

  const actionsColumn: ColumnDef<T, unknown> = {
    id: 'actions',
    enableSorting: false,
    enableHiding: false,
    header: () => null,
    cell: ({ row }) => {
      const actions = rowActions?.(row.original) ?? []
      if (!actions.length) return null
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="opacity-0 group-hover/row:opacity-100 data-[state=open]:opacity-100"
              onClick={(event) => event.stopPropagation()}
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(event) => event.stopPropagation()}>
            {actions.map((action) => {
              const Icon = action.icon
              return (
                <DropdownMenuItem
                  key={action.id}
                  variant={action.variant}
                  onClick={() => action.onAction(row.original)}
                >
                  {Icon ? <Icon className="size-4" /> : null}
                  {action.label}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }

  const tableColumns = useMemo(() => {
    const cols = [...columns]
    if (bulkActions?.length) cols.unshift(selectionColumn)
    if (rowActions) cols.push(actionsColumn)
    return cols
    // eslint-disable-next-line react-hooks/exhaustive-deps -- columns identity is caller-owned
  }, [columns, bulkActions?.length, !!rowActions])

  const table = useReactTable({
    data: filteredData,
    columns: tableColumns,
    state: {
      sorting: url.sorting,
      pagination: url.pagination,
      rowSelection,
      columnVisibility,
      globalFilter,
    },
    enableRowSelection: Boolean(bulkActions?.length),
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(url.sorting) : updater
      url.setSorting(next)
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater(url.pagination) : updater
      url.setPagination(next)
    },
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const needle = String(filterValue).toLowerCase()
      if (!needle) return true
      return Object.values(row.original as Record<string, unknown>).some((value) =>
        String(value ?? '')
          .toLowerCase()
          .includes(needle),
      )
    },
    getRowId,
  })

  const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original)
  const selectedIds = table.getSelectedRowModel().rows.map((row) => row.id)

  const handleExport = () => {
    const visibleColumns = table
      .getAllColumns()
      .filter((col) => col.getIsVisible() && col.id !== 'select' && col.id !== 'actions')
    const headers = visibleColumns.map((col) => col.id)
    const rows = table.getFilteredRowModel().rows.map((row) => row.original)
    exportVisibleRowsToCsv(headers, rows, (row) =>
      visibleColumns.map((col) => {
        const cell = row as Record<string, unknown>
        return cell[col.id] as string | number | null | undefined
      }),
    )
  }

  const handleDensity = (next: KitTableDensity) => {
    setDensity(next)
    onDensityChange?.(next)
  }

  const handleTab = (id: string) => {
    onTabChange?.(id)
    url.setTab(id)
    table.setPageIndex(0)
  }

  const rows = table.getRowModel().rows
  const totalRows = table.getFilteredRowModel().rows.length
  const noResults = !isLoading && !error && totalRows === 0 && (globalFilter || filterChips?.length)
  const empty = !isLoading && !error && totalRows === 0 && !noResults

  return (
    <div className={cn('rounded-card border border-border bg-card shadow-elevation-sm', className)}>
      {tabs?.length ? (
        <KitDataTableTabs tabs={tabs} activeId={activeTab} onChange={handleTab} />
      ) : null}
      {!hideToolbar ? (
        <KitDataTableToolbar
          table={table}
          searchValue={globalFilter}
          onSearchChange={setGlobalFilter}
          searchPlaceholder={searchPlaceholder}
          filters={filters}
          filterChips={filterChips}
          enableExport={enableExport}
          onExport={handleExport}
          density={densityProp ?? density}
          onDensityChange={handleDensity}
          savedViews={savedViews}
          activeSavedViewId={activeSavedViewId}
          onSavedViewSelect={onSavedViewSelect}
          onSavedViewSave={onSavedViewSave}
          onSavedViewDelete={onSavedViewDelete}
          dateRangeSlot={dateRangeSlot}
        />
      ) : null}

      {isLoading ? (
        <div className="p-3">
          <KitTableSkeleton />
        </div>
      ) : error ? (
        <KitEmptyState
          title={error.message}
          illustration={<AlertCircle className="size-10 text-destructive" />}
          action={
            onRetry ? (
              <Button type="button" onClick={onRetry}>
                {t('retry')}
              </Button>
            ) : undefined
          }
          className="m-3 border-none bg-transparent"
        />
      ) : empty ? (
        <KitEmptyState
          title={emptyMessage ?? t('empty')}
          className="m-3 border-none bg-transparent"
        />
      ) : noResults ? (
        <KitEmptyState
          title={noResultsMessage ?? t('noResults')}
          action={
            onClearFilters ? (
              <Button type="button" variant="outline" onClick={onClearFilters}>
                {t('clearFilters')}
              </Button>
            ) : undefined
          }
          className="m-3 border-none bg-transparent"
        />
      ) : (
        <>
          {renderMobileCard ? (
            <div className="flex flex-col gap-2 p-3 md:hidden">
              {rows.map((row) => (
                <div
                  key={row.id}
                  role={onRowClick ? 'button' : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  className={cn(
                    'rounded-card border border-border p-3',
                    onRowClick && 'cursor-pointer hover:bg-muted/30',
                  )}
                  onClick={() => onRowClick?.(row.original)}
                  onKeyDown={(event) => {
                    if (onRowClick && (event.key === 'Enter' || event.key === ' ')) {
                      event.preventDefault()
                      onRowClick(row.original)
                    }
                  }}
                >
                  {renderMobileCard(row.original)}
                </div>
              ))}
            </div>
          ) : null}
          <div className={cn(renderMobileCard && 'hidden md:block')}>
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="bg-card">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                    className={cn(
                      'group/row tabular-nums',
                      onRowClick && 'cursor-pointer',
                    )}
                    onClick={(event) => {
                      const target = event.target as HTMLElement
                      if (
                        target.closest(
                          'button, a, input, [data-slot=checkbox], [role=menuitem], label',
                        )
                      ) {
                        return
                      }
                      onRowClick?.(row.original)
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={densityCellClass[densityProp ?? density]}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {!hidePagination && !isLoading && !error && totalRows > 0 ? (
        <KitDataTablePagination
          pageIndex={url.pagination.pageIndex}
          pageSize={url.pagination.pageSize}
          totalRows={totalRows}
          onPageChange={(pageIndex) => table.setPageIndex(pageIndex)}
          onPageSizeChange={(pageSize) => table.setPageSize(pageSize)}
        />
      ) : null}

      {bulkActions?.length ? (
        <KitDataTableBulkBar
          count={selectedIds.length}
          actions={bulkActions}
          rows={selectedRows}
          ids={selectedIds}
          onClear={() => table.resetRowSelection()}
        />
      ) : null}
    </div>
  )
}
