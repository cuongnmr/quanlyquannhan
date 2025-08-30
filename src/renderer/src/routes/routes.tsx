import App from '@renderer/App'
import { createRoute } from '@tanstack/react-router'
import { RootRoute } from './__root'
import CreateUserPage from '@renderer/pages/create-user/create-user-page'
import ListUsersPage from '@renderer/pages/list-users/list-users-page'
import UserDetailsPage from '@renderer/pages/details-user/details-user-page'
import CLCTPage from '@renderer/pages/clct/clct-page'
import ImportDBPage from '@renderer/pages/import-db/import-db-page'

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
    return { title: 'Danh sách quân nhân' }
  }
})

export const UserDetailsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/user/$userId',
  component: UserDetailsPage,
  beforeLoad() {
    return { title: 'Thông tin quân nhân' }
  }
})

export const CLCTRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/clct',
  component: CLCTPage,
  beforeLoad() {
    return { title: 'Chất lượng chính trị' }
  }
})

export const ImportDBRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/import-db',
  component: ImportDBPage,
  beforeLoad() {
    return { title: 'Cập nhật cơ sở dữ liệu' }
  }
})

export const rootTree = RootRoute.addChildren([
  HomeRoute,
  CreatePageRoute,
  ListUsersRoute,
  UserDetailsRoute,
  CLCTRoute,
  ImportDBRoute
])
