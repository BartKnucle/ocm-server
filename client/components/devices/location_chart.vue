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
      headers: ['Locations', 'Count'],
      options: {
        title: 'Locations',
        width: 500,
        height: 300,
        backgroundColor: 'transparent',
        pieSliceBorderColor: 'transparent',
        pieHole: 0.4,
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
    ...mapGetters('devices', { devices: 'find', getDevice: 'get' }),
    ...mapGetters('subnets', { subnets: 'find', getSubnet: 'get' }),
    ...mapGetters('locations', { locations: 'find', getLocation: 'get' }),
    countByOs () {
      return this.devices().data.reduce((acc, device) => {
        const subnet = this.getSubnet(device.net_gatewayV4)
        const location = this.getLocation(subnet.location)

        const cle = location.name
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
    this.findLocations()
    this.findSubnets()
    this.findDevices()
  },
  methods: {
    ...mapActions('devices', { findDevices: 'find' }),
    ...mapActions('subnets', { findSubnets: 'find' }),
    ...mapActions('locations', { findLocations: 'find' })
  }
}
</script>
