module.exports = (options = {}) => {
  return (context) => {
    context.app.service('/api/rules').evaluateSource(context.service.name)
    return context
  }
}
