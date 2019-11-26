<template>
  <v-select
    :value="selected"
    :items="items"
    :label="label"
    solo
    @change="$emit('select', $event)"
  >
    <template slot="selection" slot-scope="data">
      <v-list-item-icon
        v-if="data.item.icon"
      >
        <v-icon>
          {{ data.item.icon }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title> {{ data.item.text }} </v-list-item-title>
      </v-list-item-content>
    </template>
    <template slot="item" slot-scope="data">
      <v-list-item-icon
        v-if="data.item.icon"
      >
        <v-icon>
          {{ data.item.icon }}
        </v-icon>
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
    selected: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => { return [] }
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  watch: {
    selected (val) {
      this.$emit('select', val)
    }
  }
}
</script>
