import menuModule from '@/store/modules/menu'

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
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
