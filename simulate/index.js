const  { Device } = require('./device')
let devices = []

const nbDevices = 500
const start = 1 // Time in minutes to load all devices
const simulate = 2 // Siumlation duration in minutes
const stop = 1 // Time in minutes to stop all devies

for (var i = 0; i < nbDevices; i++) {
  devices.push(
    new Device(
      i,
      {
        start: ( start * 60000 / nbDevices ) * Math.floor(Math.random() * nbDevices + 1),
        simulate,
        stop: ( stop * 60000 / nbDevices ) * Math.floor(Math.random() * nbDevices + 1)
      }
    )
  )
}

// Start ramp
console.log(devices)