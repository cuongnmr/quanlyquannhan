// hooks/useScrollRestoration.ts
import { useLocation, useRouter } from '@tanstack/react-router'
import { useEffect, useLayoutEffect } from 'react'

interface Props {
  isLoading?: boolean
  container?: HTMLDivElement | null
}
const savedPositions = new Map<string, number>()
export function useScrollRestoration({ isLoading = false, container = null }: Props) {
  const location = useLocation()
  const router = useRouter()

  useEffect(() => {
    // Lưu vị trí cuộn khi rời khỏi trang
    const unsubscribe = router.subscribe('onBeforeLoad', () => {
      // Khi router chuẩn bị tải một route mới, lưu vị trí cuộn của route hiện tại
      savedPositions.set(location.pathname, container ? container.scrollTop : window.scrollY)
    })
    return () => unsubscribe()
  }, [location.pathname, container, router])

  useLayoutEffect(() => {
    // Khôi phục vị trí cuộn chỉ khi không còn loading
    if (!isLoading) {
      const savedScroll = savedPositions.get(location.pathname)
      if (savedScroll !== undefined) {
        container
          ? container.scrollTo({
              top: savedScroll,
              behavior: 'smooth'
            })
          : window.scrollTo({
              top: savedScroll,
              behavior: 'smooth'
            })
      }
    }
  }, [location.pathname, isLoading, container])
}
