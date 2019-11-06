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
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  components: {},
  props: {
    status: {
      type: String,
      default: 'Add'
    },
    dialog: {
      type: Boolean,
      default: true
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
  watch: {
    dialog (val) {
      this.visible = val
    },
    visible (val) {
      !val && this.close()
    }
  },
  methods: {
    ...mapActions('groups', { find: 'find', create: 'create', update: 'update' }),
    close () {
      this.$emit('closed')
    },
    save () {
      this.create(this.data)
      this.data = {
        name: ''
      }
      this.close()
    }
  }
}
</script>
