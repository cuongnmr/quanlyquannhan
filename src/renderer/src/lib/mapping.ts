export const mapCapBac = (capbac: string) => {
  const mapping: Record<string, string> = {
    B1: 'Binh nhất',
    B2: 'Binh nhì',
    H1: 'Hạ sỹ',
    H2: 'Trung sỹ',
    H3: 'Thượng sỹ',
    '1/': 'Thiếu úy',
    '2/': 'Trung úy',
    '3/': 'Thượng úy',
    '4/': 'Đại úy',
    '1//': 'Thiếu tá',
    '2//': 'Trung tá'
  }
  return mapping[capbac] || capbac
}

export const mapChucVu = (chucvu: string) => {
  const mapping: Record<string, string> = {
    cs: 'Chiến sĩ',
    at: 'Tiểu đội trưởng',
    bt: 'Trung đội trưởng',
    ct: 'Đại đội trưởng',
    cp: 'Phó Đại đội trưởng',
    ctv: 'Chính trị viên',
    ctvp: 'Chính trị viên phó'
  }
  return mapping[chucvu] || chucvu
}

export function mapDonVi(input: string): string {
  // Bản đồ quy tắc
  const mapping: Record<string, string> = {
    a: 'Tiểu đội',
    b: 'Trung đội',
    c: 'Đại đội',
    d: 'Tiểu đoàn'
  }

  // Regex để tách từng cặp ký tự + số
  const regex = /([abcd])(\d+)/g
  const result: string[] = []
  let match: RegExpExecArray | null

  while ((match = regex.exec(input)) !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, key, number] = match
    if (mapping[key]) {
      result.push(`${mapping[key]} ${number}`)
    }
  }

  // Ghép lại thành chuỗi
  return result.join(', ')
}

export function mapBienChe(value: string) {
  if (!/^b\d+$/i.test(value)) {
    throw new Error('Giá trị không hợp lệ, phải ở dạng b + số')
  }
  // lấy số sau chữ b
  const number = value.slice(1)
  return `Trung đội ${number}`
}

export const mapDoanDang = (doandang: string) => {
  const mapping: Record<string, string> = {
    doanvien: 'Đoàn viên',
    dangvien: 'Đảng viên'
  }
  return mapping[doandang] || doandang
}

export function getValue(key: string, input?: string) {
  if (!input) {
    return 'Chưa có thông tin'
  }
  switch (key) {
    case 'capbac':
      return mapCapBac(input)
    case 'chucvu':
      return mapChucVu(input)
    case 'donvi':
      return mapDonVi(input)
    case 'bienche':
      return mapBienChe(input)
    case 'doandang':
      return mapDoanDang(input)

    default:
      return input
  }
}
