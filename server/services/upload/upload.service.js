const blobService = require('feathers-blob')
const fs = require('fs-blob-store')
const hooks = require('./upload.hooks')

module.exports = (app) => {
  const blobStorage = fs(__dirname)
  app.use('/api/upload', blobService({ Model: blobStorage }))
  const service = app.service('/api/upload')

  service.hooks(hooks)
}
