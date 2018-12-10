import path from 'path'
import { remote, app } from 'electron'

const _ = require('lodash')
const menuModule = require('@/store/modules/menu')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// resolve permission denied error
const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('userData')

const adapter = new FileSync(path.join(STORE_PATH, '/db.json'))
const db = low(adapter)

const items = (menuModule.state || []).items || []
let publishSettings = {}
let platforms = []

for (let i = 0, len = items.length; i < len; i++) {
  if (items[i].name === 'Platforms') {
    platforms = items[i].children
    break
  }
}

platforms.forEach(item => {
  publishSettings[item.name] = true
})

db.defaults({
  platforms: {
    juejin: {},
    segmentFault: {}
  },
  article: {
    content: {
      html: '',
      md: ''
    }
  },
  settings: {
    // 默认开启
    publish: publishSettings
  }
}).write()

if (_.isUndefined(db.read().get('platforms.segmentFault.tags').value())) {
  db.set('platforms.segmentFault.tags', []).write()
}

if (_.isEmpty(db.read().get('article.content.html').value())) {
  db.set('article.content.html', '').write()
}

if (_.isEmpty(db.read().get('article.content.md').value())) {
  db.set('article.content.md', '').write()
}

export default db
