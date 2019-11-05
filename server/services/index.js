const devices = require('./devices/service.js')

module.exports = function (app) {
  app.configure(devices)
}
