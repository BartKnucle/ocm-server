<template>
  <v-select
    v-model="selected"
    :items="items"
    solo
  >
    <template slot="selection" slot-scope="data">
      <v-list-item-icon>
        <v-icon>{{ data.item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title> {{ data.item.text }} </v-list-item-title>
      </v-list-item-content>
    </template>
    <template slot="item" slot-scope="data">
      <v-list-item-icon>
        <v-icon>{{ data.item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title> {{ data.item.text }} </v-list-item-title>
      </v-list-item-content>
    </template>
  </v-select>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      selected: ''
    }
  },
  watch: {
    selected (val) {
      this.$emit('select', val)
    }
  }
}
</script>
