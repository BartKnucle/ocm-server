<template>
  <section>
    <GChart
      :type="type"
      :data="countByOs"
      :options="options"
    />
  </section>
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
      headers: ['Online', 'Count'],
      options: {
        title: 'Online',
        width: 500,
        height: 300,
        backgroundColor: 'transparent',
        pieSliceBorderColor: 'transparent',
        pieHole: 0.4,
        colors: ['red', 'green'],
        titleTextStyle: {
          color: 'orange'
        },
        legend: {
          textStyle: { color: 'white' }
        }
      }
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('devices', { devices: 'find', get: 'get' }),
    countByOs () {
      return this.devices().data.reduce((acc, obj) => {
        const cle = obj.online.toString()
        const value = acc.find(x => x[0] === cle)
        if (value) {
          value[1] += 1
        } else {
          acc.push([cle, 1])
        }
        return acc
      }, [this.headers])
    }
  },
  mounted () {
    this.find()
  },
  methods: {
    ...mapActions('devices', { find: 'find', remove: 'remove' })
  }
}
</script>
