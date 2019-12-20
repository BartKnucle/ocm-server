const dataChanged = require('../../hooks/dataChanged')
const addSubnet = require('../../hooks/addSubnet')
const ruleEvaluateItem = require('../../hooks/ruleEvaluateItem')

const evaluate = (options = {}) => {
  return (context) => {
    context.data.groups = []
    return context
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [addSubnet()],
    update: [dataChanged(), addSubnet()],
    patch: [dataChanged(), addSubnet()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
