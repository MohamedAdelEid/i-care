import type { Doctor } from '@/domain/entities'
import type { DoctorDegree } from '@/domain/entities/booking.entity'
import type { ClinicDepartment, ClinicSchedule, ClinicService } from '@/domain/entities/clinic.entity'
import type { DoctorListFilters } from '@/domain/entities/clinic.entity'
import type { DoctorInput, IClinicRepository } from '@/domain/repositories/clinic.repository'
import type { PaginatedRequest } from '@/domain/types'
import { clinicSource } from '@/infrastructure/data/sources/clinic.source'

export class ClinicRepository implements IClinicRepository {
  listDoctors(request: PaginatedRequest, filters?: DoctorListFilters) {
    return clinicSource.listDoctors(request, filters)
  }

  getDoctor(id: string) {
    return clinicSource.getDoctor(id)
  }

  getDoctorStats() {
    return clinicSource.getDoctorStats()
  }

  createDoctor(input: DoctorInput) {
    return clinicSource.createDoctor(input)
  }

  updateDoctor(id: string, patch: Partial<Doctor>) {
    return clinicSource.updateDoctor(id, patch)
  }

  deleteDoctor(id: string) {
    return clinicSource.deleteDoctor(id)
  }

  setDoctorsStatus(ids: string[], status: Doctor['status']) {
    return clinicSource.setDoctorsStatus(ids, status)
  }

  listServices() {
    return clinicSource.listServices()
  }

  updateServicePrices(id: string, prices: Record<DoctorDegree, number>) {
    return clinicSource.updateServicePrices(id, prices)
  }

  setServiceActive(id: string, active: boolean) {
    return clinicSource.setServiceActive(id, active)
  }

  updateServiceAttachments(id: string, attachments: ClinicService['attachments']) {
    return clinicSource.updateServiceAttachments(id, attachments)
  }

  listDepartments() {
    return clinicSource.listDepartments()
  }

  updateDepartment(id: string, patch: Partial<ClinicDepartment>) {
    return clinicSource.updateDepartment(id, patch)
  }

  getSchedule() {
    return clinicSource.getSchedule()
  }

  updateSchedule(patch: Partial<ClinicSchedule>) {
    return clinicSource.updateSchedule(patch)
  }

  estimateCost(serviceId: string, degree: string) {
    return clinicSource.estimateCost(serviceId, degree)
  }
}
