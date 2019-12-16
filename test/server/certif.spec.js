const path = require('path')
const certif = require('@/server/certif')
const app = require('@/test/setup/feathers')
app.set('homePath', path.join(require('os').homedir(), '.ocs-server', 'test'))
app.configure(certif)

describe('Self signed ceritificate generator', () => {
  it('Private key exist', () => {
    expect(app.certificate).toHaveProperty('private')
  })

  it('Public key exist', () => {
    expect(app.certificate).toHaveProperty('public')
  })

  it('Certificate key exist', () => {
    expect(app.certificate).toHaveProperty('cert')
  })
})
