import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/presentation/components/ui/popover'
import { SearchInput } from '@/presentation/components/ui/search-input'
import { cn, ghostScrollClass } from '@/presentation/utils'

export interface MultiSearchableSelectOption {
  value: string
  label: string
}

export interface MultiSearchableSelectProps {
  values: string[]
  onChange: (values: string[]) => void
  options: MultiSearchableSelectOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  selectedCountLabel?: (count: number) => string
  clearLabel?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
  maxVisibleChips?: number
}

const triggerClassName = (invalid?: boolean, disabled?: boolean) =>
  cn(
    'flex min-h-[48px] w-full items-center justify-between gap-2 rounded-[10px] border border-border bg-background px-3 py-2 text-sm transition-[border-color,box-shadow] duration-200 outline-none',
    'focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_rgba(2,15,189,0.12)]',
    invalid &&
      'border-destructive focus-visible:border-destructive focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]',
    disabled && 'cursor-not-allowed border-border/80 bg-muted/40 text-muted-foreground',
  )

export const MultiSearchableSelect = ({
  values,
  onChange,
  options,
  placeholder = 'Select…',
  searchPlaceholder = 'Search…',
  emptyMessage = 'No results found.',
  selectedCountLabel = (count) => `${count} selected`,
  clearLabel = 'Clear all',
  disabled,
  invalid,
  className,
  maxVisibleChips = 4,
}: MultiSearchableSelectProps) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const selectedSet = useMemo(() => new Set(values), [values])

  const labelByValue = useMemo(() => {
    const map = new Map<string, string>()
    options.forEach((option) => map.set(option.value, option.label))
    return map
  }, [options])

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return options
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(normalized) ||
        option.value.toLowerCase().includes(normalized),
    )
  }, [options, query])

  const visibleValues = values.slice(0, maxVisibleChips)
  const hiddenCount = Math.max(0, values.length - visibleValues.length)

  const toggleValue = (value: string) => {
    if (selectedSet.has(value)) {
      onChange(values.filter((item) => item !== value))
      return
    }
    onChange([...values, value])
  }

  const removeValue = (value: string) => {
    onChange(values.filter((item) => item !== value))
  }

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setQuery('')
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(triggerClassName(invalid, disabled), className)}
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
            {values.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              <>
                {visibleValues.map((value) => (
                  <span
                    key={value}
                    className="inline-flex max-w-[11rem] items-center gap-1 rounded-md border border-border/70 bg-muted/50 px-2 py-1 text-xs font-medium text-foreground"
                  >
                    <span className="truncate">{labelByValue.get(value) ?? value}</span>
                    <span
                      role="button"
                      tabIndex={-1}
                      aria-label={`Remove ${labelByValue.get(value) ?? value}`}
                      className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        removeValue(value)
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          event.stopPropagation()
                          removeValue(value)
                        }
                      }}
                    >
                      <X className="size-3" />
                    </span>
                  </span>
                ))}
                {hiddenCount > 0 ? (
                  <span className="rounded-md border border-border/70 bg-background px-2 py-1 text-xs font-medium text-muted-foreground">
                    +{hiddenCount}
                  </span>
                ) : null}
              </>
            )}
          </div>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-2">
        <SearchInput
          value={query}
          onValueChange={setQuery}
          placeholder={searchPlaceholder}
          autoFocus
        />

        <div className={cn('mt-2 max-h-56 rounded-lg border border-border/60', ghostScrollClass)}>
          {filteredOptions.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">{emptyMessage}</p>
          ) : (
            <ul className="p-1">
              {filteredOptions.map((option) => {
                const isSelected = selectedSet.has(option.value)

                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => toggleValue(option.value)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-start text-sm transition-colors',
                        isSelected
                          ? 'bg-muted text-foreground'
                          : 'text-foreground hover:bg-muted/60',
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-4 shrink-0 items-center justify-center rounded-[4px] border',
                          isSelected
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-input bg-background',
                        )}
                      >
                        {isSelected ? <Check className="size-3" /> : null}
                      </span>
                      <span className="flex-1 truncate">{option.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {values.length > 0 ? (
          <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-2">
            <span className="text-xs text-muted-foreground">
              {selectedCountLabel(values.length)}
            </span>
            <button
              type="button"
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => onChange([])}
            >
              {clearLabel}
            </button>
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  )
}
