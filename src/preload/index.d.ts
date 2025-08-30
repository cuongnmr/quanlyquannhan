import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getUsers: () => Promise<User[]>
      getUser: (id: string) => Promise<User>
      createUser: (user: User) => Promise<User>
      updateUser: (id: string, data: Record<string, string>) => Promise<User | null>
      updateBulkUser: (ids: string[], data: Record<string, string>) => Promise<User[]>
      deleteUser: (id: string) => Promise<void>
      importDatabase: (file: any) => Promise<void>
      exportExcel: (fileName: string, data: any) => Promise<void>
    }
  }
}
