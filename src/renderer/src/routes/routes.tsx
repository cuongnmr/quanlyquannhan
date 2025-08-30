import App from '@renderer/App'
import { createRoute } from '@tanstack/react-router'
import { RootRoute } from './__root'
import CreateUserPage from '@renderer/pages/create-user/create-user-page'
import ListUsersPage from '@renderer/pages/list-users/list-users-page'

export const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: App,
  beforeLoad() {
    return { title: 'Tổng quan' }
  }
})

export const CreatePageRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/create',
  component: CreateUserPage,
  beforeLoad() {
    return { title: 'Thêm trích ngang' }
  }
})

export const ListUsersRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/users',
  component: ListUsersPage,
  beforeLoad() {
    return { title: 'Thêm trích ngang' }
  }
})

export const rootTree = RootRoute.addChildren([HomeRoute, CreatePageRoute, ListUsersRoute])
