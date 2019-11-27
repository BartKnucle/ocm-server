module.exports = (options = {}) => {
  return (context) => {
    context.service.evaluate(context.result._id)
    return context
  }
}
