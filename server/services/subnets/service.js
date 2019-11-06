// Initializes the `users` service on path `/users`
const createService = require('feathers-nedb')
const createModel = require('../../models/subnets.model')
const hooks = require('./hooks')

module.exports = function (app) {
  const Model = createModel(app)
  // const paginate = app.get('paginate')

  const options = {
    Model
  }

  // Initialize our service with any options it requires
  app.use('subnets', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('subnets')

  service.hooks(hooks)
}
