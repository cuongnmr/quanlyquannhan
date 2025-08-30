interface Personal {
  id: string
  hoten: string
  ngaysinh: string
  nhapngu: string
  capbac: string
  chucvu: string
  donvi: string
  vanhoa: string
  vaodoan?: string
  vaodang?: string
  dantoc: string
  tongiao: string
  khokhan?: string
  doandang?: string
  sohieuqn?: string
  capbacheso?: string
  thanhphan: string
  thuongtru: string
  sothedang?: string
  truocnhapngu?: string
  truongquandoi?: string
  nuocngoai?: string
  sotruong?: string
  laodongchinh?: boolean
  nguoithandinuocngoai?: string
  bomebichatdocdacam?: string
  conguoitrongquandoi?: string
  phatgiamcaitao?: string
  tomtatcongtac?: string
  bienche?: string
  trinhdo?: string
  tentruong?: string
  quequan: string
}

interface Parent {
  hotenbo?: string
  namsinhbo?: string
  sdtbo?: string
  nghenghiepbo?: string
  nammatbo?: string
  quequanbo?: string
  truquanbo?: string
  hotenme?: string
  namsinhme?: string
  sdtme?: string
  nghenghiepme?: string
  nammatme?: string
  quequanme?: string
  truquanme?: string
  bomelyhon?: string
}

export type User = Personal & Parent

export const userProps: Record<string, string> = {
  hoten: 'Họ và tên',
  ngaysinh: 'Ngày sinh',
  nhapngu: 'Ngày nhập ngũ',
  capbac: 'Cấp bậc',
  chucvu: 'Chức vụ',
  donvi: 'Đơn vị',
  vanhoa: 'Văn hóa',
  trinhdo: 'Trình độ',
  tentruong: 'Tên trường',
  vaodoan: 'Ngày vào Đoàn',
  vaodang: 'Ngày vào Đảng',
  dantoc: 'Dân tộc',
  tongiao: 'Tôn giáo',
  khokhan: 'Hoàn cảnh khó khăn',
  doandang: 'Đoàn Đảng',
  sohieuqn: 'Số hiệu quân nhân',
  capbacheso: 'Cấp bậc (hệ số)',
  thanhphan: 'Thành phần gia đình',
  quequan: 'Quê quán',
  thuongtru: 'Hộ khẩu thường trú',
  sothedang: 'Số thẻ Đảng',
  truocnhapngu: 'Nghề nghiệp trước khi nhập ngũ',
  truongquandoi: 'Trường quân đội đã học',
  nuocngoai: 'Đã đi nước ngoài',
  sotruong: 'Sở trường',
  laodongchinh: 'Lao động chính trong gia đình',
  nguoithandinuocngoai: 'Người thân đi nước ngoài',
  bomebichatdocdacam: 'Bố/mẹ bị chất độc da cam',
  conguoitrongquandoi: 'Có người thân trong quân đội',
  phatgiamcaitao: 'Đã từng bị phạt giam/cải tạo',
  tomtatcongtac: 'Tóm tắt quá trình công tác',
  hotenbo: 'Họ tên bố',
  namsinhbo: 'Năm sinh bố',
  sdtbo: 'SĐT bố',
  nghenghiepbo: 'Nghề nghiệp bố',
  nammatbo: 'Năm mất bố',
  quequanbo: 'Quê quán bố',
  truquanbo: 'Nơi trú quán bố',
  hotenme: 'Họ tên mẹ',
  namsinhme: 'Năm sinh mẹ',
  sdtme: 'SĐT mẹ',
  nghenghiepme: 'Nghề nghiệp mẹ',
  nammatme: 'Năm mất mẹ',
  quequanme: 'Quê quán mẹ',
  truquanme: 'Nơi trú quán mẹ',
  con: 'Con cái',
  anhchiem: 'Anh chị em',
  bomelyhon: 'Bố mẹ ly hôn'
}
