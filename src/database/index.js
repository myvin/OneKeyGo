const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
const db = low(adapter)

db.defaults({
  platforms: {
    juejin: {}
  },
  article: {
    title: '',
    content: ''
  }
}).write()

export default db
