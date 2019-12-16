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
      headers: ['OS', 'Count'],
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
    ...mapGetters('devices', { devices: 'find', get: 'get' }),
    countByOs () {
      return this.devices().data.reduce((acc, obj) => {
        const cle = obj.distro
        let value = acc.find(x => x[0] === cle)
        if (value) {
          value += 1
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
