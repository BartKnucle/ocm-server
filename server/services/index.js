const logger = require('./logger')
const subnets = require('./subnets')
const devices = require('./devices')
const groups = require('./groups')

module.exports = function (app) {
  app.configure(logger)
  app.configure(subnets)
  app.configure(devices)
  app.configure(groups)
}
