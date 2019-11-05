// Initializes the `users` service on path `/users`
const socketio = require('@feathersjs/socketio')
const createService = require('feathers-nedb')
const createModel = require('../../models/connections.model')
const hooks = require('./hooks')

class Connections {
  constructor (app) {
    this.app = app
  }

  setup () {
    this.app.configure(socketio((io) => {
      io.on('connection', this.onConnection)
    }))
  }

  onConnection (socket) {
    console.log(socket)
  }
}

module.exports = function (app) {
  const connections = new Connections(app)
  connections.setup()

  const Model = createModel(app)
  // const paginate = app.get('paginate')

  const options = {
    Model
  }

  // Initialize our service with any options it requires
  app.use('connections', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('connections')

  service.hooks(hooks)
}
