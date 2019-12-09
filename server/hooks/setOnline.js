module.exports = (options = {}) => {
  return (context) => {
    if (context.app.service('devices')) {
      context.app.service('devices')
        .patch(
          context.result._id,
          { online: context.result.online }
        )
        .catch(() => {
          context.app.service('devices').create({ _id: context.result._id, online: context.result.online })
        })
    }
    return context
  }
}
