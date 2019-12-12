const multer = require('multer')
const blobService = require('feathers-blob')
const fs = require('fs-blob-store')
const hooks = require('./upload.hooks')
const multipartMiddleware = multer()

module.exports = (app) => {
  const blobStorage = fs(app.get('data'))
  app.use(
    '/api/upload',
    multipartMiddleware.single('uri'),
    (req, res, next) => {
      req.feathers.file = req.file
      next()
    },
    blobService({ Model: blobStorage })
  )
  const service = app.service('/api/upload')

  service.hooks(hooks)
}
