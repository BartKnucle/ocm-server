module.exports = (options = {}) => {
  return async (context) => {
    if (context.result) {
      await context.app.service('rules').evaluateItem(context.result, context.service.name)
    }
    return context
  }
}
