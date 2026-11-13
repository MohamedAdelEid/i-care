import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useBookingActions, useDoctors } from '@/application/hooks'
import type { Booking } from '@/domain/entities'
import { bookingFormSchema, type BookingFormValues } from '@/domain/schemas'
import { notify } from '@/infrastructure/libs/toast/toast'
import { KitConfirmDialog, KitEntityDrawer } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { useState } from 'react'

export interface BookingDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  booking?: Booking | null
  onSaved: () => void
}

export const BookingDrawer = ({ open, onOpenChange, booking, onSaved }: BookingDrawerProps) => {
  const { t } = useTranslation('bookings')
  const { t: tVal } = useTranslation('validation')
  const doctors = useDoctors()
  const actions = useBookingActions()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const editing = Boolean(booking)

  const form = useForm<BookingFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RHF + Zod resolver typing mismatch
    resolver: zodResolver(bookingFormSchema) as any,
    defaultValues: {
      patientName: '',
      phone: '',
      serviceId: 'retina',
      doctorDegree: 'consultant',
      doctorId: '',
      day: '',
      timeSlot: '09-12',
      cost: 900,
      channel: 'whatsapp',
      status: 'pending_confirmation',
    },
  })

  useEffect(() => {
    if (booking) {
      form.reset({
        patientName: booking.patientName,
        phone: booking.phone,
        serviceId: booking.serviceId,
        doctorDegree: booking.doctorDegree,
        doctorId: booking.doctorId,
        day: booking.day,
        timeSlot: booking.timeSlot,
        cost: booking.cost,
        channel: booking.channel,
        status: booking.status,
        conversationId: booking.conversationId,
      })
    } else if (open) {
      form.reset({
        patientName: '',
        phone: '',
        serviceId: 'retina',
        doctorDegree: 'consultant',
        doctorId: doctors.data?.[0]?.id ?? '',
        day: '',
        timeSlot: '09-12',
        cost: 900,
        channel: 'whatsapp',
        status: 'pending_confirmation',
      })
    }
  }, [booking, open, doctors.data, form])

  const serviceId = form.watch('serviceId')
  const degree = form.watch('doctorDegree')
  const day = form.watch('day')

  useEffect(() => {
    void actions.estimateCost(serviceId, degree).then((cost) => form.setValue('cost', cost))
  }, [serviceId, degree, actions, form])

  const filteredDoctors = (doctors.data ?? []).filter(
    (d) => d.degree === degree && d.services.includes(serviceId),
  )

  // Friday disabled (JS getDay: 5)
  const fridayBlocked = day ? new Date(`${day}T12:00:00`).getDay() === 5 : false

  const onSubmit = form.handleSubmit(async (values: BookingFormValues) => {
    if (fridayBlocked) {
      notify.error({ title: t('fridayClosed') })
      return
    }
    const payload = {
      ...values,
      attachmentCount: booking?.attachmentCount ?? 0,
      cost: Number(values.cost),
    }
    if (editing && booking) {
      await actions.update(booking.id, payload)
      notify.success({ title: t('updateSuccess') })
    } else {
      await actions.create(payload)
      notify.success({ title: t('createSuccess') })
    }
    onSaved()
    onOpenChange(false)
  })

  const err = (key: keyof BookingFormValues) => {
    const message = form.formState.errors[key]?.message
    if (!message) return null
    if (message === 'fourPartName' || message === 'egyptianPhone') return tVal(message)
    return tVal('required')
  }

  return (
    <>
      <KitEntityDrawer
        open={open}
        onOpenChange={onOpenChange}
        title={editing ? t('edit') : t('create')}
        className="sm:max-w-lg"
      >
        <form className="space-y-3 pt-4" onSubmit={onSubmit}>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldName')}</span>
            <Input {...form.register('patientName')} />
            {err('patientName') ? <span className="text-destructive text-xs">{err('patientName')}</span> : null}
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldPhone')}</span>
            <Input {...form.register('phone')} placeholder="+2010xxxxxxxx" />
            {err('phone') ? <span className="text-destructive text-xs">{err('phone')}</span> : null}
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldService')}</span>
            <select className="border-input bg-background h-9 w-full rounded-control border px-2" {...form.register('serviceId')}>
              <option value="retina">{t('serviceRetina')}</option>
              <option value="lasik">{t('serviceLasik')}</option>
              <option value="pediatric">{t('servicePediatric')}</option>
              <option value="optics">{t('serviceOptics')}</option>
              <option value="cataract">{t('serviceCataract')}</option>
            </select>
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldDegree')}</span>
            <select className="border-input bg-background h-9 w-full rounded-control border px-2" {...form.register('doctorDegree')}>
              <option value="professor">{t('degreeProfessor')}</option>
              <option value="consultant">{t('degreeConsultant')}</option>
              <option value="specialist">{t('degreeSpecialist')}</option>
            </select>
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldDoctor')}</span>
            <select className="border-input bg-background h-9 w-full rounded-control border px-2" {...form.register('doctorId')}>
              {filteredDoctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldDay')}</span>
            <Input type="date" {...form.register('day')} />
            {fridayBlocked ? <span className="text-warning text-xs">{t('fridayClosed')}</span> : null}
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldSlot')}</span>
            <select className="border-input bg-background h-9 w-full rounded-control border px-2" {...form.register('timeSlot')}>
              <option value="09-12">{t('slot0912')}</option>
              <option value="12-15">{t('slot1215')}</option>
              <option value="15-18">{t('slot1518')}</option>
              <option value="18-21">{t('slot1821')}</option>
            </select>
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldCost')}</span>
            <Input
              type="number"
              {...form.register('cost', { valueAsNumber: true })}
            />
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldChannel')}</span>
            <select className="border-input bg-background h-9 w-full rounded-control border px-2" {...form.register('channel')}>
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram">Telegram</option>
              <option value="manual">Manual</option>
            </select>
          </label>
          <div className="flex flex-wrap gap-2 border-t border-border pt-3">
            <Button type="submit">{t('save')}</Button>
            {editing && booking ? (
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
          booking
            ? async () => {
                await actions.create({ ...booking, id: booking.id })
                onSaved()
              }
            : undefined
        }
        onConfirm={async () => {
          if (!booking) return
          await actions.remove(booking.id)
          notify.success({ title: t('deleteSuccess') })
          onSaved()
          onOpenChange(false)
        }}
      />
    </>
  )
}
