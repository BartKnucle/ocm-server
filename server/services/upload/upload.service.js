const path = require('path')
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

  const upload = multer({ dest: path.join(app.get('homePath'), '/upload/') })
  app.post('/upload', upload.single('avatar'), (req, res, next) => {
    if (req.file) {
      res.send(req.file.filename)
    }
  })
}
