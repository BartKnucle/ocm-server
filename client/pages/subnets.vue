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
          text: 'Gateway',
          component: {
            name: 'Label',
            bindings: {
              label: '_id'
            }
          }
        },
        {
          value: 'start',
          text: 'Start',
          component: {
            name: 'Label',
            bindings: {
              label: 'start'
            }
          }
        },
        {
          value: 'end',
          text: 'End',
          component: {
            name: 'Label',
            bindings: {
              label: 'end'
            }
          }
        },
        {
          value: 'location',
          text: 'Location',
          component: {
            name: 'Select',
            bindings: {
              event: 'selectLocation',
              items: 'locations',
              value: 'selectedLocation'
            }
          }
        },
        {
          value: 'remove',
          text: 'Remove',
          component: {
            name: 'Button',
            bindings: {
              event: 'removeSubnet',
              btnIcon: 'removeIcon',
              color: 'removeColor'
            }
          }
        }
      ]
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('subnets', { subnets: 'find', get: 'get' }),
    ...mapGetters('locations', { locations: 'find', get: 'get' }),
    componentItems () {
      return this.subnets().data.map((item) => {
        item = { ...item, removeIcon: 'mdi-delete' }
        item = { ...item, removeColor: 'red' }
        item = {
          ...item,
          locations: this.locations().data.map((location) => {
            return { text: location.name, value: location._id }
          })
        }
        item = { ...item, selectedLocation: item.location }

        return item
      })
    }
  },
  mounted () {
    this.findSubnets()
    this.findLocations()
  },
  methods: {
    ...mapActions('subnets', { findSubnets: 'find', remove: 'remove', patch: 'patch' }),
    ...mapActions('locations', { findLocations: 'find' }),
    onEvent (event) {
      switch (event.eventName) {
        case 'selectLocation':
          this.patch([
            event.item._id,
            { location: event.event }
          ])
          break
        case 'removeSubnet':
          this.remove(event.item._id)
          break
      }
    }
  }
}
</script>
