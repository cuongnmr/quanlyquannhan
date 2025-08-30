import slugify from 'slugify'

export function removeDiacritics(text: string) {
  return slugify(text, {
    replacement: ' ', // thay thế bằng space
    lower: true, // giữ nguyên chữ hoa/thường
    strict: true, // không loại bỏ ký tự đặc biệt
    locale: 'vi' // hỗ trợ tiếng Việt
  })
}
