<template>
  <section>
    <v-tabs>
      <v-tab>
        List
      </v-tab>
      <v-tab-item>
        <Datatable
          :items="componentItems"
          :headers="headers"
          :buttons="buttons"
          @componentEvent="onEvent"
        />
      </v-tab-item>
      <v-tab>
        Map
      </v-tab>
      <v-tab-item
        class="d-flex flex-grow-1 flex-shrink-1"
      >
        <v-card
          width="400"
        >
          {{ hovered }}
        </v-card>
        <div id="container" class="svg-container">
          <svg
            viewBox="0 0 1000 600"
          >
            <g
              v-if="rootNode"
            >
              <circle
                v-for="item in rootNode.descendants()"
                :key="item.data._id"
                :class="item.data.class"
                :r="item.r || 0"
                :cx="item.x || 0"
                :cy="item.y + 10 || 0"
                @mouseover="hovered = getNode(item.data._id)"
              />
            </g>
          </svg>
        </div>
      </v-tab-item>
    </v-tabs>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as d3 from 'd3'
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
      ],
      rootNode: null,
      width: 1000,
      height: 600,
      hovered: null
    }
  },
  computed: { // only getters have live queries
    ...mapGetters('devices', { devices: 'find', get: 'get' }),
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
    },
    nodes () {
      const compare = (a, b) => {
        // Use toUpperCase() to ignore character casing
        if (a.parent === undefined) {
          return 1
        }

        if (b.parent === undefined) {
          return -1
        }

        const itemA = a.parent.toUpperCase()
        const itemB = b.parent.toUpperCase()

        let comparison = 0
        if (itemA > itemB) {
          comparison = 1
        } else if (itemA < itemB) {
          comparison = -1
        }
        return comparison
      }

      return [
        ...this.locations().data
          .map((location) => {
            return {
              _id: location._id,
              parent: location.parent,
              type: 'Location',
              name: location.name,
              get class () {
                return this.type + ' Node'
              }
            }
          })
          .sort(compare),
        ...this.subnets().data
          .map((subnet) => {
            return {
              _id: subnet._id,
              parent: subnet.location,
              type: 'Subnet',
              name: subnet._id,
              get class () {
                return this.type + ' Node'
              }
            }
          })
          .sort(compare),
        ...this.devices().data
          .map((device) => {
            return {
              _id: device._id,
              parent: device.net_gatewayV4,
              type: 'Device',
              name: device.os_hostname,
              online: device.online,
              value: 1,
              get class () {
                switch (this.online) {
                  case true:
                    return 'Online Node'
                  case false:
                    return 'Offline Node'
                }
              }
            }
          })
          .sort(compare)
      ]
    },
    tree () {
      return {
        name: 'root',
        class: 'Location',
        children: this.list_to_tree(this.nodes)
      }
    }
  },
  watch: {
    tree (val) {
      this.updateGraph()
    }
  },
  mounted () {
    const loadLocations = this.findLocations()
    const loadSubnets = this.findSubnets()
    const loadDevices = this.findDevices()

    Promise.all([loadLocations, loadSubnets, loadDevices])
      .then((devices, subnets, groups) => {
        this.updateGraph()
      })
  },
  methods: {
    ...mapActions('devices', { findDevices: 'find', remove: 'remove' }),
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

      this.updateGraph()
    },
    updateGraph () {
      const svg = d3.select('svg')

      svg.call(d3.zoom().on('zoom', function () {
        svg.attr('transform', d3.event.transform)
      }))

      const packLayout = d3.pack()
        .size([this.width * 0.90, this.height * 0.90])
        .padding(10)

      this.rootNode = d3.hierarchy(this.tree)
      this.rootNode.sum((d) => {
        return d.value
      })
      packLayout(this.rootNode)
    },
    list_to_tree (list) {
      const map = {}
      let node
      const roots = []
      let i

      for (i = 0; i < list.length; i += 1) {
        map[list[i]._id] = i // initialize the map
        list[i].children = [] // initialize the children
      }

      for (i = 0; i < list.length; i += 1) {
        node = list[i]
        if (node.parent !== undefined) {
          if (map[node.parent] !== undefined) {
            list[map[node.parent]].children.push(node)
          }
        } else {
          roots.push(node)
        }
      }

      return roots
    },
    getNode (nodeId) {
      const node = this.nodes.find(x => x._id === nodeId)
      if (node) {
        return {
          type: node.type,
          name: node.name
        }
      }
    }
  }
}
</script>
<style>
  .svg-container {
    width: 100%;
  }

  .svg {
    fill: blue;
    vertical-align: middle;
  }

  .Node:hover {
    stroke: red;
  }

  .Location {
    fill: salmon;
    opacity: 0.3;
    stroke: white;
  }

  .Subnet {
    fill: salmon;
    opacity: 0.5;
    stroke: white;
  }

  .Online {
    fill: green;
    opacity: 1;
    stroke-width: 0;
  }

  .Offline {
    fill: red;
    opacity: 1;
    stroke-width: 0;
  }
</style>
