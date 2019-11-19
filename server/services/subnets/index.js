const Service = require('../service')

class Subnets extends Service {
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
  const subnets = new Subnets(app)
  subnets.init()
}
