import { HoverCard, HoverCardContent, HoverCardTrigger } from '@renderer/components/ui/hover-card'
import { getProvince, getValue } from '@renderer/lib/mapping'
import { User } from '@renderer/types/user'
import { FC } from 'react'
import { countTrinhDo, groupByType, nhomquequan } from './clct-helper'
import UserLink from './user-link'

interface Props {
  users: User[]
}
export default function Statistics({ users }: Props) {
  const khokhans = users.filter((user) => user.khokhan)
  const bochets = users.filter((user) => user.nammatbo)
  const mechets = users.filter((user) => user.nammatme)
  const bomelyhons = users.filter((user) => user.bomelyhon)

  return (
    <dl>
      <dt>Quê quán</dt>
      <dd>
        <ul>
          {Object.entries(nhomquequan(users)).map(([key, value], idx) => (
            <li key={idx}>
              {getProvince(key)}: {value.length} (
              <RenderUsersLink users={value} />)
            </li>
          ))}
        </ul>
      </dd>
      <dt>Dân tộc</dt>
      <dd>
        <ul className="capitalize">
          {Object.entries(groupByType(users, 'dantoc')).map(([key, value], idx) => (
            <li key={idx}>
              {key}: {value.length} (
              <RenderUsersLink users={value} />)
            </li>
          ))}
        </ul>
      </dd>
      <dt>Tôn giáo</dt>
      <dd>
        <ul className="capitalize">
          {Object.entries(groupByType(users, 'tongiao')).map(
            ([key, value], idx) =>
              key !== 'Không' && (
                <li key={idx}>
                  {key}: {value.length} (
                  <RenderUsersLink users={value} />)
                </li>
              )
          )}
        </ul>
      </dd>
      <dt>Học vấn</dt>
      <dd>
        <ul>
          {Object.entries(groupByType(users, 'vanhoa')).map(([key, value], idx) => (
            <li key={idx}>
              {key}: {value.length} (
              <RenderUsersLink users={value} />)
            </li>
          ))}
        </ul>
      </dd>
      <dt>Trình độ</dt>
      <dd>
        <ul>
          {Object.entries({ dh: 'Đại học', cd: 'Cao Đẳng', tc: 'Trung cấp' }).map(
            ([key, value]) => (
              <li key={key}>
                {value}: {countTrinhDo(users, key)}
              </li>
            )
          )}
        </ul>
      </dd>
      <dt>Hoàn cảnh khó khăn: {khokhans.length}</dt>
      <dd>
        <ul>
          {khokhans.map((user) => (
            <li key={user.id}>
              {user.hoten}: {user.khokhan}
            </li>
          ))}
        </ul>
      </dd>
      <dt>Bố chết: {bochets.length}</dt>
      <dd>
        <ul>
          {bochets.map((user) => (
            <li key={user.id}>
              {user.hoten}: Năm mất: {user.nammatbo}
            </li>
          ))}
        </ul>
      </dd>
      <dt>Mẹ chết: {mechets.length}</dt>
      <dd>
        <ul>
          {mechets.map((user) => (
            <li key={user.id}>
              {user.hoten}: Năm mất: {user.nammatme}
            </li>
          ))}
        </ul>
      </dd>
      <dt>Bố mẹ ly hôn: {bomelyhons.length}</dt>
      <dd>
        <ul>
          {bomelyhons.map((user) => (
            <li key={user.id}>
              {user.hoten}: {user.bomelyhon}
            </li>
          ))}
        </ul>
      </dd>
    </dl>
  )
}

const RenderUsersLink: FC<{ users: User[] }> = ({ users }) => {
  return (
    <>
      {users.map((user, idx) => {
        return (
          <HoverCard key={idx}>
            <HoverCardTrigger asChild>
              <span>
                <UserLink key={user.id} userId={user.id}>
                  {user.hoten}
                </UserLink>
                {idx !== users.length - 1 && <span>, </span>}
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="text-sm">
              <div className="flex justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{user.hoten}</h4>
                  <p className="text-sm">Biên chế: {getValue('bienche', user.bienche)}</p>
                  <div className="text-muted-foreground text-xs">
                    Cấp bậc: {getValue('capbac', user.capbac)}
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )
      })}
    </>
  )
}
