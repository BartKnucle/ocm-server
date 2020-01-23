const ServiceClass = require('../service.class')

exports.Devices = class Devices extends ServiceClass {
  setOnline(deviceId) {
    this.patch(
      deviceId,
      { online: true }
    )
    .catch((err) => {
      return err
    })
  }

  setOffline(deviceId) {
    this.patch(
      deviceId,
      { online: false }
    )
    .catch((err) => {
      return err
    })
  }
}
