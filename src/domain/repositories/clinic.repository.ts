import type { Doctor } from '@/domain/entities'
import type {
  ClinicDepartment,
  ClinicSchedule,
  ClinicService,
  DoctorListFilters,
  DoctorStats,
} from '@/domain/entities/clinic.entity'
import type { DoctorDegree } from '@/domain/entities/booking.entity'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'

export type DoctorInput = Omit<Doctor, 'id' | 'bookingsCount' | 'availableDays'> & {
  id?: string
  bookingsCount?: number
  availableDays?: number[]
}

export interface IClinicRepository {
  listDoctors(
    request: PaginatedRequest,
    filters?: DoctorListFilters,
  ): Promise<PaginatedResult<Doctor>>
  getDoctor(id: string): Promise<Doctor | null>
  getDoctorStats(): Promise<DoctorStats>
  createDoctor(input: DoctorInput): Promise<Doctor>
  updateDoctor(id: string, patch: Partial<Doctor>): Promise<Doctor>
  deleteDoctor(id: string): Promise<void>
  setDoctorsStatus(ids: string[], status: Doctor['status']): Promise<void>

  listServices(): Promise<ClinicService[]>
  updateServicePrices(id: string, prices: Record<DoctorDegree, number>): Promise<ClinicService>
  setServiceActive(id: string, active: boolean): Promise<ClinicService>
  updateServiceAttachments(
    id: string,
    attachments: ClinicService['attachments'],
  ): Promise<ClinicService>

  listDepartments(): Promise<ClinicDepartment[]>
  updateDepartment(id: string, patch: Partial<ClinicDepartment>): Promise<ClinicDepartment>

  getSchedule(): Promise<ClinicSchedule>
  updateSchedule(patch: Partial<ClinicSchedule>): Promise<ClinicSchedule>

  estimateCost(serviceId: string, degree: string): Promise<number>
}
