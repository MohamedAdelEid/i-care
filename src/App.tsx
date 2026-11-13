import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppProvider } from '@/presentation/providers'
import { router } from '@/presentation/routes/router'
import { Skeleton } from '@/presentation/components/ui/skeleton'

export const App = () => (
  <AppProvider>
    <Suspense fallback={<Skeleton className="m-6 h-40 w-full" />}>
      <RouterProvider router={router} />
    </Suspense>
  </AppProvider>
)
