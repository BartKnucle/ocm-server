const IPCIDR = require('ip-cidr')
const ServiceClass = require('../service.class')

exports.Subnets = class Subnets extends ServiceClass {
  add (subnet, gateway) {
    if (subnet && gateway) {
      const cidr = new IPCIDR(subnet)
      this.create({
        _id: gateway,
        start: cidr.start(),
        end: cidr.end()
      })
        .catch(() => {
          this.patch(gateway, {
            start: cidr.start(),
            end: cidr.end()
          })
        })
    }
  }
}
