<template>
  <section>
    <v-list
      v-bind="properties"
    >
      <slot />
    </v-list>
  </section>
</template>
<script>

export default {
  props: {
    properties: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
