const logger = require('./logger')
const devices = require('./devices')
const groups = require('./groups')

module.exports = function (app) {
  app.configure(logger)
  app.configure(devices)
  app.configure(groups)
}
