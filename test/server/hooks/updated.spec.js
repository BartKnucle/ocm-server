const feathers = require('@feathersjs/feathers')
const updated = require('@/server/hooks/updated')

describe('\'updated\' hook', () => {
  let app

  beforeEach(() => {
    // Create a new plain Feathers application
    app = feathers()

    // Register a dummy custom service that just return the
    // message data back
    app.use('/test', {
      async create (data) {
        return data
      }
    })

    // Register the `processMessage` hook on that service
    app.service('test').hooks({
      before: {
        create: updated()
      }
    })
  })

  it('processes the data as expected', async () => {
    // A user stub with just an `_id`
    const data = { _id: 'test' }

    // Create a new message with params that contains our user
    const result = await app.service('test').create(data)

    expect(result).toHaveProperty('updated')
    expect(result.updated instanceof Date).toBeTruthy()
  })
})
