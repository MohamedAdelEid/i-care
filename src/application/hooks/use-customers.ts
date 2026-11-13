import { useState } from 'react'

import { useAsync } from '@/application/hooks/use-async'
import { repositories } from '@/composition/repositories'
import type { CustomerListFilters } from '@/domain/repositories/customer.repository'

export const useCustomers = (filters: CustomerListFilters, pageSize = 20) => {
  const [page, setPage] = useState(1)
  const filterKey = JSON.stringify(filters)
  const query = useAsync(
    () => repositories.customers.list({ page, pageSize }, filters),
    [page, pageSize, filterKey],
  )
  return { ...query, page, pageSize, setPage }
}

export const useCustomerStats = () => useAsync(() => repositories.customers.getStats(), [])

export const useCustomerTabCounts = (filters: Omit<CustomerListFilters, 'tab'> = {}) => {
  const filterKey = JSON.stringify(filters)
  return useAsync(() => repositories.customers.getTabCounts(filters), [filterKey])
}

export const useCustomer = (id: string | undefined) =>
  useAsync(() => (id ? repositories.customers.getById(id) : Promise.resolve(null)), [id])
