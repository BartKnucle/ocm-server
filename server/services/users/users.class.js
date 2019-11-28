const ServiceClass = require('../service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
    app.on('login', (authResult, { connection }) => {
      this.patch(
        authResult.user._id,
        { online: true }
      )
    })

    app.on('disconnect', (connection) => {
      if (connection.user) {
        this.patch(
          connection.user._id,
          { online: false }
        )
          .catch((err) => {
            console.log(err)
          })
      }
    })

    super.setup(app)
  }
}
