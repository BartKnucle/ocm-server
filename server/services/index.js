const devices = require('./devices/service.js')
const groups = require('./groups/service.js')
const subnets = require('./subnets/service.js')

module.exports = function (app) {
  app.configure(devices)
  app.configure(groups)
  app.configure(subnets)
}
