import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { mapBienChe, mapCapBac, mapChucVu } from '@renderer/lib/mapping'
import { useEffect, useMemo, useState } from 'react'
import {
  countDangVien,
  countDoanVien,
  countHSQCS,
  countQNCN,
  countSQ,
  countSQCH,
  countTrinhDo,
  findBt,
  getBCH,
  getUniqueBienche,
  groupByType,
  nhomTheoNamNN,
  nhomTheoQueQuan,
  sortArrayString,
  thongKeChucVuQNCN
} from './clct-helper'
import { User } from '@renderer/types/user'
import { ScrollArea } from '@renderer/components/ui/scroll-area'

export default function CLCTPage() {
  const [users, setUsers] = useState<User[]>([])

  async function fetchUsers() {
    const data = await window.api.getUsers()
    setUsers(data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  const bienche = useMemo(() => {
    const bcUnique = sortArrayString(getUniqueBienche(users))
    return bcUnique.reduce(
      (acc, curr) => {
        acc[curr] = []
        users.forEach((user) => {
          if (user.bienche === curr) acc[curr].push(user)
        })
        return acc
      },
      {} as Record<string, User[]>
    )
  }, [users])

  return (
    <ScrollArea className="w-full h-full p-3">
      <Card>
        <CardHeader>
          <CardTitle>Quân số và biên chế</CardTitle>
          <CardDescription>Đại đội 4</CardDescription>
        </CardHeader>
        <CardContent>
          <article className="prose max-w-none">
            <ul>
              <li>Tổng quân số: {users.length} đồng chí</li>
              <li>Sỹ quan: {countSQ(users)} đồng chí</li>
              <li>QNCN: {countQNCN(users)} đồng chí</li>
              <li>Đảng viên: {countDangVien(users)} đồng chí</li>
              <li>Đoàn viên: {countDoanVien(users)} đồng chí</li>
            </ul>
            <section>
              <h4>Ban chỉ huy Đại đội</h4>
              <ol>
                {getBCH(users).map((item) => (
                  <li key={item.id}>{capBacTenChucVu(item)}</li>
                ))}
              </ol>
            </section>
            <section>
              <h4>Biên chế hiện tại Đại đội 4</h4>
              <p>Ban chỉ huy và {Object.keys(bienche).length} Trung đội gồm:</p>
              <ol>
                {Object.entries(bienche).map(([key, users]) => (
                  <li key={key}>
                    <div className="mb-3 font-medium">{mapBienChe(key)}</div>
                    <ul>
                      <li>Tổng quân số: {users.length} đồng chí</li>
                      <li>Sỹ quan: {countSQ(users)} đồng chí</li>
                      <li>QNCN: {countQNCN(users)} đồng chí</li>
                      <li>Đảng viên: {countDangVien(users)} đồng chí</li>
                      <li>Đoàn viên: {countDoanVien(users)} đồng chí</li>
                      <li>Trung đội trưởng: {capBacTenChucVu(findBt(users))}</li>
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          </article>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Chất lượng cán bộ, QNCN, HSQ - CS</CardTitle>
          <CardDescription>Chất lượng cán bộ, QNCN, HSQ - CS</CardDescription>
        </CardHeader>
        <CardContent>
          <article className="prose max-w-none">
            <ol>
              <li>
                <div>Sỹ quan: {countSQ(users)} đồng chí</div>
                <ul>
                  <li>SQCH: {countSQCH(users)} đồng chí</li>
                  <li>Trình độ cao đẳng: {countTrinhDo(users, 'cd')} đồng chí</li>
                  <li>
                    Cán bộ chính trị:{' '}
                    {users.reduce((acc, curr) => {
                      return acc + (curr.chucvu.includes('ctv') ? 1 : 0)
                    }, 0)}{' '}
                    đồng chí
                  </li>
                </ul>
              </li>
              <li>
                <div>Nhân viên chuyên môn kỹ thuật: {countQNCN(users)}</div>
                <ul>
                  {Object.entries(thongKeChucVuQNCN(users)).map(([key, value], idx) => (
                    <li key={idx}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div>Hạ sỹ quan - Chiến sỹ: {countHSQCS(users)}</div>
                <ul>
                  {Object.entries(nhomTheoNamNN(users)).map(([year, users]) => {
                    return (
                      <li key={year}>
                        <div>
                          Nhập ngũ năm {year}: {users.length}
                        </div>
                        <ThongKe users={users} />
                      </li>
                    )
                  })}
                  <li>
                    <div>Tổng đơn vị</div>
                    <ThongKe users={users} />
                  </li>
                </ul>
              </li>
            </ol>
          </article>
        </CardContent>
      </Card>
    </ScrollArea>
  )
}

function capBacTenChucVu(user?: User) {
  if (!user) return ''
  return mapCapBac(user.capbac) + ' ' + user.hoten + ' - ' + mapChucVu(user.chucvu)
}

interface Props {
  users: User[]
}
function ThongKe({ users }: Props) {
  const usersKK = users.filter((user) => user.khokhan)
  const usersBoChet = users.filter((user) => user.nammatbo)
  const usersMeChet = users.filter((user) => user.nammatme)
  const usersBomelyhon = users.filter((user) => user.bomelyhon)
  return (
    <ul>
      <li className="font-bold">Quê quán</li>
      <ul>
        {Object.entries(nhomTheoQueQuan(users)).map(([key, value], idx) => (
          <li key={idx}>
            {key}: {value.length}
          </li>
        ))}
      </ul>
      <li className="font-bold">Dân tộc</li>
      <ul>
        {Object.entries(groupByType(users, 'dantoc')).map(([key, value], idx) => (
          <li key={idx}>
            {key}: {value.length}
          </li>
        ))}
      </ul>
      <li className="font-bold">Tôn giáo</li>
      <ul>
        {Object.entries(groupByType(users, 'tongiao')).map(([key, value], idx) => (
          <li key={idx}>
            {key}: {value.length} ({value.map((user) => user.hoten + ', ')})
          </li>
        ))}
      </ul>
      <li className="font-bold">Học vấn</li>
      <ul>
        {Object.entries(groupByType(users, 'vanhoa')).map(([key, value], idx) => (
          <li key={idx}>
            {key}: {value.length} ({value.map((user) => user.hoten + ', ')})
          </li>
        ))}
      </ul>
      <li className="font-bold">Trình độ</li>
      <ul>
        {Object.entries({ dh: 'Đại học', cd: 'Cao Đẳng', tc: 'Trung cấp' }).map(([key, value]) => (
          <li key={key}>
            {value}: {countTrinhDo(users, key)}
          </li>
        ))}
      </ul>
      <li className="font-bold">Hoàn cảnh khó khăn: {usersKK.length}</li>
      <ul>
        {usersKK.map((user) => (
          <li key={user.id}>
            {user.hoten}: {user.khokhan}
          </li>
        ))}
      </ul>
      <li className="font-bold">Bố chết: {usersBoChet.length}</li>
      <ul>
        {usersBoChet.map((user) => (
          <li key={user.id}>
            {user.hoten}: Năm mất: {user.nammatbo}
          </li>
        ))}
      </ul>
      <li className="font-bold">Mẹ chết: {usersMeChet.length}</li>
      <ul>
        {usersMeChet.map((user) => (
          <li key={user.id}>
            {user.hoten}: Năm mất: {user.nammatme}
          </li>
        ))}
      </ul>
      <li className="font-bold">Bố mẹ ly hôn: {usersBomelyhon.length}</li>
      <ul>
        {usersBomelyhon.map((user) => (
          <li key={user.id}>
            {user.hoten}: {user.bomelyhon}
          </li>
        ))}
      </ul>
    </ul>
  )
}
