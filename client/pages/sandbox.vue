<template>
  <section>
    <svg>
      <g
        v-if="rootNode"
      >
        <circle
          v-for="item in rootNode.descendants()"
          :key="item.data.name"
          :class="item.data.class"
          :r="item.r"
          :cx="item.x"
          :cy="item.y + 10"
        />
      </g>
    </svg>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as d3 from 'd3'
export default {
  components: {},
  data () {
    return {
      rootNode: null,
      width: 1000,
      height: 1000,
      items: {
        name: 'CCIR',
        class: 'Location',
        children: [
          {
            name: '99M',
            class: 'Location',
            children: [
              {
                name: '69R',
                class: 'Location',
                children: [
                  {
                    name: '172.18.2.1',
                    class: 'Subnet',
                    children: [
                      {
                        name: 'DEVICE3',
                        class: 'Device',
                        value: 1
                      },
                      {
                        name: 'DEVICE4',
                        class: 'Device',
                        value: 1
                      },
                      {
                        name: 'DEVICE5',
                        class: 'Device',
                        value: 1
                      }
                    ]
                  },
                  {
                    name: '172.18.9.1',
                    class: 'Subnet',
                    children: [
                      {
                        name: 'DEVICE1',
                        class: 'Device',
                        value: 1
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('devices', { devices: 'find', get: 'get' }),
    ...mapGetters('subnets', { subnets: 'find', get: 'get' }),
    ...mapGetters('groups', { groups: 'find', get: 'get' }),
    tree () {
      const compare = (a, b) => {
        // Use toUpperCase() to ignore character casing
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

      return this.list_to_tree([
        ...this.groups().data
          .map((group) => {
            return { _id: group._id, parent: group.parent, class: 'Location' }
          })
          .sort(compare),
        ...this.subnets().data
          .map((subnet) => {
            return { _id: subnet._id, parent: subnet.group, class: 'Subnet' }
          })
          .sort(compare),
        ...this.devices().data
          .map((device) => {
            return { _id: device._id, parent: device.net_gatewayV4, value: 1, Class: 'Device' }
          })
          .sort(compare)
      ])[0]
    }
  },
  watch: {},
  mounted () {
    const loadGroups = this.findGroups()
    const loadSubnets = this.findSubnets()
    const loadDevices = this.findDevices()

    d3.select('svg')
      .attr('viewBox', `0 0 ${this.height} ${this.width}`)

    const packLayout = d3.pack()
      .size([this.width * 0.85, this.height * 0.85])
      .padding(10)

    Promise.all([loadDevices, loadSubnets, loadGroups])
      .then((devices, subnets, groups) => {
        this.rootNode = d3.hierarchy(this.tree)
        this.rootNode.sum((d) => {
          return d.value
        })
        packLayout(this.rootNode)
      })
  },
  methods: {
    ...mapActions('devices', { findDevices: 'find', remove: 'remove' }),
    ...mapActions('subnets', { findSubnets: 'find', remove: 'remove' }),
    ...mapActions('groups', { findGroups: 'find', remove: 'remove' }),
    handleMouseOver (d, i) {
      d.fill = 'orange'
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
        if (node.parent !== '') {
          // if you have dangling branches check that map[node.parentId] exists
          list[map[node.parent]].children.push(node)
        } else {
          roots.push(node)
        }
      }

      return roots
    }
  }
}
</script>
<style>
   svg {
    position:fixed;
    height: 100%;
    width: 100%;
  }

  .Location {
    fill: salmon;
    opacity: 0.3;
    stroke: white;
  }

  .Subnet {
    fill: rebeccapurple;
    opacity: 0.5;
    stroke: white;
  }

  .Device {
    fill:green;
    opacity: 1;
    stroke: white;
  }
</style>
