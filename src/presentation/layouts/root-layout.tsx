import { Outlet } from 'react-router-dom'
import { DocumentHead } from '@/presentation/seo/document-head'

export const RootLayout = () => (
  <>
    <DocumentHead />
    <Outlet />
  </>
)
