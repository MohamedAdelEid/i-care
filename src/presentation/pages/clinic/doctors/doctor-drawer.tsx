import { useEffect, useState } from 'react'

import { useClinicActions } from '@/application/hooks'
import type { Doctor } from '@/domain/entities'
import type { BookingTimeSlot, DoctorDegree, DoctorSlotGrid } from '@/domain/entities/booking.entity'
import type { EyeCareServiceId } from '@/domain/entities/inbox.entity'
import { notify } from '@/infrastructure/libs/toast/toast'
import { KitConfirmDialog, KitEntityDrawer } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'
import { cn } from '@/presentation/utils'

const ALL_SLOTS: BookingTimeSlot[] = ['09-12', '12-15', '15-18', '18-21']
const DAYS = [0, 1, 2, 3, 4, 5, 6] as const
const SERVICES: EyeCareServiceId[] = ['retina', 'lasik', 'pediatric', 'optics', 'cataract']

const emptyGrid = (): DoctorSlotGrid => ({
  '0': [...ALL_SLOTS],
  '1': [...ALL_SLOTS],
  '2': [...ALL_SLOTS],
  '3': [...ALL_SLOTS],
  '4': [...ALL_SLOTS],
  '5': [],
  '6': [],
})

export interface DoctorDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  doctor?: Doctor | null
  onSaved: () => void
}

export const DoctorDrawer = ({ open, onOpenChange, doctor, onSaved }: DoctorDrawerProps) => {
  const { t } = useTranslation('clinic')
  const actions = useClinicActions()
  const editing = Boolean(doctor)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [name, setName] = useState('')
  const [degree, setDegree] = useState<DoctorDegree>('consultant')
  const [specialty, setSpecialty] = useState('')
  const [price, setPrice] = useState(900)
  const [status, setStatus] = useState<'active' | 'inactive'>('active')
  const [services, setServices] = useState<EyeCareServiceId[]>(['retina'])
  const [slotGrid, setSlotGrid] = useState<DoctorSlotGrid>(emptyGrid)

  useEffect(() => {
    if (doctor) {
      setName(doctor.name)
      setDegree(doctor.degree)
      setSpecialty(doctor.specialty)
      setPrice(doctor.consultationPrice)
      setStatus(doctor.status)
      setServices(doctor.services)
      setSlotGrid({ ...doctor.slotGrid, '5': [] })
    } else if (open) {
      setName('')
      setDegree('consultant')
      setSpecialty('')
      setPrice(900)
      setStatus('active')
      setServices(['retina'])
      setSlotGrid(emptyGrid())
    }
  }, [doctor, open])

  const dayLabel = (day: number) => {
    const keys = ['daySat', 'daySun', 'dayMon', 'dayTue', 'dayWed', 'dayThu', 'dayFri'] as const
    return t(keys[day] ?? 'daySat')
  }

  const toggleSlot = (day: number, slot: BookingTimeSlot) => {
    if (day === 5) return
    const key = String(day)
    const current = slotGrid[key] ?? []
    const next = current.includes(slot)
      ? current.filter((item) => item !== slot)
      : [...current, slot]
    setSlotGrid({ ...slotGrid, [key]: next, '5': [] })
  }

  const toggleService = (id: EyeCareServiceId) => {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const onSave = async () => {
    const payload = {
      name: name.trim(),
      degree,
      specialty: specialty.trim() || 'General',
      consultationPrice: price,
      status,
      services: services.length ? services : (['retina'] as EyeCareServiceId[]),
      slotGrid: { ...slotGrid, '5': [] },
    }
    if (editing && doctor) {
      await actions.updateDoctor(doctor.id, payload)
      notify.success({ title: t('updateSuccess') })
    } else {
      await actions.createDoctor(payload)
      notify.success({ title: t('createSuccess') })
    }
    onSaved()
    onOpenChange(false)
  }

  return (
    <>
      <KitEntityDrawer
        open={open}
        onOpenChange={onOpenChange}
        title={editing ? t('editDoctor') : t('createDoctor')}
      >
        <div className="space-y-3">
          <label className="block space-y-1 text-sm">
            <span>{t('fieldName')}</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldDegree')}</span>
            <select
              className="border-input bg-background h-9 w-full rounded-control border px-2"
              value={degree}
              onChange={(e) => setDegree(e.target.value as DoctorDegree)}
            >
              <option value="professor">{t('degreeProfessor')}</option>
              <option value="consultant">{t('degreeConsultant')}</option>
              <option value="specialist">{t('degreeSpecialist')}</option>
            </select>
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldSpecialty')}</span>
            <Input value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldPrice')}</span>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
            />
          </label>
          <label className="block space-y-1 text-sm">
            <span>{t('fieldStatus')}</span>
            <select
              className="border-input bg-background h-9 w-full rounded-control border px-2"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
            >
              <option value="active">{t('statusActive')}</option>
              <option value="inactive">{t('statusInactive')}</option>
            </select>
          </label>
          <div className="space-y-1 text-sm">
            <span>{t('fieldServices')}</span>
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((id) => (
                <label key={id} className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={services.includes(id)}
                    onChange={() => toggleService(id)}
                  />
                  {t(
                    id === 'retina'
                      ? 'serviceRetina'
                      : id === 'lasik'
                        ? 'serviceLasik'
                        : id === 'pediatric'
                          ? 'servicePediatric'
                          : id === 'optics'
                            ? 'serviceOptics'
                            : 'serviceCataract',
                  )}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">{t('availability')}</p>
            <p className="text-muted-foreground text-xs">{t('fridayLocked')}</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-xs">
                <thead>
                  <tr>
                    <th className="p-1 text-start" />
                    {ALL_SLOTS.map((slot) => (
                      <th key={slot} className="p-1 font-medium">
                        {slot}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map((day) => (
                    <tr key={day} className={cn(day === 5 && 'opacity-50')}>
                      <td className="p-1 font-medium">{dayLabel(day)}</td>
                      {ALL_SLOTS.map((slot) => {
                        const on = (slotGrid[String(day)] ?? []).includes(slot)
                        return (
                          <td key={slot} className="p-1 text-center">
                            <input
                              type="checkbox"
                              disabled={day === 5}
                              checked={day === 5 ? false : on}
                              onChange={() => toggleSlot(day, slot)}
                            />
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-border pt-3">
            <Button type="button" onClick={() => void onSave()} disabled={!name.trim()}>
              {t('save')}
            </Button>
            {editing && doctor ? (
              <Button type="button" variant="destructive" onClick={() => setConfirmDelete(true)}>
                {t('delete')}
              </Button>
            ) : null}
          </div>
        </div>
      </KitEntityDrawer>

      <KitConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={t('deleteTitle')}
        description={t('deleteDescription')}
        destructive
        undoLabel="Undo"
        onUndo={
          doctor
            ? async () => {
                await actions.createDoctor({ ...doctor, id: doctor.id })
                onSaved()
              }
            : undefined
        }
        onConfirm={async () => {
          if (!doctor) return
          await actions.deleteDoctor(doctor.id)
          notify.success({ title: t('deleteSuccess') })
          onSaved()
          onOpenChange(false)
        }}
      />
    </>
  )
}
