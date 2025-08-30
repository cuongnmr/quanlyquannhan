import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { useState } from 'react'
import { toast } from 'sonner'

const ImportDBPage = () => {
  const [fileData, setFileData] = useState(null)
  const [status, setStatus] = useState('')
  const fileName = 'db.json'

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target!.result as string)
          setFileData(content)
          setStatus('Tải file thành công. Nhấn "Lưu" để lưu file.')
        } catch (error) {
          console.error(error)
          setStatus('Error parsing JSON file.')
          setFileData(null)
        }
      }
      reader.readAsText(file)
    }
  }

  // Save the file via Electron's main process
  const handleSaveFile = async () => {
    if (fileData) {
      try {
        const filePath = await window.api.importDatabase({ fileName, fileData })
        console.log(filePath)
        toast.success('Cập nhật thành công')
      } catch (error) {
        toast.error('Cập nhật không thành công')
        console.error(error)
      }
    } else {
      setStatus('No data to save.')
    }
  }

  return (
    <div className="p-3 space-y-3">
      <h1 className="font-bold text-3xl">Cập nhật CSDL</h1>
      <div className="flex items-end w-full max-w-sm gap-3">
        <div className="flex-1 space-y-3">
          <Label htmlFor="db">Chọn tập tin</Label>
          <Input id="db" type="file" onChange={handleFileChange} />
        </div>
        <Button onClick={handleSaveFile} disabled={!fileData}>
          Lưu {fileName}
        </Button>
      </div>
      <p>{status}</p>
    </div>
  )
}

export default ImportDBPage
