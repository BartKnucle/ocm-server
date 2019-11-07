<template>
  <section>
    <v-list>
      <v-list-item v-for="item in devices().data" :key="item._id">
        <v-list-item-content>
          {{ item.hostname }}
        </v-list-item-content>
        <v-list-item-content>
          {{ item.distro }}
        </v-list-item-content>
        <v-list-item-content>
          {{ item._id }}
        </v-list-item-content>
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
