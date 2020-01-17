<template>
  <section>
    <Datatable
      :items="componentItems"
      :headers="headers"
      :buttons="buttons"
      @componentEvent="onEvent"
    />
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Datatable from '~/components/atomic/organisms/data-table.vue'
export default {
  components: {
    Datatable
  },
  data () {
    return {
      buttons: [],
      headers: [
        {
          value: '_id',
          text: 'ID',
          component: {
            name: 'Label',
            bindings: {
              label: '_id'
            }
          }
        },
        {
          value: 'Remove',
          text: 'Remove',
          component: {
            name: 'Button',
            bindings: {
              event: 'removeFiles',
              btnIcon: 'removeIcon',
              color: 'removeColor'
            }
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters('files', { files: 'find', get: 'get' }),
    componentItems () {
      return this.files().data.map((item) => {
        item = { ...item, removeIcon: 'mdi-delete' }
        item = { ...item, removeColor: 'red' }

        return item
      })
    }
  },
  mounted () {
    this.findFiles()
  },
  methods: {
    ...mapActions('files', { findFiles: 'find', patch: 'patch', remove: 'remove' }),
    onEvent (event) {
      switch (event.eventName) {
        case 'removeFiles':
          this.remove(event.item._id)
          break
      }
    }
  }
}
</script>
<style>
</style>
