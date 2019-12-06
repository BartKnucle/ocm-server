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
          v-model="data._id"
          label="Name"
          hint="Enter the group name"
        />
        <ItemPicker :selected="data.type" :items="typeItems" @select="selectType($event)" />
      </v-card-text>
      <groupPicker
        :selected="data.parent"
        :items="[...parentGroups, { text: '' }]"
        @selectGroup="selectGroup($event)"
      />
      <small>*indicates required field</small>
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
import GroupPicker from './picker.vue'
import ItemPicker from '~/components/customs/item-picker.vue'
export default {
  components: {
    ItemPicker,
    GroupPicker
  },
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
        parent: ''
      },
      visible: false,
      typeItems: [
        {
          value: 'location',
          text: 'Location',
          icon: 'mdi-home'
        },
        {
          value: 'hardware',
          text: 'Hardware',
          icon: 'mdi-laptop'
        },
        {
          value: 'Software',
          text: 'Software',
          icon: 'mdi-windows'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('groups', { groups: 'find', get: 'get' }),
    parentGroups () {
      return this.groups().data.map((group) => {
        group.text = group._id
        return group
      })
    }
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
  mounted () {
    this.find()
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
          this.patch([this.data._id, this.data])
          this.edited()
          break
      }
      this.reset()
      this.close()
    },
    reset () {
      this.data = {
        _id: '',
        type: '',
        parent: ''
      }
    },
    selectType (id) {
      this.data.type = id
    },
    selectGroup (id) {
      this.data.parent = id
    }
  }
}
</script>
