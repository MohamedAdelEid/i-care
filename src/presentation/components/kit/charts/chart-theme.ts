const BRAND_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

const BRAND_FALLBACK: Record<(typeof BRAND_STOPS)[number], string> = {
  50: '#eff5fd',
  100: '#dce8f8',
  200: '#bbd2f1',
  300: '#8fb3e6',
  400: '#5a8bd3',
  500: '#2f69bc',
  600: '#1653ac',
  700: '#12448c',
  800: '#0f3770',
  900: '#0b2a55',
}

export function readCssColor(variable: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback
  const raw = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  return raw || fallback
}

export function getReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export interface ChartThemeColors {
  primary: string
  muted: string
  mutedForeground: string
  border: string
  foreground: string
  ai: string
  success: string
  warning: string
  danger: string
  brandScale: string[]
}

export function getChartThemeColors(): ChartThemeColors {
  return {
    primary: readCssColor('--primary', '#1653ac'),
    muted: readCssColor('--muted', '#f1f3f6'),
    mutedForeground: readCssColor('--muted-foreground', '#667085'),
    border: readCssColor('--border', '#e4e7ec'),
    foreground: readCssColor('--foreground', '#101828'),
    ai: readCssColor('--ai', '#7a5af8'),
    success: readCssColor('--success', '#12b76a'),
    warning: readCssColor('--warning', '#f79009'),
    danger: readCssColor('--danger', '#f04438'),
    brandScale: BRAND_STOPS.map((stop) =>
      readCssColor(`--color-brand-${stop}`, BRAND_FALLBACK[stop]),
    ),
  }
}

export function getSeriesColor(index: number, colors?: ChartThemeColors): string {
  const theme = colors ?? getChartThemeColors()
  return theme.brandScale[Math.min(index + 3, theme.brandScale.length - 1)] ?? theme.primary
}

export const chartTooltipClass =
  'rounded-control border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-elevation-sm'

export type TrendRange = '7D' | '30D' | '90D'
