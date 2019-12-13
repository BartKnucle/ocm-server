const path = require('path')
const NeDB = require('nedb')

module.exports = function (app) {
  const dbPath = app.get('dbPath')
  const Model = new NeDB({
    filename: path.join(dbPath, 'users.db'),
    autoload: true
  })

  return Model
}
