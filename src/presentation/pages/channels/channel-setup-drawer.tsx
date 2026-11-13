import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useChannelActions } from '@/application/hooks'
import type { ChannelConnection } from '@/domain/entities'
import { channelSetupSchema, type ChannelSetupFormValues } from '@/domain/schemas'
import type { ChannelType } from '@/domain/enums'
import { notify } from '@/infrastructure/libs/toast/toast'
import { KitEntityDrawer } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { cn } from '@/presentation/utils'

export interface ChannelSetupDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  channelType: ChannelType
  channel?: ChannelConnection | null
  onSaved: () => void
}

export const ChannelSetupDrawer = ({
  open,
  onOpenChange,
  channelType,
  channel,
  onSaved,
}: ChannelSetupDrawerProps) => {
  const { t } = useTranslation('channels')
  const { t: tVal } = useTranslation('validation')
  const actions = useChannelActions()
  const [step, setStep] = useState(0)

  const form = useForm<ChannelSetupFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RHF + Zod resolver typing mismatch
    resolver: zodResolver(channelSetupSchema) as any,
    defaultValues: {
      credentials: '',
      webhookUrl: '',
      testMessage: 'Hello from i-care admin',
    },
  })

  useEffect(() => {
    if (!open) return
    setStep(0)
    form.reset({
      credentials: '',
      webhookUrl: channel?.webhookUrl ?? 'https://api.icare.local/webhooks/' + channelType,
      testMessage: 'Hello from i-care admin',
    })
  }, [open, channel, channelType, form])

  const copyWebhook = async () => {
    const url = form.getValues('webhookUrl')
    try {
      await navigator.clipboard.writeText(url)
      notify.success({ title: t('copied') })
    } catch {
      notify.error({ title: t('copy') })
    }
  }

  const validateStep = async () => {
    if (step === 0) return form.trigger('credentials')
    if (step === 1) return form.trigger('webhookUrl')
    return true
  }

  const finish = form.handleSubmit(async (values) => {
    await actions.saveSetup(channelType, {
      credentials: values.credentials,
      webhookUrl: values.webhookUrl,
    })
    if (values.testMessage?.trim()) {
      await actions.sendTestMessage(channelType, values.testMessage.trim())
    }
    notify.success({ title: t('saveSuccess') })
    onSaved()
    onOpenChange(false)
  })

  const steps = [t('stepCredentials'), t('stepWebhook'), t('stepTest')]

  return (
    <KitEntityDrawer open={open} onOpenChange={onOpenChange} title={t('setupTitle')}>
      <div className="mb-4 flex gap-2">
        {steps.map((label, i) => (
          <span
            key={label}
            className={cn(
              'rounded-full border px-2.5 py-1 text-xs',
              i === step
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground',
            )}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>

      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        {step === 0 ? (
          <label className="block space-y-1 text-sm">
            <span>{t('token')}</span>
            <Input {...form.register('credentials')} placeholder={channel?.credentialsMasked} />
            {form.formState.errors.credentials ? (
              <span className="text-destructive text-xs">{tVal('required')}</span>
            ) : null}
          </label>
        ) : null}

        {step === 1 ? (
          <div className="space-y-2">
            <label className="block space-y-1 text-sm">
              <span>{t('webhook')}</span>
              <Input {...form.register('webhookUrl')} />
              {form.formState.errors.webhookUrl ? (
                <span className="text-destructive text-xs">{tVal('url')}</span>
              ) : null}
            </label>
            <Button type="button" variant="outline" size="sm" onClick={() => void copyWebhook()}>
              {t('copy')}
            </Button>
          </div>
        ) : null}

        {step === 2 ? (
          <label className="block space-y-1 text-sm">
            <span>{t('testMessage')}</span>
            <Input {...form.register('testMessage')} placeholder={t('testPlaceholder')} />
          </label>
        ) : null}

        <div className="flex flex-wrap gap-2 border-t border-border pt-3">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
              {t('back')}
            </Button>
          ) : null}
          {step < 2 ? (
            <Button
              type="button"
              onClick={() => {
                void validateStep().then((ok) => {
                  if (ok) setStep((s) => s + 1)
                })
              }}
            >
              {t('next')}
            </Button>
          ) : (
            <Button type="button" onClick={() => void finish()}>
              {t('finish')}
            </Button>
          )}
        </div>
      </form>
    </KitEntityDrawer>
  )
}
