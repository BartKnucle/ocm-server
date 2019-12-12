const createModel = require('../../models/groups.model')
const { Groups } = require('./groups.class')
const hooks = require('./groups.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/groups', new Groups(options, app))
  const service = app.service('/api/groups')

  service.hooks(hooks)
}
