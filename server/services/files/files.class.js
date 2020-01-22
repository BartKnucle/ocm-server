const fs = require('fs')
const path = require('path')
const ServiceClass = require('../service.class')

exports.Files = class Files extends ServiceClass {
  setup (app) {
    super.setup(app)
    this.clear()
  }

  // Sync files and database
  clear () {
    fs.readdir(path.join(this.app.get('homePath'), '/files/'), (err, files) => {
      if (err) {
        return err
      }
      files.map((file) => {
        //  Remove local file
        this.get(file)
          .catch(() => {
            fs.unlink(path.join(this.app.get('homePath'), '/files/' + file), (err) => {
              if (err) {
                return err
              }
            })
          })
      })
    })

    //  Remove database record if the file is not present
    this.find()
      .then((files) => {
        files.data.map((file) => {
          fs.access(path.join(this.app.get('homePath'), '/files/' + file._id), fs.constants.F_OK, (err) => {
            if (err) {
              this.remove(file._id)
            }
          })
        })
      })
  }
}
