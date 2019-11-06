<template>
  <section>
    <v-list>
      <v-list-item v-for="item in groups().data" :key="item._id">
        <v-list-item-content>
          {{ item.name }}
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="edit(item._id)">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon @click="remove(item._id)">
            <v-icon
              color="red"
            >
              mdi-delete
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {},
  data () {
    return {}
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
