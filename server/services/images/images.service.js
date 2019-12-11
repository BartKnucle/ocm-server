const createModel = require('../../models/images.model')
const { Images } = require('./images.class')
const hooks = require('./images.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  }

  app.use('/images', new Images(options, app))
  const service = app.service('images')

  service.hooks(hooks)
}
