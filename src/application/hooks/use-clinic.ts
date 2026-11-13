import { useState } from 'react'

import { useAsync } from '@/application/hooks/use-async'
import { repositories } from '@/composition/repositories'
import type { DoctorListFilters } from '@/domain/entities/clinic.entity'

export const useClinicDoctors = (filters: DoctorListFilters = {}, pageSize = 20) => {
  const [page, setPage] = useState(1)
  const filterKey = JSON.stringify(filters)
  const query = useAsync(
    () => repositories.clinic.listDoctors({ page, pageSize }, filters),
    [page, pageSize, filterKey],
  )
  return { ...query, page, pageSize, setPage }
}

export const useClinicDoctorStats = () =>
  useAsync(() => repositories.clinic.getDoctorStats(), [])

export const useClinicDoctor = (id: string | undefined) =>
  useAsync(() => (id ? repositories.clinic.getDoctor(id) : Promise.resolve(null)), [id])

export const useClinicServices = () =>
  useAsync(() => repositories.clinic.listServices(), [])

export const useClinicDepartments = () =>
  useAsync(() => repositories.clinic.listDepartments(), [])

export const useClinicSchedule = () =>
  useAsync(() => repositories.clinic.getSchedule(), [])
