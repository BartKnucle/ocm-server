
const createModel = require('../../models/subnets.model')
const { Subnets } = require('./subnets.class')
const hooks = require('./subnets.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    // paginate: app.get('paginate'),
    multi: true,
    whitelist: [ '$search' ]
  }

  app.use('/api/subnets', new Subnets(options, app))
  const service = app.service('/api/subnets')

  service.hooks(hooks)
}
