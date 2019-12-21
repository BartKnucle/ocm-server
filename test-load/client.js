const io = require('socket.io-client')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const auth = require('@feathersjs/authentication-client')
const winston = require('winston')
const util = require('util')
const randomScenario = require('./scenarios')

const level = process.env.LOG_LEVEL || 'info'
const logger = new winston.createLogger({ level, transports: [ new winston.transports.Console({ colorize: true }) ] })

async function connectClient(url, id) {
  client = feathers()
  client.data = {
    id: id.toString(),
    durations: [],
    credentials: {
      _id: id.toString(),
      password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
  }

  client.setDuration = function (key, start) {
    const end = process.hrtime()
    client.data.durations[key] = (end[0] + end[1] / 1000000000) - (start[0] + start[1] / 1000000000)
  }

  const start = process.hrtime()
  // Configure our client (hooks, auth, connection)
  const socket = io(url, { secure: true, reconnect: true, rejectUnauthorized: false })
  client.configure(socketio(socket))
  client.configure(auth())
 
  await client.service('/api/users').create(client.data.credentials)
    .catch((err) => {
      logger.verbose(err)
    })

  await client.service('/api/authentication').create({ ...client.data.credentials, strategy: 'local' })
    .catch((err) => {
      logger.verbose(err)
    })

  client.wait = async function (duration) {
    await util.promisify(setTimeout)(duration)
  }

  logger.verbose('Configured new client ' + client.data.id)
  client.setDuration('connect', start)
  return client
}

async function disconnectClient(client) {
  const start = process.hrtime()
  //await client.logout()
  //console.log(client)
  client.io.disconnect()
  logger.verbose('Closed client ' + client.data.id)
  client.setDuration('disconnect', start)
}

module.exports = async function (options, callback) {
  const { url, index, nbScenarios, rampUp, rampDown } = options
  let client
  try {
    logger.verbose('Initiating client ' + index)
    // We don't start all clients at the same time to avoid overflowing,
    // let them start continuously during the ramp up duration
    let pause = Math.random() * 1000 * rampUp
    if (rampUp) {
      logger.verbose('Pausing client ' + index + ' for ' + pause)
      await util.promisify(setTimeout)(pause)
    }
    client = await connectClient(url, index)

    await util.promisify(setTimeout)(pause)
    
    // During the ramp down phase create "dummy" clients exiting randomly
    if (rampDown) {
      pause = Math.random() * 1000 * rampDown
      logger.verbose('Pausing client ' + index + ' for ' + pause)
      await client.wait(pause)
    } else {
      // Play random scenarios
      for (var i = 0; i < nbScenarios; i++) {
        const scenario = randomScenario()
        logger.verbose('Running scenario ' + scenario + ' on client ' + index)
        await require('./scenarios/' + scenario)(client, logger)
      }
    }
    await disconnectClient(client)
    callback(null, client.data)
  } catch (error) {
    // If failure after connection close it
    if (client && client.socket) client.socket.disconnect()
    callback(error)
  }
}