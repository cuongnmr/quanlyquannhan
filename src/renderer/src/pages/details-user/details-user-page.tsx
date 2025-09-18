import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { Input } from '@renderer/components/ui/input'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '@renderer/components/ui/toggle-group'
import { getValue } from '@renderer/lib/mapping'
import { cn } from '@renderer/lib/utils'
import { userProps } from '@renderer/types/user'
import { useNavigate, useParams, useRouter } from '@tanstack/react-router'
import { ArrowLeft, ChevronsUp, Download, Edit, List, Logs, Trash2, X } from 'lucide-react'
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'

const UserDetailsPage = () => {
  const { userId } = useParams({ from: '/user/$userId' })
  const [user, setUser] = useState<Record<string, string> | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [view, setView] = useState<string>('datalist')
  const initData = useRef<Record<string, string> | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const { history } = useRouter()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  async function fetchUser(id: string) {
    const data = await window.api.getUser(id)
    setUser(data)
    initData.current = data
  }
  useEffect(() => {
    if (userId) {
      fetchUser(userId)
    }
    return () => {
      setUser(null)
    }
  }, [userId])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleDelete = async () => {
    // Mock delete functionality
    if (!user) return
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      await window.api.deleteUser(user.id)
      navigate({ to: '/users' })
    }
  }

  const handleExport = () => {
    // Mock export functionality
    alert('Tính năng đang phát triển')
  }

  function handleCancel() {
    setUser(initData.current)
    setIsEditing(false)
  }

  async function handleSave() {
    if (!user) return setIsEditing(false)
    initData.current = { ...user }
    await window.api.updateUser(user.id, user)
    setIsEditing(false)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  function render() {
    if (!user) return null
    if (isEditing)
      return (
        <>
          <dl>
            {Object.entries(userProps).map(([key, value]) => (
              <Fragment key={key}>
                <dt>{value}</dt>
                <dd>
                  <Input
                    type="text"
                    className="bg-background"
                    value={user[key]}
                    name={key}
                    onChange={handleChange}
                  />
                </dd>
              </Fragment>
            ))}
          </dl>
        </>
      )
    switch (view) {
      case 'datalist':
        return (
          <dl>
            {Object.entries(userProps).map(([key, value]) => (
              <Fragment key={key}>
                <dt>{value}</dt>
                <dd>{getValue(key, user[key])}</dd>
              </Fragment>
            ))}
          </dl>
        )

      default:
        return (
          <ul>
            {Object.entries(userProps).map(([key, value]) => (
              <li key={key}>
                {value}: {getValue(key, user[key])}
              </li>
            ))}
          </ul>
        )
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        // Hiển thị nút khi đã cuộn xuống một khoảng nhất định
        if (ref.current.scrollTop >= 150) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }

    const currentRef = ref.current
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <ScrollArea className="p-3 w-full h-full" ref={ref}>
      <Card className="mb-3 sticky -top-20 bg-background">
        <CardHeader>
          <CardTitle>Chi tiết quân nhân</CardTitle>
          <CardDescription>{user?.hoten}</CardDescription>
          <CardAction>
            <Button disabled={isEditing} variant="ghost" onClick={() => history.go(-1)}>
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Quay lại</span>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleCancel} variant="outline" className="gap-2">
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Hủy</span>
              </Button>
              <Button variant="default" onClick={handleSave} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Lưu</span>
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleEdit} className="gap-2">
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Chỉnh sửa</span>
              </Button>
              <Button variant="secondary" onClick={handleExport} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Xuất</span>
              </Button>
              <Button variant="destructive" onClick={handleDelete} className="gap-2">
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Xóa</span>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>ID: {user.id}</CardDescription>
            <CardAction>
              <ToggleGroup
                variant="outline"
                type="single"
                defaultValue="list"
                value={view}
                onValueChange={setView}
                disabled={isEditing}
              >
                <ToggleGroupItem value="list" aria-label="List mode">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="datalist" aria-label="Datalist mode">
                  <Logs className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </CardAction>
          </CardHeader>
          {user && (
            <CardContent>
              <article className="prose prose-sm max-w-none">{render()}</article>
              <Button
                className={cn(
                  'fixed bottom-4 right-4 gap-2 opacity-0 rounded-full',
                  isVisible && 'opacity-100'
                )}
                variant="outline"
                onClick={() => {
                  if (ref.current) ref.current.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                size="icon"
              >
                <ChevronsUp className="size-4" />
              </Button>
            </CardContent>
          )}
        </Card>
      )}
    </ScrollArea>
  )
}

export default UserDetailsPage
