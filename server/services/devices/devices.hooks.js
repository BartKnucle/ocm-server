const updated = require('../../hooks/updated')
const dataChanged = require('../../hooks/dataChanged')

const addSubnet = (options = {}) => {
  return (context) => {
    context.app.service('/api/subnets').add(context.result.net_ip4_subnet, context.result.net_gatewayV4)
    return context
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [updated()],
    update: [updated()],
    patch: [updated()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addSubnet()],
    update: [addSubnet()],
    patch: [addSubnet()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
