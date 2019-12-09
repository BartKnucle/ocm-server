const feathers = require('@feathersjs/feathers')
const users = require('@/server/services/users/users.service')

describe('\'users\' service', () => {
  let app

  beforeEach(() => {
    app = feathers()
    app.set('nedb', './data/test/db')
    app.configure(users)
  })

  it('Service created', () => {
    expect(app.services).toHaveProperty('users')
  })

  it('User to be created', async () => {
    const created = await app.services.users.create({ _id: '123456' })
    expect(created).toHaveProperty('_id')
    expect(created._id).toBe('123456')
  })

  it('On user connection', async () => {
    const connected = await app.services.users.onConnect({ user: { _id: '123456' } })
    expect(connected).toHaveProperty('online')
    expect(connected.online).toBe(true)
  })

  it('On user disconnection', async () => {
    const disconnected = await app.services.users.onDisconnect({ user: { _id: '123456' } })
    expect(disconnected).toHaveProperty('online')
    expect(disconnected.online).toBe(false)
  })
})
