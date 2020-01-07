<template>
  <section>
    <v-dialog
      v-bind="bindings"
    >
      <slot />
    </v-dialog>
  </section>
</template>
<script>

export default {
  props: {
    bindings: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
