import { User } from '@renderer/types/user'
import { useEffect, useState } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'

const ListUsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  async function fetchUsers() {
    const data = await window.api.getUsers()
    setUsers(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return <DataTable columns={columns} data={users} onRefresh={fetchUsers} />
}

export default ListUsersPage
