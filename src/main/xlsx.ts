import xlsx from 'xlsx'
import { dialog } from 'electron'
import { join } from 'path'

export async function exportExcel(data: any, fileName: string) {
  const worksheet = xlsx.utils.json_to_sheet(data)
  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Users')
  const { filePath } = await dialog.showSaveDialog({
    title: 'Lưu thành file excel',
    defaultPath: join(process.env.USERPROFILE!, 'Downloads', fileName),
    filters: [{ name: 'Excel Files', extensions: ['xlsx'] }],
    buttonLabel: 'Lưu'
  })
  if (filePath) {
    try {
      xlsx.writeFile(workbook, filePath)
      dialog.showMessageBox({
        type: 'info',
        title: 'Xuất dữ liệu thành công',
        message: `Danh sách quân nhân đã được lưu vào ${filePath}`
      })
    } catch (error) {
      if (error instanceof Error) {
        dialog.showErrorBox('Export Error', `Failed to export file: ${error.message}`)
      }
    }
  }
}
