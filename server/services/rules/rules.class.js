const ServiceClass = require('../service.class')

exports.Rules = class Rules extends ServiceClass {
  //  Evaluate a rule
  evaluateRule (ruleId) {
    this.get(ruleId)
      .then(async (rule) => {
        const items = await this.app.service(rule.source).find({ query: JSON.parse(rule.query) })
        items.forEach((item) => {
          this.evaluateItem(item, rule.source)
        })
      })
  }

  _hasRule (item, ruleId) {
    return item.groups.find(group => group.rule === ruleId)
  }

  // Check if the item match the rule
  async _itemCheck (item, rule) {
    const result = await this.app.service(rule.source).find({ query: JSON.parse(rule.query) })
    return result.find(x => x._id === item._id)
  }

  // Evaluate rules for an item
  async evaluateItem (item, source) {
    //  remove not relevant rules
    item.groups.forEach(async (group) => {
      await this.get(group.rule)
        .then(async (rule) => {
          // If Item should not contain the rule
          if (!await this._itemCheck(item, rule)) {
            await this.deleteItemRule(item, rule)
          }
        })
    })

    //  Find all the relevant rules and add them
    await this.find({ query: { source } })
      .then((rules) => {
        rules.forEach(async (rule) => {
          if (await this._itemCheck(item, rule)) {
            await this.addItemRule(item, rule)
          }
        })
      })
  }

  // Add a rule to the item
  async addItemRule (item, rule) {
    if (!this._hasRule(item, rule._id)) {
      await this.app.service(rule.source)
        .patch(
          item._id,
          { groups: item.groups ? [{ group: rule.group, rule: rule._id }, ...item.groups] : [{ group: rule.group, rule: rule._id }] }
        )
        .catch((err) => {
          console.log(err)
        })
    }
  }

  async deleteItemRule (item, rule) {
    const groups = item.groups.filter(group => group.rule !== rule._id)
    await this.app.service(rule.source)
      .patch(
        item._id,
        { groups }
      )
      .catch((err) => {
        console.log(err)
      })
  }

  // Remove a rule
  delete (ruleId) {
    this.get(ruleId)
      .then(async (rule) => {
        const items = await this.app.service(rule.source).find({ query: JSON.parse(rule.query) })
        items.forEach(async (item) => {
          await this.deleteItemRule(item, rule)
        })
      })
  }

  //  Evaluate a source
  evaluateSource (source) {
    this.find({ query: { source } })
      .then((rules) => {
        rules.forEach((rule) => {
          this.evaluate(rule._id)
        })
      })
  }
}
