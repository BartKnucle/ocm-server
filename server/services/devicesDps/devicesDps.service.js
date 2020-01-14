const createModel = require('../../models/devicesDps.model')
const { DevicesDps } = require('./devicesDps.class')
const hooks = require('./devicesDps.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/api/devicesdps', new DevicesDps(options, app))
  const service = app.service('/api/devicesdps')

  service.hooks(hooks)
}
