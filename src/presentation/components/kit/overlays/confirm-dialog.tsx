import type { ReactNode } from 'react'
import { useState } from 'react'

import { notify } from '@/infrastructure/libs/toast/toast'
import { Button } from '@/presentation/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/ui/dialog'
import { useTranslation } from '@/presentation/hooks/use-translation'

export interface KitConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: ReactNode
  description?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  onConfirm?: () => void | Promise<void>
  /** After success, show a toast with an optional undo handler. */
  undoLabel?: string
  onUndo?: () => void | Promise<void>
}

export const KitConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  destructive,
  onConfirm,
  undoLabel,
  onUndo,
}: KitConfirmDialogProps) => {
  const { t } = useTranslation('kit')
  const [pending, setPending] = useState(false)

  const handleConfirm = async () => {
    if (!onConfirm) {
      onOpenChange(false)
      return
    }

    setPending(true)
    try {
      await onConfirm()
      onOpenChange(false)

      if (onUndo) {
        notify.success({
          title: t('actionCompleted'),
          description: (
            <button
              type="button"
              className="mt-1 text-sm font-medium text-primary underline-offset-2 hover:underline"
              onClick={() => void onUndo()}
            >
              {undoLabel ?? t('undo')}
            </button>
          ),
        })
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!pending}>
        <DialogHeader>
          <DialogTitle>{title ?? t('confirmTitle')}</DialogTitle>
          <DialogDescription>{description ?? t('confirmDescription')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel ?? t('cancel')}
          </Button>
          <Button
            type="button"
            variant={destructive ? 'destructive' : 'default'}
            disabled={pending}
            onClick={() => void handleConfirm()}
          >
            {confirmLabel ?? t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
