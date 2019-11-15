const Service = require('../../service')

class Interfaces extends Service {
  constructor (app) {
    super(app)
    this.hooks = require('./hooks')
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
  const interfaces = new Interfaces(app)
  interfaces.init()
}
