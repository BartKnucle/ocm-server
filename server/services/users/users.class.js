const ServiceClass = require('../service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
    app.on('login', (authResult, { connection }) => {
      this.patch(
        authResult.user._id,
        {online: true}
      )
    })

    app.on('disconnect', (connection) => {
      this.patch(
        connection.user._id,
        {online: false}
      )
    })

    super.setup(app)
  }
}
