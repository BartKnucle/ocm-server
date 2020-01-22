const events = require('events')
const io = require('socket.io-client')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const auth = require('@feathersjs/authentication-client')

exports.Device = class Device {
  constructor (id, params) {
    this.id = id
    this.params = params
    this.url = 'https://localhost:3001'
    this.eventEmitter = new events.EventEmitter()
    this.eventEmitter.addListener('endStart', this.runSimulate.bind(this))
    this.eventEmitter.addListener('endRun', this.stopSimulate.bind(this))
    this.startSimulate()
  }

  // Connect the device
  connect () {
    this.client = feathers()
    this.credentials = {
      _id: this.id.toString(),
      password: this.id.toString()
    }

    // Configure our client (hooks, auth, connection)
    const socket = io(this.url, { secure: true, reconnect: true, rejectUnauthorized: false, timeout: 15000 })
    this.client.configure(socketio(socket))
    this.client.configure(auth())

    const authenticate = () => {
      this.client.service('/api/authentication').create({ ...this.credentials, strategy: 'local' })
        .then(() => {
          this.eventEmitter.emit('connected')
        })
        .catch(() => {})
    }

    this.client.service('/api/users').create(this.credentials)
      .then(() => {
        authenticate()
      })
      .catch(() => {
        authenticate()
      })
  }

  // Disconnect the device
  disconnect () {
    this.client.io.disconnect()
  }

  // Manage the node simulation
  startSimulate () {
    const startOperations = () => {
      this.eventEmitter.addListener('connected', () => {
        this.setDeviceNetwork()
        this.eventEmitter.emit('endStart')
      })

      this.connect()
    }

    setTimeout(startOperations.bind(this), this.params.start)
  }

  runSimulate () {
    this.simStarted = process.hrtime()

    const runOperations = () => {
      // Current simulation time
      const simCurrent = process.hrtime()
      const remaining = this.params.run * 60 - (simCurrent[0] - this.simStarted[0])

      //  Stop
      if (remaining <= 0) {
        setTimeout(this.disconnect.bind(this), this.params.stop)
        this.eventEmitter.emit('endRun')
        clearInterval(this.interval)
      }
    }

    this.interval = setInterval(runOperations.bind(this), 1000)
  }

  stopSimulate () {
    const stopOperations = () => {
      this.disconnect.bind(this)
      this.eventEmitter.emit('endStop')
    }

    setTimeout(stopOperations.bind(this), this.params.start)
  }

  // Set device network informations
  setDeviceNetwork () {
    const subnet = Math.round(Math.random() * 40).toString()
    this.client.service('/api/devices')
      .create({
        _id: this.id.toString(),
        os_hostname: this.id.toString(),
        net_ip4_subnet: '172.20.' + subnet + '.17/24',
        net_gatewayV4: '172.20.' + subnet + '.1'
      })
      .catch(() => {
        this.client.service('/api/devices')
          .patch(
            this.id.toString(),
            {
              os_hostname: this.id.toString(),
              net_ip4_subnet: '172.20.' + subnet + '.17/24',
              net_gatewayV4: '172.20.' + subnet + '.1'
            }
          )
      })
  }
}
