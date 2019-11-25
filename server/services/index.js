const setup = require('./setup/setup.service')
const logger = require('./logger/logger.service')
const users = require('./users/users.service')
const subnets = require('./subnets/subnets.service')
const devices = require('./devices/devices.service')
const groups = require('./groups/groups.service')

module.exports = function (app) {
  app.configure(setup)
  app.configure(logger)
  app.configure(users)
  app.configure(subnets)
  app.configure(devices)
  app.configure(groups)
}
