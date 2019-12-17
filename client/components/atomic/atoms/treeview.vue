<template>
  <section>
    <v-treeview
      v-bind="properties"
      :items="list_to_tree"
      @update:active="sendEvent($event)"
    />
  </section>
</template>
<script>

export default {
  props: {
    items: {
      type: Array,
      default: () => { return [] }
    },
    properties: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {}
  },
  computed: {
    list_to_tree () {
      let roots = []
      roots = this.items.filter(item => !item.parent)

      const getChildren = (node) => {
        node.children = this.items.filter(item => item.parent === node._id)
        node.children.forEach((child) => {
          getChildren(child)
        })
      }

      roots.forEach((root) => {
        getChildren(root)
      })

      return roots
    }
  },
  methods: {
    sendEvent (event) {
      this.$emit('componentEvent', {
        event
      })
    }
  }
}
</script>
