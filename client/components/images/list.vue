<template>
  <v-data-table
    :headers="headers"
    :items="groups().data"
    item-key="_id"
    hide-default-footer
  >
    <template v-slot:item.action="{ item }">
      <v-btn
        @click="edit(item._id)"
        icon
      >
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn
        @click="remove(item._id)"
        icon
      >
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
  props: {
    select: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      headers: [
        { value: '_id', text: 'Name' },
        { value: 'type', text: 'Type' },
        { value: 'parent', text: 'Parent' },
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
