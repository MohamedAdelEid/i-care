import { useEffect, useState } from 'react'

import { useClinicActions, useClinicServices } from '@/application/hooks'
import type { DoctorDegree } from '@/domain/entities/booking.entity'
import type { ClinicService } from '@/domain/entities/clinic.entity'
import { notify } from '@/infrastructure/libs/toast/toast'
import { KitPageHeader, KitStatusBadge } from '@/presentation/components/kit'
import { Button } from '@/presentation/components/ui/button'
import { Input } from '@/presentation/components/ui/input'
import { useTranslation } from '@/presentation/hooks/use-translation'

const DEGREES: DoctorDegree[] = ['professor', 'consultant', 'specialist']

export const ClinicServicesPage = () => {
  const { t } = useTranslation('clinic')
  const list = useClinicServices()
  const actions = useClinicActions()
  const [draft, setDraft] = useState<ClinicService[]>([])

  useEffect(() => {
    if (list.data) setDraft(structuredClone(list.data))
  }, [list.data])

  const serviceLabel = (id: string) => {
    const map: Record<string, string> = {
      retina: t('serviceRetina'),
      lasik: t('serviceLasik'),
      pediatric: t('servicePediatric'),
      optics: t('serviceOptics'),
      cataract: t('serviceCataract'),
    }
    return map[id] ?? id
  }

  const degreeLabel = (degree: DoctorDegree) => {
    if (degree === 'professor') return t('priceProfessor')
    if (degree === 'consultant') return t('priceConsultant')
    return t('priceSpecialist')
  }

  const attLabel = (type: string) => {
    if (type === 'prescription') return t('attPrescription')
    if (type === 'insurance_card') return t('attContract')
    return t('attReceipt')
  }

  const setPrice = (serviceId: string, degree: DoctorDegree, value: number) => {
    setDraft((prev) =>
      prev.map((item) =>
        item.id === serviceId
          ? { ...item, prices: { ...item.prices, [degree]: value } }
          : item,
      ),
    )
  }

  const savePrices = async (service: ClinicService) => {
    await actions.updateServicePrices(service.id, service.prices)
    notify.success({ title: t('pricesSaved') })
    list.refetch()
  }

  return (
    <div className="space-y-4 p-6">
      <KitPageHeader title={t('servicesTitle')} description={t('servicesDescription')} />

      <div className="space-y-3">
        {draft.map((service) => (
          <section
            key={service.id}
            className="rounded-card border border-border bg-card p-4 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">{serviceLabel(service.id)}</h3>
                <KitStatusBadge
                  tone={service.active ? 'success' : 'neutral'}
                  label={service.active ? t('statusActive') : t('statusInactive')}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={service.active}
                  onChange={(e) => {
                    void actions.setServiceActive(service.id, e.target.checked).then(() => {
                      list.refetch()
                    })
                  }}
                />
                {t('activeToggle')}
              </label>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {DEGREES.map((degree) => (
                <label key={degree} className="space-y-1 text-xs">
                  <span className="text-muted-foreground">{degreeLabel(degree)}</span>
                  <Input
                    type="number"
                    value={service.prices[degree]}
                    onChange={(e) => setPrice(service.id, degree, Number(e.target.value) || 0)}
                    onBlur={() => void savePrices(service)}
                  />
                </label>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium">{t('attachments')}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {service.attachments.map((att, index) => (
                  <div key={att.type} className="rounded-control border border-border p-2 text-xs space-y-1">
                    <p className="font-medium">{attLabel(att.type)}</p>
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={att.required}
                        onChange={(e) => {
                          const next = service.attachments.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  required: e.target.checked,
                                  optional: e.target.checked ? false : item.optional,
                                }
                              : item,
                          )
                          void actions.updateServiceAttachments(service.id, next).then(() => {
                            list.refetch()
                          })
                        }}
                      />
                      {t('required')}
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={att.optional}
                        onChange={(e) => {
                          const next = service.attachments.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  optional: e.target.checked,
                                  required: e.target.checked ? false : item.required,
                                }
                              : item,
                          )
                          void actions.updateServiceAttachments(service.id, next).then(() => {
                            list.refetch()
                          })
                        }}
                      />
                      {t('optional')}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="button" size="sm" variant="outline" onClick={() => void savePrices(service)}>
              {t('save')}
            </Button>
          </section>
        ))}
      </div>
    </div>
  )
}
