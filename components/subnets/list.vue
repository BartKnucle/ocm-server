<template>
  <v-data-table
    :headers="headers"
    :items="subnets().data"
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
        { value: '_id', text: 'Gateway' },
        { value: 'data.start', text: 'Start' },
        { value: 'data.end', text: 'End' },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('subnets', { subnets: 'find', get: 'get' })
  },
  mounted () {
    this.find()
  },
  methods: {
    ...mapActions('subnets', { find: 'find', remove: 'remove' }),
    edit (id) {
      this.$emit('edit', id)
    }
  }
}
</script>
