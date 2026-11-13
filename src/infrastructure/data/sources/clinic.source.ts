import type { Doctor } from '@/domain/entities'
import type { DoctorDegree } from '@/domain/entities/booking.entity'
import type {
  ClinicDepartment,
  ClinicSchedule,
  ClinicService,
  DoctorListFilters,
  DoctorStats,
} from '@/domain/entities/clinic.entity'
import type { DoctorInput } from '@/domain/repositories/clinic.repository'
import type { PaginatedRequest, PaginatedResult } from '@/domain/types'
import { memoryStore } from '@/infrastructure/data/memory-store'
import { delay, filterBySearch, paginate } from '@/infrastructure/data/utils/source.utils'

const daysFromGrid = (slotGrid: Doctor['slotGrid']) =>
  Object.entries(slotGrid)
    .filter(([day, slots]) => day !== '5' && (slots?.length ?? 0) > 0)
    .map(([day]) => Number(day))
    .sort((a, b) => a - b)

const refreshBookingsCount = (doctor: Doctor): Doctor => ({
  ...doctor,
  bookingsCount: memoryStore.bookings.filter((item) => item.doctorId === doctor.id).length,
})

const upsertDoctor = (doctor: Doctor) => {
  const index = memoryStore.doctors.findIndex((item) => item.id === doctor.id)
  if (index >= 0) memoryStore.doctors[index] = doctor
  else memoryStore.doctors.unshift(doctor)
}

const applyDoctorFilters = (filters?: DoctorListFilters) => {
  let items = memoryStore.doctors.map(refreshBookingsCount)
  if (filters?.degree && filters.degree !== 'all') {
    items = items.filter((item) => item.degree === filters.degree)
  }
  if (filters?.status && filters.status !== 'all') {
    items = items.filter((item) => item.status === filters.status)
  }
  if (filters?.serviceId && filters.serviceId !== 'all') {
    const serviceId = filters.serviceId
    items = items.filter((item) => item.services.includes(serviceId))
  }
  items = filterBySearch(items, filters?.search, ['name', 'specialty', 'id'])
  return items.sort((a, b) => a.name.localeCompare(b.name))
}

export const clinicSource = {
  async listDoctors(
    request: PaginatedRequest,
    filters?: DoctorListFilters,
  ): Promise<PaginatedResult<Doctor>> {
    await delay()
    return paginate(applyDoctorFilters(filters), request)
  },

  async getDoctor(id: string): Promise<Doctor | null> {
    await delay()
    const doctor = memoryStore.doctors.find((item) => item.id === id)
    return doctor ? refreshBookingsCount(doctor) : null
  },

  async getDoctorStats(): Promise<DoctorStats> {
    await delay(60)
    const items = memoryStore.doctors
    const active = items.filter((item) => item.status === 'active')
    const avgPrice =
      items.length === 0
        ? 0
        : Math.round(items.reduce((sum, item) => sum + item.consultationPrice, 0) / items.length)
    return {
      total: items.length,
      active: active.length,
      professors: items.filter((item) => item.degree === 'professor').length,
      avgPrice,
    }
  },

  async createDoctor(input: DoctorInput): Promise<Doctor> {
    await delay(100)
    const slotGrid = { ...input.slotGrid, '5': [] }
    const doctor: Doctor = {
      ...input,
      id: input.id ?? `doc-${Date.now()}`,
      slotGrid,
      availableDays: input.availableDays ?? daysFromGrid(slotGrid),
      bookingsCount: input.bookingsCount ?? 0,
    }
    upsertDoctor(doctor)
    return doctor
  },

  async updateDoctor(id: string, patch: Partial<Doctor>): Promise<Doctor> {
    await delay(80)
    const existing = memoryStore.doctors.find((item) => item.id === id)
    if (!existing) throw new Error('Doctor not found')
    const slotGrid = patch.slotGrid
      ? { ...patch.slotGrid, '5': [] }
      : existing.slotGrid
    const next: Doctor = {
      ...existing,
      ...patch,
      id,
      slotGrid,
      availableDays: daysFromGrid(slotGrid),
    }
    upsertDoctor(next)
    return refreshBookingsCount(next)
  },

  async deleteDoctor(id: string): Promise<void> {
    await delay(60)
    memoryStore.doctors = memoryStore.doctors.filter((item) => item.id !== id)
  },

  async setDoctorsStatus(ids: string[], status: Doctor['status']): Promise<void> {
    await delay(80)
    memoryStore.doctors = memoryStore.doctors.map((item) =>
      ids.includes(item.id) ? { ...item, status } : item,
    )
  },

  async listServices(): Promise<ClinicService[]> {
    await delay(40)
    return [...memoryStore.clinicServices]
  },

  async updateServicePrices(
    id: string,
    prices: Record<DoctorDegree, number>,
  ): Promise<ClinicService> {
    await delay(80)
    const index = memoryStore.clinicServices.findIndex((item) => item.id === id)
    if (index < 0) throw new Error('Service not found')
    const next = { ...memoryStore.clinicServices[index]!, prices: { ...prices } }
    memoryStore.clinicServices[index] = next
    return next
  },

  async setServiceActive(id: string, active: boolean): Promise<ClinicService> {
    await delay(60)
    const index = memoryStore.clinicServices.findIndex((item) => item.id === id)
    if (index < 0) throw new Error('Service not found')
    const next = { ...memoryStore.clinicServices[index]!, active }
    memoryStore.clinicServices[index] = next
    return next
  },

  async updateServiceAttachments(
    id: string,
    attachments: ClinicService['attachments'],
  ): Promise<ClinicService> {
    await delay(80)
    const index = memoryStore.clinicServices.findIndex((item) => item.id === id)
    if (index < 0) throw new Error('Service not found')
    const next = { ...memoryStore.clinicServices[index]!, attachments }
    memoryStore.clinicServices[index] = next
    return next
  },

  async listDepartments(): Promise<ClinicDepartment[]> {
    await delay(40)
    return [...memoryStore.clinicDepartments]
  },

  async updateDepartment(
    id: string,
    patch: Partial<ClinicDepartment>,
  ): Promise<ClinicDepartment> {
    await delay(80)
    const index = memoryStore.clinicDepartments.findIndex((item) => item.id === id)
    if (index < 0) throw new Error('Department not found')
    const current = memoryStore.clinicDepartments[index]!
    const next: ClinicDepartment = {
      ...current,
      ...patch,
      id: current.id,
    }
    memoryStore.clinicDepartments[index] = next
    return next
  },

  async getSchedule(): Promise<ClinicSchedule> {
    await delay(40)
    return structuredClone(memoryStore.clinicSchedule)
  },

  async updateSchedule(patch: Partial<ClinicSchedule>): Promise<ClinicSchedule> {
    await delay(100)
    memoryStore.clinicSchedule = {
      ...memoryStore.clinicSchedule,
      ...patch,
      weekly: patch.weekly ?? memoryStore.clinicSchedule.weekly,
      holidays: patch.holidays ?? memoryStore.clinicSchedule.holidays,
      exceptions: patch.exceptions ?? memoryStore.clinicSchedule.exceptions,
      timeSlots: patch.timeSlots ?? memoryStore.clinicSchedule.timeSlots,
    }
    return structuredClone(memoryStore.clinicSchedule)
  },

  async estimateCost(serviceId: string, degree: string): Promise<number> {
    await delay(20)
    const service = memoryStore.clinicServices.find((item) => item.id === serviceId)
    return service?.prices[degree as DoctorDegree] ?? 500
  },
}
