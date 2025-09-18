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

export function mapBienChe(input: string): string {
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
      return mapBienChe(input)
    case 'bienche':
      return mapBienChe(input)
    case 'doandang':
      return mapDoanDang(input)

    default:
      return input
  }
}

export const VietNamProvinces = {
  tuyen_quang: 'Tuyên Quang',
  lao_cai: 'Lào Cai',
  thai_nguyen: 'Thái Nguyên',
  phu_tho: 'Phú Thọ',
  bac_ninh: 'Bắc Ninh',
  hung_yen: 'Hưng Yên',
  hai_phong: 'Hải Phòng',
  ninh_binh: 'Ninh Bình',
  quang_tri: 'Quảng Trị',
  da_nang: 'Đà Nẵng',
  quang_ngai: 'Quảng Ngãi',
  gia_lai: 'Gia Lai',
  khanh_hoa: 'Khánh Hòa',
  lam_dong: 'Lâm Đồng',
  dak_lak: 'Đắk Lắk',
  tp_ho_chi_minh: 'TP. Hồ Chí Minh',
  dong_nai: 'Đồng Nai',
  tay_ninh: 'Tây Ninh',
  can_tho: 'Cần Thơ',
  vinh_long: 'Vĩnh Long',
  dong_thap: 'Đồng Tháp',
  ca_mau: 'Cà Mau',
  an_giang: 'An Giang',
  ha_noi: 'Hà Nội',
  hue: 'Huế',
  lai_chau: 'Lai Châu',
  dien_bien: 'Điện Biên',
  son_la: 'Sơn La',
  lang_son: 'Lạng Sơn',
  quang_ninh: 'Quảng Ninh',
  thanh_hoa: 'Thanh Hóa',
  nghe_an: 'Nghệ An',
  ha_tinh: 'Hà Tĩnh',
  cao_bang: 'Cao Bằng'
} as const

export function getProvince(input: string) {
  return VietNamProvinces[input] ?? ''
}
