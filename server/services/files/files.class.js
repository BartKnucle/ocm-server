const ServiceClass = require('../service.class')
const fs = require('fs')
const path = require('path')


exports.Files = class Files extends ServiceClass {
  setup (app) {
    super.setup(app)
    this.clear()
  }

  // Sync files and database
  clear() {
    fs.readdir(path.join(this.app.get('homePath'), '/files/'), (err, files) => {
      files.map((file) => {
        //  Remove local file
        this.get(file)
          .catch(() => {
            fs.unlink(path.join(this.app.get('homePath'), '/files/' + file), (err) => {})
          })
      })
    })

    //  Remove database record if the file is not present
    this.find()
      .then((files) => {
        files.data.map((file) => {
          fs.exists(path.join(this.app.get('homePath'), '/files/' + file._id), (exist) => {
            if (!exist) {
              this.remove(file._id)
            }
          })
        })
      })
  }
}
