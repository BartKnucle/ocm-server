import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '../apis/local'

const serviceName = '/api/devicesdps'

// Extend the base class
class DevicesDp extends BaseModel {
  static modelName = serviceName
}

const servicePlugin = makeServicePlugin({
  Model: DevicesDp,
  service: feathersClient.service(serviceName),
  serviceName
})

// Optionally add service-level hooks, here:
feathersClient.service(serviceName).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
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
})

export default servicePlugin
