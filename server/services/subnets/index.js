const IPCIDR = require("ip-cidr")
const Service = require('../service')

class Subnets extends Service {
  init () {
    super.init()
  }

  fill () {
    super.fill()
  }

  push () {
    super.push()
  }

  add (subnet, gateway) {
    const cidr = new IPCIDR(subnet)
    this.data[gateway] = {
      start: cidr.start(),
      end: cidr.end()
    }
  }
}

module.exports = function (app) {
  const subnets = new Subnets(app)
  subnets.init()
}
