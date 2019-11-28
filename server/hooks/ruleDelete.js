module.exports = (options = {}) => {
  return (context) => {
    context.service.delete(context.id)
    return context
  }
}
