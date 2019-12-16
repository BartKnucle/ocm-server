<template>
  <ItemPicker
    :items="groups"
    :selected="selected"
    @select="$emit('selectGroup', $event)"
  />
</template>

<script>
import ItemPicker from '~/components/customs/item-picker.vue'
export default {
  components: {
    ItemPicker
  },
  props: {
    items: {
      type: Array,
      default: () => { return [] }
    },
    selected: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    groups () {
      return this.items.map((group) => {
        group.text = group._id
        return group
      })
    }
  },
  mounted () {},
  methods: {}
}
</script>
