import { cn } from './cn'

export const smoothScrollClass = cn(
  'overflow-y-auto overscroll-y-contain scroll-smooth',
  '[scrollbar-width:thin] [scrollbar-color:hsl(0_0%_72%/0.85)_transparent]',
  '[&::-webkit-scrollbar]:w-1',
  '[&::-webkit-scrollbar-track]:bg-transparent',
  '[&::-webkit-scrollbar-thumb]:rounded-full',
  '[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20',
  '[&::-webkit-scrollbar-thumb]:transition-colors duration-300',
  'hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/35',
)

/**
 * Invisible-until-hover scrollbar for overlays (dialogs, dropdowns, popovers).
 * Modern Chromium ignores `::-webkit-scrollbar` styles once `scrollbar-color`
 * is set, so both syntaxes are kept in sync.
 */
export const ghostScrollClass = cn(
  'overflow-y-auto overscroll-y-contain scroll-smooth',
  '[scrollbar-width:thin] [scrollbar-color:transparent_transparent]',
  'hover:[scrollbar-color:color-mix(in_oklch,var(--border)_55%,transparent)_transparent]',
  '[&::-webkit-scrollbar]:w-1',
  '[&::-webkit-scrollbar-track]:bg-transparent',
  '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent',
  'hover:[&::-webkit-scrollbar-thumb]:bg-border/50',
)

/** Barely-visible scrollbar for auth and other minimal surfaces */
export const subtleScrollClass = cn(
  'overflow-y-auto overscroll-y-contain scroll-smooth',
  '[scrollbar-width:thin]',
  '[scrollbar-color:color-mix(in_oklch,var(--border)_28%,transparent)_transparent]',
  '[&::-webkit-scrollbar]:w-1',
  '[&::-webkit-scrollbar-track]:bg-transparent',
  '[&::-webkit-scrollbar-thumb]:rounded-full',
  '[&::-webkit-scrollbar-thumb]:bg-border/25',
  '[&::-webkit-scrollbar-thumb]:transition-[background-color] duration-300',
  'hover:[&::-webkit-scrollbar-thumb]:bg-border/45',
  'dark:[scrollbar-color:color-mix(in_oklch,var(--border)_22%,transparent)_transparent]',
  'dark:[&::-webkit-scrollbar-thumb]:bg-border/18',
  'dark:hover:[&::-webkit-scrollbar-thumb]:bg-border/35',
)
