const updated = require('../../hooks/updated')

const addSubnet = (options = {}) => {
  return (context) => {
    context.app.service('/api/subnets').add(context.result.net_ip4_subnet, context.result.net_gatewayV4)
    return context
  }
}

// Manage the relationhips
const getRelationships = (options = {}) => {
  return async (context) => {
    const data = await context.result.data.map(async (device) => {
      device.subnet = await context.app.service('/api/subnets').get(device.net_gatewayV4)
      device.location = await context.app.service('/api/locations').get(device.subnet.location)
      return device
    })
    context.result.data = await Promise.all(data)
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
    find: [getRelationships()],
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
