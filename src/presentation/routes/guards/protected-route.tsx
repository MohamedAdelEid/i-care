import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '@/presentation/routes/routes.constants'
import { useAuthStore } from '@/presentation/store'

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />
  return <Outlet />
}
