const Service = require('../service')
const interfaces = require('./interfaces')

class Devices extends Service {
  constructor (app) {
    super(app)

    const updateSubnet = (options = {}) => {
      return (context) => {
        const { data } = context
        if (data.ip4_subnet && data.gatewayV4) {
          this.app.subnets.add(data.ip4_subnet, data.gatewayV4)
        }
        return context
      }
    }

    this.hooks.after.create.push(updateSubnet())
    this.hooks.after.update.push(updateSubnet())
    this.hooks.after.patch.push(updateSubnet())

    app.configure(interfaces)
  }

  init () {
    super.init()
  }

  fill () {
    super.fill()
  }

  push () {
    super.push()
  }
}

module.exports = function (app) {
  const devices = new Devices(app)
  devices.init()
}
