<template>
  <section>
    <AddItem
      :dialog="addDialog"
    >
      <v-card-title>
        Add Application
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="application.name"
          label="Name"
          hint="Enter the application name"
        />
      </v-card-text>
      <Upload
        @uploaded="application.file = $event"
      />
      <Select
        :bindings="addOS"
        @componentEvent="application.os = $event.event"
      />
      <Select
        :bindings="addTypes"
        @componentEvent="application.type = $event.event"
      />
      <small>*indicates required field</small>
      <v-card-actions>
        <v-spacer />
        <ActionBar
          :items="addButtons"
          @componentEvent="addEvents($event)"
        />
      </v-card-actions>
    </AddItem>
    <Datatable
      :items="componentItems"
      :headers="headers"
      :buttons="buttons"
      @componentEvent="tableEvents($event)"
    />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddItem from '~/components/atomic/molecules/add-item.vue'
import TextField from '~/components/atomic/atoms/text-field.vue'
import Upload from '~/components/atomic/atoms/upload.vue'
import Datatable from '~/components/atomic/organisms/data-table.vue'
import ActionBar from '~/components/atomic/molecules/action-bar.vue'
import Select from '~/components/atomic/atoms/select.vue'
export default {
  components: {
    Datatable,
    AddItem,
    Upload,
    TextField,
    ActionBar,
    Select
  },
  data () {
    return {
      headers: [
        {
          value: 'name',
          text: 'Name',
          component: {
            name: 'Label',
            bindings: {
              label: 'name'
            }
          }
        },
        {
          value: 'file',
          text: 'File',
          component: {
            name: 'Label',
            bindings: {
              label: 'file'
            }
          }
        },
        {
          value: 'os',
          text: 'Os',
          component: {
            name: 'Label',
            bindings: {
              label: 'os'
            }
          }
        },
        {
          value: 'type',
          text: 'Type',
          component: {
            name: 'Label',
            bindings: {
              label: 'type'
            }
          }
        },
        {
          value: '_id',
          text: 'Remove',
          component: {
            name: 'Button',
            bindings: {
              event: 'removeDevice',
              btnIcon: 'removeIcon',
              color: 'removeColor'
            }
          }
        }
      ],
      application: {
        name: null,
        file: null,
        os: null,
        type: null
      },
      buttons: [
        {
          label: 'Add',
          color: 'green'
        }
      ],
      addDialog: {
        value: false,
        'max-width': 600
      },
      addButtons: [
        {
          label: 'Close',
          color: 'gray'
        },
        {
          label: 'Add',
          color: 'green'
        }
      ],
      addTypes: {
        items: ['Powershell']
      },
      addSelectedType: null,
      addOS: {
        items: ['Windows', 'Linux']
      },
      addSelectedOS: null
    }
  },
  computed: {
    ...mapGetters('applications', { applications: 'find', get: 'get' }),
    componentItems () {
      return this.applications().data.map((item) => {
        item = { ...item, removeIcon: 'mdi-delete' }
        item = { ...item, removeColor: 'red' }

        return item
      })
    }
  },
  mounted () {
    this.findApplications()
  },
  methods: {
    ...mapActions('applications', { findApplications: 'find', create: 'create', remove: 'remove' }),
    addEvents (event) {
      switch (event.item.label) {
        case 'Close':
          this.addDialog.value = false
          break
        case 'Add':
          this.create(this.application)
          this.addDialog.value = false
      }
    },
    tableEvents (event) {
      if (event.item._id) {
        this.remove(event.item._id)
        return true
      }

      switch (event.item.label) {
        case 'Add':
          this.addDialog.value = true
      }
    }
  }
}
</script>
