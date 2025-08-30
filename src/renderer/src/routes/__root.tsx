import Layout from '@renderer/components/layout'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'

export const RootRoute = createRootRoute({
  component: Root
})

function Root() {
  return (
    <Layout>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </Layout>
  )
}
