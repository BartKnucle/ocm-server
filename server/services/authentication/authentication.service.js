
const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
const { expressOauth } = require('@feathersjs/authentication-oauth')
const { Authentication } = require('./authentication.class')
const hooks = require('./authentication.hooks')

module.exports = (app) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())

  app.use('/api/authentication', authentication)
  app.configure(expressOauth())

  const service = app.service('/api/authentication')

  service.hooks(hooks)
}
