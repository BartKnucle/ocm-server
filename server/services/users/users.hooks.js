const { hashPassword } = require('@feathersjs/authentication-local').hooks
const setOnline = require('../../hooks/setOnline')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hashPassword('password')],
    update: [hashPassword('password')],
    patch: [hashPassword('password')],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [setOnline()],
    update: [setOnline()],
    patch: [setOnline()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
