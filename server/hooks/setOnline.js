module.exports = (options = {}) => {
  return (context) => {
    context.app.service('devices')
      .patch(
        context.result._id,
        { online: context.result.online }
      )
    return context
  }
}
