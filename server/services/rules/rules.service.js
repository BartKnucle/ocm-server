const createModel = require('../../models/rules.model')
const { Rules } = require('./rules.class')
const hooks = require('./rules.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/rules', new Rules(options, app))
  const service = app.service('/api/rules')

  service.hooks(hooks)
}
