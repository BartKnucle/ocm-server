const createModel = require('../../models/images.model')
const { Images } = require('./images.class')
const hooks = require('./images.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/api/images', new Images(options, app))
  const service = app.service('/api/images')

  service.hooks(hooks)
}
