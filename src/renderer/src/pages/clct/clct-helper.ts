import { removeDiacritics } from '@renderer/lib/text'
import { User } from '@renderer/types/user'
import slugify from 'slugify'

export function getUniqueBienche(users: User[]): string[] {
  const set = new Set(
    users.map((u) => u.bienche).filter((b): b is string => b !== undefined) // loại bỏ undefined
  )
  return Array.from(set)
}

export function bienCheTrungDoi(users: User[]) {
  const allBValues: string[] = []

  // Define a regular expression to find 'b' followed by one or more digits
  // The 'g' flag ensures that all matches are found, not just the first one.
  const regex = /b\d+/g

  // Use matchAll to find all regex matches in each user's bienche string
  users.forEach((user) => {
    // String.matchAll returns an iterator.
    if (user.bienche) {
      const matches = user.bienche.matchAll(regex)
      // Loop through the iterator and push each match into an array
      for (const match of matches) {
        allBValues.push(match[0])
      }
    }
  })

  // Use a Set to get only the unique values from the array
  return [...new Set(allBValues)]
}
export const bch = ['ct', 'cp', 'ctv', 'ctvp', 'bt', 'dt', 'dp', 'ctvd', 'ctvpd']

/** Check có phải sỹ quan không */
function isSQ(user: User) {
  return bch.includes(user.chucvu)
}

/** Đếm số lượng sỹ quan */
export function countSQ(users: User[]): number {
  return users.reduce((count, user) => {
    return count + (isSQ(user) ? 1 : 0)
  }, 0)
}

/** Check có phải QNCN không */
function isQNCN(user: User) {
  return !bch.includes(user.chucvu) && user.capbac.includes('/')
}

function isHQSCS(user: User) {
  return ['b1', 'h1', 'h2', 'h3', 'b2'].includes(user.capbac.toLowerCase())
}

export function countHSQCS(users: User[]) {
  return users.reduce((acc, curr) => {
    return acc + (isHQSCS(curr) ? 1 : 0)
  }, 0)
}

export function filterHSQCS(users: User[]) {
  return users.filter((user) => isHQSCS(user))
}

/** Nhóm HSQ CS theo năm nhập ngũ */
export function nhomTheoNamNN(users: User[]) {
  const hsqcs = filterHSQCS(users)
  const groupedUsers: Record<string, User[]> = {}
  for (const user of hsqcs) {
    const parts = user.nhapngu.split('/')
    if (parts.length > 1) {
      const year = parts[parts.length - 1].trim() // Lấy 4 ký tự cuối sau dấu '/'
      if (!groupedUsers[year]) {
        groupedUsers[year] = []
      }
      groupedUsers[year].push(user)
    }
  }
  return groupedUsers
}

/** Nhóm HSQ CS theo quê quán */
export function nhomquequan(users: User[]) {
  return users.reduce(
    (acc, user) => {
      const parts = user.quequan.split(',')
      if (parts.length > 1) {
        const key = slugify(parts[parts.length - 1], {
          replacement: '_',
          locale: 'vi',
          lower: true,
          trim: true
        })
        if (!acc[key]) acc[key] = []
        acc[key].push(user)
      }
      return acc
    },
    {} as Record<string, User[]>
  )
}

/** Nhóm HSQ CS theo type tùy chỉnh */
export function groupByType(users: User[], type: keyof Omit<User, 'laodongchinh'>) {
  const hsqcs = filterHSQCS(users)
  const groupedUsers: Record<string, User[]> = {}
  for (const user of hsqcs) {
    const stage = user[type]
    if (stage) {
      const key = stage.toLowerCase().trim()
      if (!groupedUsers[key]) {
        groupedUsers[key] = []
      }
      groupedUsers[key].push(user)
    }
  }
  return groupedUsers
}

/** Đếm số lượng QNCN */
export function countQNCN(users: User[]): number {
  return users.reduce((count, user) => {
    return count + (isQNCN(user) ? 1 : 0)
  }, 0)
}

/** Lấy chức vụ unique của QNCN */
export function chucVuQNCN(users: User[]) {
  const qncn = users.filter((item) => isQNCN(item))
  const set = new Set(
    qncn.map((u) => u.chucvu).filter((b): b is string => b !== undefined) // loại bỏ undefined
  )
  return Array.from(set)
}

export function thongKeChucVuQNCN(users: User[]): Record<string, number> {
  const qncn = users.filter((item) => isQNCN(item))
  const jobTitleCounts: Record<string, number> = {}
  for (const user of qncn) {
    const jobTitle = user.chucvu
    if (jobTitleCounts[jobTitle]) {
      jobTitleCounts[jobTitle]++
    } else {
      jobTitleCounts[jobTitle] = 1
    }
  }

  return jobTitleCounts
}

/** Đếm số lượng đảng viên */
export function countDangVien(users: User[]): number {
  return users.reduce((count, user) => {
    return count + (user.doandang === 'dangvien' ? 1 : 0)
  }, 0)
}

/** Đếm số lượng đoàn viên */
export function countDoanVien(users: User[]): number {
  return users.reduce((count, user) => {
    return count + (user.doandang === 'doanvien' ? 1 : 0)
  }, 0)
}

/** Đếm Bt */
export function counBt(users: User[], b: string): number {
  return users.reduce((count, user) => {
    return count + (user.bienche === b && user.chucvu === 'bt' ? 1 : 0)
  }, 0)
}

/** Tìm bt trong trung đội */
export function findBt(users: User[]) {
  return users.find((item) => item.chucvu === 'bt')
}

/** Tìm chỉ huy */
export function getBCH(users: User[]) {
  return users.filter((item) => bch.includes(item.chucvu))
}

/** Sắp xếp mảng string */
export function sortArrayString(arr: string[]): string[] {
  return arr.sort((a, b) => {
    const aLower = a.toLowerCase()
    const bLower = b.toLowerCase()
    if (aLower < bLower) {
      return -1
    }
    if (aLower > bLower) {
      return 1
    }
    return 0
  })
}

/** Đếm chỉ huy */
export function countSQCH(users: User[]) {
  const ch = ['ct', 'cp', 'bt']
  return users.reduce((count, user) => {
    return count + (ch.includes(user.chucvu) ? 1 : 0)
  }, 0)
}

/** Đếm trình độ */
export function countTrinhDo(users: User[], type: string) {
  let cpm = 'Cao đẳng'
  switch (type) {
    case 'dh':
      cpm = 'Đại học'
      break
    case 'tc':
      cpm = 'Trung cấp'
      break
  }
  cpm = removeDiacritics(cpm)
  return users.reduce((count, user) => {
    return count + (removeDiacritics(user.trinhdo ?? '').includes(cpm) ? 1 : 0)
  }, 0)
}
