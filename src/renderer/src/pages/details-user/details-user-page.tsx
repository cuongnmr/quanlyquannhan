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
import { useNavigate, useParams, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Download, Edit, Trash2, X } from 'lucide-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { getValue } from '@renderer/lib/mapping'
import { userProps } from '@renderer/types/user'
import { ScrollArea } from '@renderer/components/ui/scroll-area'

const UserDetailsPage = () => {
  const { userId } = useParams({ from: '/user/$userId' })
  const [user, setUser] = useState<Record<string, string> | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const initData = useRef<Record<string, string> | null>(null)
  const { history } = useRouter()
  const navigate = useNavigate()

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
    const res = await window.api.updateUser(user.id, user)
    console.log(res)
    setIsEditing(false)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  return (
    <ScrollArea className="p-3 w-full h-full">
      <Card className="mb-3">
        <CardHeader>
          <CardTitle>Chi tiết quân nhân</CardTitle>
          <CardDescription>{user?.hoten}</CardDescription>
          <CardAction>
            <Button variant="ghost" onClick={() => history.go(-1)}>
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Quay lại</span>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleCancel} className="gap-2">
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Hủy</span>
              </Button>
              <Button variant="outline" onClick={handleSave} className="gap-2">
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
          </CardHeader>
          <CardContent>
            <ul className="divide-y text-sm">
              {user &&
                Object.entries(userProps).map(([key, value]) => (
                  <li key={key} className="hover:bg-accent hover:text-accent-foreground flex">
                    <div className="basis-1/3 px-1 py-3 font-medium">{value}</div>
                    <div className="basis-2/3 px-1 py-3">
                      {isEditing ? (
                        <Input
                          type="text"
                          className="bg-background"
                          value={user[key]}
                          name={key}
                          onChange={handleChange}
                        />
                      ) : (
                        getValue(key, user[key])
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </ScrollArea>
  )
}

export default UserDetailsPage
