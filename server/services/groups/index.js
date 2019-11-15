const Service = require('../service')

class Groups extends Service {
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
  const groups = new Groups(app)
  groups.init()
}
