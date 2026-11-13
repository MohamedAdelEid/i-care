import { Paperclip, Send } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'

export interface ComposerProps {
  onSend: (body: string) => void | Promise<void>
  onQuickReply: (body: string) => void | Promise<void>
  disabled?: boolean
}

export const Composer = ({ onSend, onQuickReply, disabled }: ComposerProps) => {
  const { t } = useTranslation('inbox')
  const [value, setValue] = useState('')

  const submit = async () => {
    const body = value.trim()
    if (!body) return
    await onSend(body)
    setValue('')
  }

  const quick = [
    t('quickReplyConfirm'),
    t('quickReplySlot'),
    t('quickReplyInsurance'),
  ]

  return (
    <div className="border-t border-border p-3">
      <div className="mb-2 flex flex-wrap gap-1.5">
        {quick.map((label) => (
          <Button
            key={label}
            type="button"
            size="sm"
            variant="outline"
            disabled={disabled}
            onClick={() => void onQuickReply(label)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" size="icon" variant="ghost" disabled={disabled} aria-label={t('attach')}>
          <Paperclip className="size-4" />
        </Button>
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={t('composerPlaceholder')}
          disabled={disabled}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              void submit()
            }
          }}
        />
        <Button type="button" size="sm" disabled={disabled || !value.trim()} onClick={() => void submit()}>
          <Send className="size-3.5" aria-hidden />
          {t('send')}
        </Button>
      </div>
    </div>
  )
}
