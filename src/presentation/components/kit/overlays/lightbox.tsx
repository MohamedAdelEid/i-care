import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/ui/dialog'

export interface KitLightboxProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  url?: string
  title: string
}

export const KitLightbox = ({ open, onOpenChange, url, title }: KitLightboxProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {url ? (
        <img src={url} alt={title} className="max-h-[70vh] w-full rounded-card object-contain" />
      ) : null}
    </DialogContent>
  </Dialog>
)
