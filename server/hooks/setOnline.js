module.exports = (options = {}) => {
  return (context) => {
    if (context.app.service('/api/devices')) {
      context.app.service('/api/devices')
        .patch(
          context.result._id,
          { online: context.result.online }
        )
        .catch(() => {
          context.app.service('/api/devices').create({ _id: context.result._id, online: context.result.online })
        })
    }
    return context
  }
}
