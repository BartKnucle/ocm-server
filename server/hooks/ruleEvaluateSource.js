module.exports = (options = {}) => {
  return (context) => {
    context.app.service('rules').evaluateSource(context.service.name)
    return context
  }
}
