import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { mapBienChe, mapCapBac, mapChucVu } from '@renderer/lib/mapping'
import { User } from '@renderer/types/user'
import { useEffect, useMemo, useState } from 'react'
import {
  bienCheTrungDoi,
  countDangVien,
  countDoanVien,
  countHSQCS,
  countQNCN,
  countSQ,
  countSQCH,
  countTrinhDo,
  findBt,
  getBCH,
  nhomTheoNamNN,
  sortArrayString,
  thongKeChucVuQNCN
} from './clct-helper'
import Statistics from './statistics'

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
    const bcUnique = sortArrayString(bienCheTrungDoi(users))
    return bcUnique.reduce(
      (acc, curr) => {
        acc[curr] = []
        users.forEach((user) => {
          if (user.bienche?.includes(curr)) acc[curr].push(user)
        })
        return acc
      },
      {} as Record<string, User[]>
    )
  }, [users])

  return (
    <ScrollArea className="w-full h-full p-3">
      <Card className="mb-3">
        <CardHeader>
          <CardTitle>Quân số và biên chế</CardTitle>
          <CardDescription>Đại đội 4</CardDescription>
        </CardHeader>
        <CardContent>
          <article className="prose prose-sm max-w-none">
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
          <article className="prose prose-sm max-w-none">
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
                {Object.entries(nhomTheoNamNN(users)).map(([year, users]) => {
                  return (
                    <details key={year} open>
                      <summary className="uppercase font-bold cursor-pointer">
                        Nhập ngũ năm {year}: {users.length}
                      </summary>
                      <Statistics users={users} />
                    </details>
                  )
                })}
                <details open>
                  <summary className="uppercase font-bold">Tổng đơn vị</summary>
                  <Statistics users={users} />
                </details>
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
