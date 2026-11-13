import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/ui/dialog'
import { useTranslation } from '@/presentation/hooks/use-translation'

export interface ShortcutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ShortcutsDialog = ({ open, onOpenChange }: ShortcutsDialogProps) => {
  const { t } = useTranslation('inbox')
  const rows = [
    { keys: '↑ / ↓ or J / K', label: t('shortcutNav') },
    { keys: 'Enter', label: t('shortcutOpen') },
    { keys: 'T', label: t('shortcutTakeover') },
    { keys: 'R', label: t('shortcutResolve') },
    { keys: '?', label: t('shortcutHelp') },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('shortcutsTitle')}</DialogTitle>
        </DialogHeader>
        <ul className="space-y-2">
          {rows.map((row) => (
            <li key={row.keys} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">{row.label}</span>
              <kbd className="rounded-control border border-border bg-muted px-2 py-0.5 font-mono text-xs">
                {row.keys}
              </kbd>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
