import { SidebarInset, SidebarProvider, SidebarTrigger } from '@renderer/components/ui/sidebar'
import { AppSidebar } from '@renderer/components/app-sidebar'
import { Separator } from './ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './ui/breadcrumb'
import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cumb, setCumb] = useState('')
  const matches: any = useRouterState({ select: (s) => s.matches })
  useEffect(() => {
    // Lấy match sâu nhất có context.title hoặc context.getTitle
    const lastMatch = [...matches].reverse().find((m) => m.context?.title)

    const title = lastMatch?.context?.title
    setCumb(title)
  }, [matches])

  return (
    <SidebarProvider className="h-screen">
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to="/">Trang chủ</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{cumb}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="min-w-0 min-h-0 flex-1">
          <ScrollArea className="w-full h-full p-4">
            {children}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
