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
      type: 'BarChart',
      headers: ['Locations', 'Total', 'Online', 'Offline'],
      options: {
        title: 'Locations',
        width: 500,
        height: 300,
        backgroundColor: 'transparent',
        pieSliceBorderColor: 'transparent',
        titleTextStyle: {
          color: 'orange'
        },
        hAxis: {
          title: 'Count',
          minValue: 0,
          textStyle: {
            color: 'white'
          },
          titleTextStyle: {
            color: 'white'
          }
        },
        vAxis: {
          textStyle: {
            color: 'white'
          }
        }
      }
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('devices', { devices: 'find', getDevice: 'get' }),
    countByOs () {
      return this.devices().data.reduce((acc, device) => {
        const cle = device.location.name
        const value = acc.find(x => x[0] === cle)
        if (value) {
          value[1] += 1
          if (device.online) {
            value[2] += 1
          } else {
            value[3] += 1
          }
        } else if (device.online) {
          acc.push([cle, 1, 1, 0])
        } else {
          acc.push([cle, 1, 0, 1])
        }
        return acc
      }, [this.headers])
    }
  },
  mounted () {
    this.findDevices()
  },
  methods: {
    ...mapActions('devices', { findDevices: 'find' })
  }
}
</script>
