<template>
  <section>
    <v-row>
      <v-col>
        <osChart />
        <onlineChart />
      </v-col>
      <v-col>
        <locationChart />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import osChart from '~/components/devices/os_chart.vue'
import onlineChart from '~/components/devices/online_chart.vue'
import locationChart from '~/components/devices/location_chart.vue'

export default {
  components: {
    osChart,
    onlineChart,
    locationChart
  }
}
</script>
