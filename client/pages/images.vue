<template>
  <section>
    <AddItem
      :dialog="addDialog"
    >
      <v-card-title>
        Add image
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Name"
          hint="Enter the image name"
        />
      </v-card-text>
      <Upload />
      <Select
        :bindings="addTypes"
        @componentEvent="addSelectedType = $event.event"
      />
      <small>*indicates required field</small>
      <v-card-actions>
        <v-spacer />
        <ActionBar
          :items="addButtons"
          @componentEvent="$emit('componentEvent', $event)"
        />
      </v-card-actions>
    </AddItem>
    <Datatable
      :buttons="buttons"
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
      buttons: [
        {
          label: 'add',
          color: 'green'
        }
      ],
      addDialog: {
        value: true,
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
        items: ['Windows', 'Linux']
      },
      addSelectedType: null
    }
  },
  computed: {
    ...mapGetters('images', { images: 'find', get: 'get' })
  },
  methods: {
    ...mapActions('images', { findImages: 'find', remove: 'remove' })
  }
}
</script>
