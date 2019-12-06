const dataChanged = require('../../hooks/dataChanged')
const ruleEvaluateItem = require('../../hooks/ruleEvaluateItem')

const evaluate = (options = {}) => {
  return (context) => {
    context.data.group = ''
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
    create: [ruleEvaluateItem()],
    update: [ruleEvaluateItem()],
    patch: [ruleEvaluateItem()],
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
