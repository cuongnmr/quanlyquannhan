import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  USER_GET_CHANNEL,
  USER_GET_ONE_CHANNEL,
  USER_CREATE_CHANNEL,
  USER_UPDATE_CHANNEL,
  USER_DELETE_CHANNEL,
  USER_UPDATE_BULK_CHANNEL
} from '../main/channels'

// Custom APIs for renderer
const api = {
  getUsers: () => ipcRenderer.invoke(USER_GET_CHANNEL),
  getUser: (id) => ipcRenderer.invoke(USER_GET_ONE_CHANNEL, id),
  createUser: (user) => ipcRenderer.invoke(USER_CREATE_CHANNEL, user),
  updateUser: (id, data) => ipcRenderer.invoke(USER_UPDATE_CHANNEL, id, data),
  updateBulkUser: (ids, data) => ipcRenderer.invoke(USER_UPDATE_BULK_CHANNEL, ids, data),
  deleteUser: (id) => ipcRenderer.invoke(USER_DELETE_CHANNEL, id),
  importDatabase: (file) => ipcRenderer.invoke('import:db', file)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
