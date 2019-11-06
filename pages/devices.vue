<template>
  <section>
    <ListDevices />
  </section>
</template>

<script>
import ListDevices from '~/components/devices/list.vue'
export default {
  name: 'Devices',
  components: {
    ListDevices
  }
}
</script>
