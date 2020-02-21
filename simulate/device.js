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
    this.subnetsCount = params.nbDevices / 20
    this.startSimulate()
  }

  // Connect the device
  connect () {
    this.client = feathers()
    this.credentials = {
      _id: this.id.toString(),
      password: this.id.toString(),
      type: 'device'
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
        this.setDeviceInfos()
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

    this.interval = setInterval(runOperations.bind(this), Math.floor(Math.random() * this.params.run * 6000))
  }

  stopSimulate () {
    const stopOperations = () => {
      this.disconnect.bind(this)
      this.eventEmitter.emit('endStop')
    }

    setTimeout(stopOperations.bind(this), this.params.start)
  }

  // Set machine informations
  setDeviceInfos () {
    const manufacturers = [
      {
        name: 'Dell Inc.',
        models: [
          'Latitude E5570',
          'Latitude E5480',
        ]
      },
      {
        name: 'HP',
        models: [
          'HP E5570',
          'HP E5480',
        ]
      },
      {
        name: 'Toshiba',
        models: [
          'Toshiba E5570',
          'Toshiba E5480',
        ]
      },
      {
        name: 'Lenovo',
        models: [
          'Lenovo E5570',
          'Lenovo E5480',
        ]
      },
      {
        name: 'IBM',
        models: [
          'IBM E5570',
          'IBM E5480',
        ]
      }
    ]

    const platforms= [
      {
        name: 'win32',
        distros: [
          'Microsoft Windows 10 Entreprise',
          'Microsoft Windows 7 Entreprise',
          'Microsoft Windows XP',
        ]
      },
      {
        name: 'linux',
        distros: [
          'Ubuntu 18.04',
          'Ubuntu 18.04'
        ]
      }
    ]

    const archs= [
      'x64',
      'x86'
    ]

    //  Set IDs
    const manuId = Math.floor(Math.random()*manufacturers.length)
    const osId = Math.floor(Math.random()*platforms.length)

    this.client.service('/api/devices')
      .create({
        _id: this.id.toString(),
        online: true,
        sys_manufacturer: manufacturers[manuId].name,
        sys_model: manufacturers[manuId].models[Math.floor(Math.random()*manufacturers[manuId].models.length)],
        os_platform: platforms[osId].name,
        os_distro: platforms[osId].distros[Math.floor(Math.random()*platforms[osId].distros.length)],
        os_arch: archs[Math.floor(Math.random()*archs.length)]
      })
      .catch(() => {
        this.client.service('/api/devices')
          .patch(
            this.id.toString(),
            {
              sys_manufacturer: manufacturers[manuId].name,
              online: true,
              sys_model: manufacturers[manuId].models[Math.floor(Math.random()*manufacturers[manuId].models.length)],
              os_platform: platforms[osId].name,
              os_distro: platforms[osId].distros[Math.floor(Math.random()*platforms[osId].distros.length)],
              os_arch: archs[Math.floor(Math.random()*archs.length)]
            }
          )
      })
  }

  // Set device network informations
  setDeviceNetwork () {
    const subnet = Math.round(Math.random() * this.subnetsCount).toString()
    this.client.service('/api/devices')
      .create({
        _id: this.id.toString(),
        os_hostname: 'PC' + this.id.toString(),
        net_ip4: '172.20.' + subnet + '.' + Math.round(Math.random() * 200).toString(),
        net_ip4_subnet: '172.20.' + subnet + '.255/24',
        net_gatewayV4: '172.20.' + subnet + '.254'
      })
      .catch(() => {
        this.client.service('/api/devices')
          .patch(
            this.id.toString(),
            {
              os_hostname: 'PC' + this.id.toString(),
              net_ip4: '172.20.' + subnet + '.' + Math.round(Math.random() * 200).toString(),
              net_ip4_subnet: '172.20.' + subnet + '.17/24',
              net_gatewayV4: '172.20.' + subnet + '.1'
            }
          )
      })
  }
}
