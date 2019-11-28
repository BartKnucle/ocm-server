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
    create: [evaluate()],
    update: [dataChanged()],
    patch: [dataChanged()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addSubnet(), ruleEvaluateItem()],
    update: [addSubnet(), ruleEvaluateItem()],
    patch: [addSubnet(), ruleEvaluateItem()],
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
