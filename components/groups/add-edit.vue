<template>
  <v-dialog
    v-model="visible"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ status }} {{ name }}</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="data.name"
          label="Name"
          hint="Enter the group name"
        />
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close()">
          Close
        </v-btn>
        <v-btn text @click="save()">
          {{ status }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {},
  props: {
    status: {
      type: String,
      default: ''
    },
    dialog: {
      type: Boolean,
      default: true
    },
    groupid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      name: 'group',
      data: {
        name: ''
      },
      visible: false
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('groups', { get: 'get' })
  },
  watch: {
    dialog (val) {
      this.visible = val
    },
    visible (val) {
      !val && this.close()
    },
    groupid (val) {
      if (this.status === 'Edit') {
        this.data = Object.assign(this.data, this.get(this.groupid))
      }
    }
  },
  methods: {
    ...mapActions('groups', { find: 'find', create: 'create', patch: 'patch' }),
    close () {
      this.$emit('closed')
    },
    edited () {
      this.$emit('edited')
    },
    save () {
      switch (this.status) {
        case 'Add':
          this.create(this.data)
          break
        case 'Edit':
          this.patch([this.groupid, this.data])
          this.edited()
          break
      }
      this.reset()
      this.close()
    },
    reset () {
      this.data = {
        name: ''
      }
    }
  }
}
</script>
