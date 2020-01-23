const ServiceClass = require('../service.class')

exports.Users = class Users extends ServiceClass {
  setup (app) {
    app.on('login', this.onConnect.bind(this))
    app.on('disconnect', this.onDisconnect.bind(this))

    super.setup(app)
  }

  setOnline(userId) {
    this.patch(
      userId,
      { online: true }
    )
    .catch((err) => {
      return err
    })
  }

  setOffline(userId) {
    this.patch(
      userId,
      { online: false }
    )
    .catch((err) => {
      return err
    })
  }

  //  On user connection
  onConnect (authResult) {
    this.setOnline(authResult.user._id)
    switch (authResult.user.type) {
      case 'device':
        this.app.service('/api/devices').setOnline(authResult.user._id)
        break
    
      default:
        break
    }
  }

  //  On user diconnection
  onDisconnect (connection) {
    this.setOffline(connection.user._id)
    switch (connection.user.type) {
      case 'device':
        this.app.service('/api/devices').setOffline(connection.user._id)
        break
    
      default:
        break
    }
  }
}
