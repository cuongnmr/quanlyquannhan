import { User } from '@renderer/types/user'
import { useEffect, useRef, useState } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import { useScrollRestoration } from '@renderer/hooks/use-scroll-restoration'

const ListUsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  async function fetchUsers() {
    setIsLoading(true)
    const data = await window.api.getUsers()
    setUsers(data)
    setIsLoading(false)
  }

  useScrollRestoration({ isLoading, container: container.current })
  useEffect(() => {
    fetchUsers()
  }, [])

  return <DataTable columns={columns} data={users} onRefresh={fetchUsers} ref={container} />
}

export default ListUsersPage
