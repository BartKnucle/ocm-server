const dauria = require('dauria')

const convertToUri = (context) => {
  if (!context.data.uri && context.params.file) {
    const file = context.params.file
    const uri = dauria.getBase64DataURI(file.buffer, file.mimetype)
    context.data = { uri }
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [convertToUri],
    update: [],
    patch: [],
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
