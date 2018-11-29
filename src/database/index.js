const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
const db = low(adapter)

db.defaults({
  platforms: {
    juejin: {
      token: '',
      clientId: '',
      userId: ''
    }
  },
  article: ''
}).write()

export default db
