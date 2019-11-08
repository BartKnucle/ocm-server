<template>
  <v-data-table
    :headers="headers"
    :items="groups().data"
    item-key="_id"
    hide-default-footer
  >
    <template v-slot:item.action="{ item }">
      <v-btn icon @click="edit(item._id)">
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
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
        { value: 'name', text: 'Name' },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('groups', { groups: 'find', get: 'get' })
  },
  mounted () {
    this.find()
  },
  methods: {
    ...mapActions('groups', { find: 'find', remove: 'remove' }),
    edit (id) {
      this.$emit('edit', id)
    }
  }
}
</script>
