<template>
  <section>
    <v-text-field
      v-bind="properties"
      @change="$emit('textChanged', $event)"
    >
      {{ item }}
    </v-text-field>
  </section>
</template>
<script>

export default {
  props: {
    item: {
      type: String,
      default: ''
    },
    properties: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
