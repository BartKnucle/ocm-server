<template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {},
  data () {
    return {
      headers: [
        { value: 'hostname', text: 'Hostname' },
        { value: 'distro', text: 'Operating system' },
        { value: '_id', text: 'Device Id' },
        { text: 'Actions', value: 'action', sortable: false }
      ]
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
