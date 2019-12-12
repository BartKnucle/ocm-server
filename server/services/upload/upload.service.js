const multer = require('multer')
//  const hooks = require('./upload.hooks')
module.exports = (app) => {
/*
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
  */

  const upload = multer({ dest: app.get('data') + '/upload/' })
  app.post('/upload', upload.single('avatar'), (req, res, next) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })
}
