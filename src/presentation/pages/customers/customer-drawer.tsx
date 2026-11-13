import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useCustomerActions } from '@/application/hooks'
import type { Customer } from '@/domain/entities'
import { customerFormSchema, type CustomerFormValues } from '@/domain/schemas'
import { notify } from '@/infrastructure/libs/toast/toast'
import { KitConfirmDialog, KitEntityDrawer } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'

export interface CustomerDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer?: Customer | null
  onSaved: () => void
}

export const CustomerDrawer = ({
  open,
  onOpenChange,
  customer,
  onSaved,
}: CustomerDrawerProps) => {
  const { t } = useTranslation('customers')
  const { t: tVal } = useTranslation('validation')
  const actions = useCustomerActions()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const editing = Boolean(customer)

  const form = useForm<CustomerFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RHF + Zod resolver typing mismatch
    resolver: zodResolver(customerFormSchema) as any,
    defaultValues: {
      displayName: '',
      phone: '',
      email: '',
      preferredLanguage: 'en',
      status: 'active',
      hasInsurance: false,
      tags: '',
      channelType: 'whatsapp',
    },
  })

  useEffect(() => {
    if (customer) {
      form.reset({
        displayName: customer.displayName,
        phone: customer.phone,
        email: customer.email ?? '',
        preferredLanguage: customer.preferredLanguage,
        status: customer.status,
        hasInsurance: customer.hasInsurance,
        tags: customer.tags.join(', '),
        channelType: customer.channels[0]?.channelType ?? 'whatsapp',
      })
    } else if (open) {
      form.reset({
        displayName: '',
        phone: '',
        email: '',
        preferredLanguage: 'en',
        status: 'active',
        hasInsurance: false,
        tags: '',
        channelType: 'whatsapp',
      })
    }
  }, [customer, open, form])

  const onSubmit = form.handleSubmit(async (values: CustomerFormValues) => {
    const tags = (values.tags ?? '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
    const channels = [
      {
        channelType: values.channelType,
        externalId:
          customer?.channels[0]?.externalId ?? `ext-${values.phone.replace(/\D/g, '')}`,
      },
    ]
    const email = values.email?.trim() ? values.email.trim() : undefined

    if (editing && customer) {
      await actions.update(customer.id, {
        displayName: values.displayName,
        phone: values.phone,
        email,
        preferredLanguage: values.preferredLanguage,
        status: values.status,
        hasInsurance: values.hasInsurance,
        tags,
        channels,
        flagged: values.status === 'blocked' || tags.includes('flagged'),
      })
      notify.success({ title: t('updateSuccess') })
    } else {
      await actions.create({
        displayName: values.displayName,
        phone: values.phone,
        email,
        preferredLanguage: values.preferredLanguage,
        status: values.status,
        hasInsurance: values.hasInsurance,
        tags,
        channels,
        flagged: values.status === 'blocked' || tags.includes('flagged'),
      })
      notify.success({ title: t('createSuccess') })
    }
    onSaved()
    onOpenChange(false)
  })

  const err = (key: keyof CustomerFormValues) => {
    const message = form.formState.errors[key]?.message
    return message ? tVal(message as 'required' | 'email' | 'egyptianPhone') : null
  }

  return (
    <>
      <KitEntityDrawer
        open={open}
        onOpenChange={onOpenChange}
        title={editing ? t('edit') : t('create')}
      >
        <form className="space-y-3" onSubmit={onSubmit}>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldName')}</span>
            <Input {...form.register('displayName')} />
            {err('displayName') ? (
              <span className="text-destructive text-xs">{err('displayName')}</span>
            ) : null}
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldPhone')}</span>
            <Input {...form.register('phone')} placeholder="+2010xxxxxxxx" />
            {err('phone') ? <span className="text-destructive text-xs">{err('phone')}</span> : null}
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldEmail')}</span>
            <Input {...form.register('email')} />
            {err('email') ? <span className="text-destructive text-xs">{err('email')}</span> : null}
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldLanguage')}</span>
            <select
              className="border-input bg-background h-9 w-full rounded-control border px-2"
              {...form.register('preferredLanguage')}
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldStatus')}</span>
            <select
              className="border-input bg-background h-9 w-full rounded-control border px-2"
              {...form.register('status')}
            >
              <option value="active">{t('statusActive')}</option>
              <option value="inactive">{t('statusInactive')}</option>
              <option value="blocked">{t('statusBlocked')}</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...form.register('hasInsurance')} />
            <span>{t('fieldInsurance')}</span>
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldTags')}</span>
            <Input {...form.register('tags')} placeholder="vip, insurance" />
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldChannel')}</span>
            <select
              className="border-input bg-background h-9 w-full rounded-control border px-2"
              {...form.register('channelType')}
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram">Telegram</option>
            </select>
          </label>
          <div className="flex flex-wrap gap-2 border-t border-border pt-3">
            <Button type="submit">{t('save')}</Button>
            {editing && customer ? (
              <Button type="button" variant="destructive" onClick={() => setConfirmDelete(true)}>
                {t('delete')}
              </Button>
            ) : null}
          </div>
        </form>
      </KitEntityDrawer>

      <KitConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={t('deleteTitle')}
        description={t('deleteDescription')}
        destructive
        undoLabel="Undo"
        onUndo={
          customer
            ? async () => {
                await actions.create({ ...customer, id: customer.id })
                onSaved()
              }
            : undefined
        }
        onConfirm={async () => {
          if (!customer) return
          await actions.remove(customer.id)
          notify.success({ title: t('deleteSuccess') })
          onSaved()
          onOpenChange(false)
        }}
      />
    </>
  )
}
