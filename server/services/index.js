const connections = require('./connections/service.js')
const devices = require('./devices/service.js')

module.exports = function (app) {
  app.configure(connections)
  app.configure(devices)
}
