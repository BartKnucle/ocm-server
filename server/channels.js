module.exports = (app) => {
  if (typeof app.channel !== 'function') {
    return
  }

  app.on('connection', (connection) => {
    app.channel('anonymous').join(connection)
  })

  app.publish(() => {
    return app.channel('anonymous')
  })

  app.on('login', (authResult, { connection }) => {
    console.log(authResult)
    console.log(connection)
  })
}
