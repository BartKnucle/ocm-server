const Service = require('../../service')

class Interfaces extends Service {
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
