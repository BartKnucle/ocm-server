const ServiceClass = require('../service.class')

exports.Rules = class Rules extends ServiceClass {
  //  Evaluate a rule
  evaluate (id) {
    this.get(id)
      .then(async (data) => {
        const datas = await this.app.service(data.source).find({ query: JSON.parse(data.query) } )
        datas.forEach(element => {
          this.app.service(data.source)
          .patch(
            element._id,
            { groups: [data.group, ...element.groups] }
          )
          .catch((err) => {
            console.log(err)
          })
        })
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
