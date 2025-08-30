import { ChartBar, CirclePlus, GalleryVerticalEnd, Home, Import, Users } from 'lucide-react'
import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@renderer/components/ui/sidebar'
import { Link } from '@tanstack/react-router'

const items = [
  {
    title: 'Tổng quan',
    url: '/',
    icon: Home
  },
  {
    title: 'Thêm trích ngang',
    url: '/create',
    icon: CirclePlus
  },
  {
    title: 'Danh sách',
    url: '/users',
    icon: Users
  },
  {
    title: 'Chất lượng chính trị',
    url: '/clct',
    icon: ChartBar
  },
  {
    title: 'Cập nhật CSDL',
    url: '/import-db',
    icon: Import
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">QLQN</span>
                  <span className="">Đại đội 4</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
