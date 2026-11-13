import { useMemo } from 'react'
import { adminNavigationConfig } from '@/presentation/navigation/config/admin.config'

export const useFilteredNavigation = () =>
  useMemo(() => adminNavigationConfig, [])
