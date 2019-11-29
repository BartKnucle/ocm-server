<template>
  <svg>
    <circle
      v-for="item in items"
      :key="item.data.name || item.name"
      :class="item.data.class || item.class"
      :r="item.value / 5"
      :cx="item.x"
      :cy="item.y"
    >
      <SvgTree
        v-if="item.children"
        :items="item.children"
      />
    </circle>
  </svg>
</template>
<script>

export default {
  name: 'SvgTree',
  props: {
    items: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {}
}
</script>
