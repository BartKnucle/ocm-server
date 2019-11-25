const createModel = require('../../models/setup.model')
const { Setup } = require('./setup.class')
const hooks = require('./setup.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/setup', new Setup(options, app))
  const service = app.service('setup')

  service.hooks(hooks)
}
