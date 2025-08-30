import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getUsers: () => Promise<User[]>
      getUser: (id: string) => Promise<User>
      createUser: (user: User) => Promise<User>
      updateUser: (id: string, data: Record<string, string>) => Promise<User | null>
      deleteUser: (id: string) => Promise<void>
      importDatabase: (file: any) => Promise<void>
    }
  }
}
