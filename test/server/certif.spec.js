const certif = require('@/server/certif')

describe('Self signed ceritificate generator', () => {
  const certificate = certif()
  it('Private key exist', () => {
    expect(certificate).toHaveProperty('private')
  })

  it('Public key exist', () => {
    expect(certificate).toHaveProperty('public')
  })

  it('Certificate key exist', () => {
    expect(certificate).toHaveProperty('cert')
  })
})
