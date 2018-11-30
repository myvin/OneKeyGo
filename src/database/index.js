import menuModule from '@/store/modules/menu'
import path from 'path'
import { remote, app } from 'electron'

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// resolve permission denied error
const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('userData')

const adapter = new FileSync(path.join(STORE_PATH, '/db.json'))
const db = low(adapter)

const items = menuModule.state.items
let publishSettings = {}
let platforms = []

for (let i = 0, len = items.length; i < len; i++) {
  if (items[i].name === 'Platforms') {
    platforms = items[i].children
    break
  }
}

platforms.forEach(item => {
  publishSettings[item.name.toLowerCase()] = true
})

db.defaults({
  platforms: {
    juejin: {}
  },
  article: {
    title: '',
    content: ''
  },
  settings: {
    // 默认开启
    publish: publishSettings
  }
}).write()

export default db
