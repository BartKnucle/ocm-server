// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb')
const createModel = require('../../models/groups.model')
const hooks = require('./hooks')

module.exports = function (app) {
  const Model = createModel(app)
  // const paginate = app.get('paginate')

  const options = {
    Model
  }

  // Initialize our service with any options it requires
  app.use('groups', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('groups')

  service.hooks(hooks)
}
