const app = require('@/test/setup/feathers')
const users = require('@/server/services/users/users.service')
app.configure(users)

describe('\'users\' service', () => {
  it('Service setup', (done) => {
    app.services.users.on('started', (service) => {
      expect(service).toBe('users')
      done()
    })

    app.services.users.setup(app)
  })

  it('Service created', () => {
    expect(app.services).toHaveProperty('users')
  })

  it('User to be created', async () => {
    const created = await app.services.users.create({ _id: '123456' })
    expect(created).toHaveProperty('_id')
    expect(created._id).toBe('123456')
  })

  it('Send event user connection', (done) => {
    app.on('login', (connection) => {
      expect(connection).toHaveProperty('user')
      expect(connection.user._id).toBe('123456')
      done()
    })

    app.emit('login', { user: { _id: '123456' } })
  })

  it('On user connection', async () => {
    const connected = await app.services.users.onConnect({ user: { _id: '123456' } })
    expect(connected).toHaveProperty('online')
    expect(connected.online).toBe(true)
  })

  it('Send event user disconnection', (done) => {
    app.on('disconnect', (connection) => {
      expect(connection).toHaveProperty('user')
      expect(connection.user._id).toBe('123456')
      done()
    })

    app.emit('disconnect', { user: { _id: '123456' } })
  })

  it('On user disconnection', async () => {
    const disconnected = await app.services.users.onDisconnect({ user: { _id: '123456' } })
    expect(disconnected).toHaveProperty('online')
    expect(disconnected.online).toBe(false)
  })

  it('On false user disconnection', async () => {
    const disconnected = await app.services.users.onDisconnect({ user: { _id: 'nonExistingUser' } })
    expect(disconnected).toBe(false)
  })

  it('On empty user disconnection', async () => {
    const disconnected = await app.services.users.onDisconnect({})
    expect(disconnected).toBe(false)
  })

  it('Create 10 records', async () => {
    const t0 = performance.now()

    for (let index = 0; index < 10; index++) {
      await app.services.users.create({ _id: index.toString(), password: index.toString() })
    }

    const t1 = performance.now()

    expect(t1 - t0).toBeLessThan(2000)
  }, 2000)

  it('Patch 10 records', async () => {
    const t0 = performance.now()

    for (let index = 0; index < 10; index++) {
      await app.services.users.patch(index.toString(), { online: false })
    }

    const t1 = performance.now()

    expect(t1 - t0).toBeLessThan(2000)
  }, 2000)
})
