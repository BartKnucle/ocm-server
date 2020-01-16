const ServiceClass = require('../service.class')

exports.DevicesDps = class DevicesDps extends ServiceClass {
  find() {
    return super.find()
      .then(async (dps) => {
        return this.app.service('/api/devices').find({
          query: {
            _id: {
              $in: dps.data.map(dp => dp._id)
            },
            online: true
          }
        })
      })
  }
}
