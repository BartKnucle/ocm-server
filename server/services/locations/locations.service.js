const createModel = require('../../models/locations.model')
const { Locations } = require('./locations.class')
const hooks = require('./locations.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/locations', new Locations(options, app))
  const service = app.service('/api/locations')

  service.hooks(hooks)
}
