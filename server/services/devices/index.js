const Service = require('../service')
const interfaces = require('./interfaces')

class Devices extends Service {
  constructor (app) {
    super(app)
    this.hooks = require('./hooks')
    app.configure(interfaces)
  }

  init () {
    super.init()
  }

  fill () {
    super.fill()
  }

  push () {
    super.push()
  }
}

module.exports = function (app) {
  const devices = new Devices(app)
  devices.init()
}
