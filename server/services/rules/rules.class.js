const ServiceClass = require('../service.class')

exports.Rules = class Rules extends ServiceClass {
  //  Evaluate a rule
  evaluate (id) {
    this.get(id)
      .then((data) => {
        console.log(data)
        this.app.service(data.source)
          .patch(
            null,
            { groups: [data.group] },
            { query: { '_id': '172.20.9.1' } }
          )
          .catch((err) => {
            console.log(err)
          })
        console.log({ query: JSON.parse(data.query) })
      })
  }

  //  Evaluate a source
  evaluateSource (source) {
    this.find({ query: { source } })
      .then((rules) => {
        rules.forEach((rule) => {
          this.evaluate(rule.id)
        })
      })
  }
}
