<template>
  <section>
    <v-dialog
      v-bind="bindings"
      persistent
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
