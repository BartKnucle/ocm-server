const { Device } = require('./device')
const devices = []

const nbDevices = 500
const start = 3 // Time in minutes to load all devices
const run = 1 // Siumlation duration in minutes
const stop = 3 // Time in minutes to stop all devies

for (let i = 0; i < nbDevices; i++) {
  devices.push(
    new Device(
      i,
      {
        start: (start * 60000 / nbDevices) * Math.floor(Math.random() * nbDevices + 1),
        run,
        stop: (stop * 60000 / nbDevices) * Math.floor(Math.random() * nbDevices + 1)
      }
    )
  )
}
