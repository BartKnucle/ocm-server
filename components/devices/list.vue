<template>
  <v-data-table
    :headers="headers"
    :items="devices().data"
    item-key="_id"
    hide-default-footer
  >
    <template v-slot:item.online="{ item }">
      <OnlineOffline
        :up="item.online"
      />
    </template>
    <template v-slot:item.updated="{ item }">
      {{ new Date(item.updated).toLocaleString() }}
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn icon @click="remove(item._id)">
        <v-icon
          color="red"
        >
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OnlineOffline from '~/components/customs/OnlineOffline.vue'
export default {
  components: {
    OnlineOffline
  },
  data () {
    return {
      headers: [
        { value: 'online', text: 'Status' },
        { value: 'os_hostname', text: 'Hostname' },
        { value: 'os_distro', text: 'Operating system' },
        { value: '_id', text: 'Device Id' },
        { value: 'net_ip4', text: 'Ipv4 address' },
        { value: 'net_ip4_subnet', text: 'Ipv4 Subnet' },
        { value: 'net_gatewayV4', text: 'Ipv4 Gateway' },
        { value: 'updated', text: 'Updated' },
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
    ...mapActions('devices', { find: 'find', remove: 'remove' }),
    edit (id) {
      this.$emit('edit', id)
    }
  }
}
</script>
