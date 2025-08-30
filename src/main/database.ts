// electron/database.ts
import { dirname, join } from 'path'
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { app } from 'electron'
import { nanoid } from 'nanoid'
import fs from 'fs'

interface DBData {
  users: any[]
}
// Specify the path to the database file
const fileName = 'db.json'
const dbPath = !app.isPackaged
  ? join(app.getAppPath(), fileName)
  : join(dirname(app.getPath('exe')), fileName)
console.log('Database path:', dbPath)
const adapter = new JSONFileSync<DBData>(dbPath)
const db = new LowSync<DBData>(adapter, { users: [] })

export function initializeDb() {
  db.read()
  db.data ||= { users: [] } // Set a default data structure
  db.write()
}

// CRUD Functions
export function getUsers() {
  db.read()
  return db.data.users
}

export function getUser(id: string) {
  db.read()
  return db.data.users.find((item) => item.id === id)
}

export function createUser(user: any) {
  db.read()
  user.id = nanoid()
  db.data.users.push(user)
  db.write()
  return user
}

export function updateUser(id: string, dto: Record<string, string>) {
  db.read()
  const user = db.data.users.find((u) => u.id === id)
  if (user) {
    Object.assign(user, dto)
    db.write()
    return user
  }
  return null
}

export function deleteUser(id: string) {
  db.read()
  db.data.users = db.data.users.filter((u) => u.id !== id)
  db.write()
}

export function importDB({ fileName, fileData }: any) {
  let savePath: string

  if (app.isPackaged) {
    // Production path: Same directory as the executable
    savePath = join(dirname(app.getPath('exe')), fileName)
  } else {
    // Development path: Project root directory
    savePath = join(app.getAppPath(), fileName)
  }

  const jsonString = JSON.stringify(fileData, null, 2)
  fs.writeFileSync(savePath, jsonString)
  return savePath
}
