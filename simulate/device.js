const io = require('socket.io-client')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const auth = require('@feathersjs/authentication-client')

exports.Device = class Device {
  constructor(id, params) {
    this.id = id
    this.params = params
    this.connected = false
    this.url = 'https://localhost:3001'
    this.startSimulate()
  }

  // Connect the device
  connect() {
    this.client = feathers()
    this.credentials = {
      _id: this.id.toString(),
      password: this.id.toString()
    }

    // Configure our client (hooks, auth, connection)
    const socket = io(this.url, { secure: true, reconnect: true, rejectUnauthorized: false })
    this.client.configure(socketio(socket))
    this.client.configure(auth())

    const authenticate = () => {
      this.client.service('/api/authentication').create({ ...this.credentials, strategy: 'local' })
        .then(() => {
          this.connected = true
          console.log('Connected ' + this.id)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  
    this.client.service('/api/users').create(this.credentials)
      .then(() => {
        authenticate()
      })
      .catch((err) => {
        authenticate()
      })

  }

  // Disconnect the device
  disconnect() {
    this.connected = false
    console.log('Disonnected ' + this.id)
  }

  // Execute an action
  execute() {
    // Current simulation time
    const simCurrent = process.hrtime()
    const remaining = this.params.simulate * 60 - ( simCurrent[0] - this.simStarted[0] )

    //  Stop
    if (remaining <= 0) {
      clearInterval(this.interval)
      setTimeout(this.disconnect.bind(this), this.params.stop)
    }
  }
  
  // Manage the node simulation
  startSimulate() {
    //  Start
    setTimeout(this.connect.bind(this), this.params.start)

    //  Run
    this.simStarted = process.hrtime()
    this.interval = setInterval(this.execute.bind(this), 1000)
  }
}
