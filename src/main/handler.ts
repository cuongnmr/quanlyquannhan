import { ipcMain } from 'electron'
import { createUser, deleteUser, getUser, getUsers, importDB, updateUser } from './database'
import {
  USER_CREATE_CHANNEL,
  USER_DELETE_CHANNEL,
  USER_GET_CHANNEL,
  USER_GET_ONE_CHANNEL,
  USER_UPDATE_CHANNEL
} from './channels'

export function ipcHandler() {
  ipcMain.handle(USER_GET_CHANNEL, getUsers)
  ipcMain.handle(USER_CREATE_CHANNEL, (_, user) => createUser(user))
  ipcMain.handle(USER_UPDATE_CHANNEL, (_, id, data) => updateUser(id, data))
  ipcMain.handle(USER_DELETE_CHANNEL, (_, id) => deleteUser(id))
  ipcMain.handle(USER_GET_ONE_CHANNEL, (_, id) => getUser(id))
  ipcMain.handle('import:db', (_, file) => importDB(file))
}
