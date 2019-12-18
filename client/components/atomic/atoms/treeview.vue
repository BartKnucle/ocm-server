<template>
  <section>
    <v-treeview
      :items="list_to_tree"
      v-bind="properties"
      @update:active="$emit('selectItem', $event)"
    />
  </section>
</template>
<script>

export default {
  props: {
    nodes: {
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
      roots = JSON.parse(JSON.stringify(this.nodes.filter(item => !item.parent)))

      const getChildren = (node) => {
        node.children = JSON.parse(JSON.stringify(this.nodes.filter(item => item.parent === node._id)))
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
