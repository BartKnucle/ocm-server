<template>
  <v-data-table
    :headers="headers"
    :items="subnets().data"
    item-key="_id"
    hide-default-footer
  >
    <template v-slot:item.group="{ item }">
      <groupPicker
        :items="groups().data"
        :selected="item.group"
        @selectGroup="saveGroup(item._id, $event)"
      />
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
import groupPicker from '~/components/groups/picker.vue'
export default {
  components: {
    groupPicker
  },
  data () {
    return {
      headers: [
        { value: '_id', text: 'Gateway' },
        { value: 'start', text: 'Start' },
        { value: 'end', text: 'End' },
        { text: 'Location', value: 'group', sortable: false },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('subnets', { subnets: 'find', get: 'get' }),
    ...mapGetters('groups', { groups: 'find', get: 'get' })
  },
  mounted () {
    this.findSubnets()
    this.findGroups()
  },
  methods: {
    ...mapActions('subnets', { findSubnets: 'find', remove: 'remove', patch: 'patch' }),
    ...mapActions('groups', { findGroups: 'find', remove: 'remove' }),
    edit (id) {
      this.$emit('edit', id)
    },
    saveGroup (id, groupId) {
      this.patch([id, { group: groupId }])
    }
  }
}
</script>
