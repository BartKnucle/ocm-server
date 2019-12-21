async function devices(client, logger) {
  const start = process.hrtime()
  const subnet2 = Math.round(Math.random() * 40).toString()
  await client.service('/api/devices')
    .create({
      _id: client.data.id.toString(),
      os_hostname: client.data.id.toString(),
      net_ip4_subnet: '172.20.' + subnet2 + '.17/24',
      net_gatewayV4: '172.20.' + subnet2 + '.1'
    })
    .catch(async () => {
      await client.service('/api/devices')
      .patch(
        client.data.id.toString(),
        {
          os_hostname: client.data.id.toString(),
          net_ip4_subnet: '172.20.' + subnet2 + '.17/24',
          net_gatewayV4: '172.20.' + subnet2 + '.1'
        }
      )
    })
  // These requests are sent in parallel
  logger.verbose('Patched devices for client ' + client.data.id)
  client.setDuration('devices', start)
}

module.exports = devices