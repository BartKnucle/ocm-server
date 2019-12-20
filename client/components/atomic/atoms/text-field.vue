<template>
  <section>
    <v-text-field
      v-bind="properties"
      v-model="inputText"
      :value="item"
      @change="$emit('textChanged', inputText)"
      @keydown="$emit('textChanged', inputText)"
    />
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
    return {
      inputText: ''
    }
  },
  watch: {
    item (val) {
      this.inputText = val
    }
  }
}
</script>
