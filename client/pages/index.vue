<template>
  <section>
    <osChart />
    <onlineChart />
  </section>
</template>

<script>
import osChart from '~/components/devices/os_chart.vue'
import onlineChart from '~/components/devices/online_chart.vue'

export default {
  components: {
    osChart,
    onlineChart
  }
}
</script>
