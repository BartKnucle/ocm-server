const { hashPassword } = require('@feathersjs/authentication-local').hooks

const Service = require('../service')

class Users extends Service {
  constructor (app) {
    super(app)

    this.hooks.before.create.push(hashPassword('password'))
    this.hooks.before.update.push(hashPassword('password'))
    this.hooks.before.patch.push(hashPassword('password'))
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
  const users = new Users(app)
  users.init()
}
