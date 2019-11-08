<template>
  <v-data-table
    :headers="headers"
    :items="devices().data"
    item-key="_id"
    hide-default-footer
  >
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
    ...mapActions('devices', { find: 'find', remove: 'remove' }),
    edit (id) {
      this.$emit('edit', id)
    }
  }
}
</script>
