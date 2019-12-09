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
})
