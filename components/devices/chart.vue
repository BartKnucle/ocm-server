<template>
  <GChart
    :type="type"
    :data="data"
    :options="options"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { GChart } from 'vue-google-charts'
export default {
  components: {
    GChart
  },
  data () {
    return {
      type: 'PieChart',
      data: [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
      ],
      options: {
        title: 'OS',
        width: 300,
        height: 300,
        backgroundColor: 'transparent',
        pieSliceBorderColor: 'transparent',
        pieHole: 0.4,
        titleTextStyle: {
          color: 'orange'
        }
      }
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('devices', { devices: 'find', get: 'get' })
  },
  mounted () {
    this.find()
  },
  methods: {
    ...mapActions('devices', { find: 'find', remove: 'remove' })
  }
}
</script>
