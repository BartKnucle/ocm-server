<template>
  <section>
    <v-list
      v-bind="properties"
      dense
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
