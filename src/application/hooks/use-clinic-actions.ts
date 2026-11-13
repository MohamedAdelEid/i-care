import { useCallback } from 'react'

import { repositories } from '@/composition/repositories'
import type { Doctor } from '@/domain/entities'
import type { DoctorDegree } from '@/domain/entities/booking.entity'
import type {
  ClinicDepartment,
  ClinicSchedule,
  ClinicService,
} from '@/domain/entities/clinic.entity'
import type { DoctorInput } from '@/domain/repositories/clinic.repository'

export const useClinicActions = () => {
  const createDoctor = useCallback(
    (input: DoctorInput) => repositories.clinic.createDoctor(input),
    [],
  )
  const updateDoctor = useCallback(
    (id: string, patch: Partial<Doctor>) => repositories.clinic.updateDoctor(id, patch),
    [],
  )
  const deleteDoctor = useCallback((id: string) => repositories.clinic.deleteDoctor(id), [])
  const setDoctorsStatus = useCallback(
    (ids: string[], status: Doctor['status']) => repositories.clinic.setDoctorsStatus(ids, status),
    [],
  )
  const updateServicePrices = useCallback(
    (id: string, prices: Record<DoctorDegree, number>) =>
      repositories.clinic.updateServicePrices(id, prices),
    [],
  )
  const setServiceActive = useCallback(
    (id: string, active: boolean) => repositories.clinic.setServiceActive(id, active),
    [],
  )
  const updateServiceAttachments = useCallback(
    (id: string, attachments: ClinicService['attachments']) =>
      repositories.clinic.updateServiceAttachments(id, attachments),
    [],
  )
  const updateDepartment = useCallback(
    (id: string, patch: Partial<ClinicDepartment>) =>
      repositories.clinic.updateDepartment(id, patch),
    [],
  )
  const updateSchedule = useCallback(
    (patch: Partial<ClinicSchedule>) => repositories.clinic.updateSchedule(patch),
    [],
  )

  return {
    createDoctor,
    updateDoctor,
    deleteDoctor,
    setDoctorsStatus,
    updateServicePrices,
    setServiceActive,
    updateServiceAttachments,
    updateDepartment,
    updateSchedule,
  }
}
