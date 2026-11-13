import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/presentation/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { cn } from '@/presentation/utils'

const PAGE_SIZES = [10, 20, 50, 100] as const

const pageRange = (current: number, total: number): (number | 'ellipsis')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i)

  const pages: (number | 'ellipsis')[] = [0]
  const start = Math.max(1, current - 1)
  const end = Math.min(total - 2, current + 1)

  if (start > 1) pages.push('ellipsis')
  for (let i = start; i <= end; i += 1) pages.push(i)
  if (end < total - 2) pages.push('ellipsis')
  if (total > 1) pages.push(total - 1)

  return pages
}

export interface KitDataTablePaginationProps {
  pageIndex: number
  pageSize: number
  totalRows: number
  onPageChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
  className?: string
}

export const KitDataTablePagination = ({
  pageIndex,
  pageSize,
  totalRows,
  onPageChange,
  onPageSizeChange,
  className,
}: KitDataTablePaginationProps) => {
  const { t } = useTranslation('kit')
  const pageCount = Math.max(1, Math.ceil(totalRows / pageSize))
  const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const to = Math.min(totalRows, (pageIndex + 1) * pageSize)

  return (
    <div
      className={cn(
        'flex flex-col gap-3 border-t border-border px-3 py-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <p className="text-sm text-muted-foreground tabular-nums">
        {t('showing', { from, to, total: totalRows })}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline" size="sm" className="tabular-nums">
              {pageSize} / {t('rowsPerPage')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {PAGE_SIZES.map((size) => (
              <DropdownMenuItem key={size} onClick={() => onPageSizeChange(size)}>
                {size}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={pageIndex <= 0}
          onClick={() => onPageChange(pageIndex - 1)}
          aria-label={t('previous')}
        >
          <ChevronLeft className="size-4" />
        </Button>
        {pageRange(pageIndex, pageCount).map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`e-${index}`} className="px-1 text-muted-foreground">
              …
            </span>
          ) : (
            <Button
              key={page}
              type="button"
              variant={page === pageIndex ? 'default' : 'outline'}
              size="sm"
              className="min-w-8 tabular-nums"
              onClick={() => onPageChange(page)}
              aria-label={t('page', { page: page + 1 })}
            >
              {page + 1}
            </Button>
          ),
        )}
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={pageIndex >= pageCount - 1}
          onClick={() => onPageChange(pageIndex + 1)}
          aria-label={t('next')}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
