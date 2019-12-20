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
          value: 'online',
          text: 'Online',
          component: {
            name: 'Chip',
            bindings: {
              text: 'onlineText',
              color: 'onlineColor'
            }
          }
        },
        {
          value: 'os_hostname',
          text: 'Hostname',
          component: {
            name: 'Label',
            bindings: {
              label: 'os_hostname'
            }
          }
        },
        {
          value: 'os_distro',
          text: 'OS',
          component: {
            name: 'Label',
            bindings: {
              label: 'os_distro'
            }
          }
        },
        {
          value: 'net_ip4',
          text: 'Ipv4 Address',
          component: {
            name: 'Label',
            bindings: {
              label: 'net_ip4'
            }
          }
        },
        {
          value: 'net_gatewayV4',
          text: 'Ipv4 Gateway',
          component: {
            name: 'Label',
            bindings: {
              label: 'net_gatewayV4'
            }
          }
        },
        {
          value: 'updated',
          text: 'Date',
          component: {
            name: 'Label',
            bindings: {
              label: 'updatedLabel'
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
      ]
    }
  },
  computed: {
    ...mapGetters('devices', { devices: 'find', get: 'get' }),
    componentItems () {
      return this.devices().data.map((item) => {
        item = { ...item, removeIcon: 'mdi-delete' }
        item = { ...item, removeColor: 'red' }

        if (item.online) {
          item = { ...item, onlineText: 'Online' }
          item = { ...item, onlineColor: 'green' }
        } else {
          item = { ...item, onlineText: 'Offline' }
          item = { ...item, onlineColor: 'red' }
        }
        switch (item.level) {
          case 0:
            item = { ...item, levelLabel: 'Info' }
            item = { ...item, levelColor: 'yellow' }
            break
          case 1:
            item = { ...item, levelLabel: 'Warning' }
            item = { ...item, levelColor: 'orange' }
            break
          case 2:
            item = { ...item, levelLabel: 'Error' }
            item = { ...item, levelColor: 'red' }
            break
        }

        item.updatedLabel = new Date(item.updated)

        return item
      })
    }
  },
  mounted () {
    this.findDevices()
  },
  methods: {
    ...mapActions('devices', { findDevices: 'find', remove: 'remove' }),
    onEvent (event) {
      switch (event.eventName) {
        case 'removeDevice':
          this.remove(event.item._id)
          break
      }
    }
  }
}
</script>
<style>
</style>
