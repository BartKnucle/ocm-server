<template>
  <section>
    {{ tree }}
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
                        name: 'DEVICE1',
                        class: 'Device',
                        value: 1
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                      },
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
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                      },
                      {
                        name: 'DEVICE5',
                        class: 'Device',
                        value: 1
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                  }
                ]
              },
              {
                name: '42S',
                class: 'Location',
                children: [
                  {
                    name: '172.18.2.1',
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
                      },
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
                      },
                      {
                        name: 'DEVICE1',
                        class: 'Device',
                        value: 1
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                      },
                      {
                        name: 'DEVICE5',
                        class: 'Device',
                        value: 1
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                      },
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
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                      },
                      {
                        name: 'DEVICE2',
                        class: 'Device',
                        value: 1
                      },
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
                  }
                ]
              },
              {
                name: '42R',
                class: 'Location',
                value: 50
              }
            ]
          },
          {
            name: '07A',
            class: 'Location',
            children: [
              {
                name: 'AUBENAS',
                class: 'Location',
                value: 50
              },
              {
                name: 'ANNONAY',
                class: 'Location',
                value: 30
              },
              {
                name: 'LANAS',
                class: 'Location',
                value: 50
              }
            ]
          },
          {
            name: '38G',
            class: 'Location',
            children: [
              {
                name: 'IMT',
                class: 'Location',
                value: 200
              },
              {
                name: 'SIEGE',
                class: 'Location',
                value: 150
              },
              {
                name: 'HOCHE',
                class: 'Location',
                value: 150
              }
            ]
          },
          {
            name: '38N',
            class: 'Location',
            children: [
              {
                name: 'VIENNE',
                class: 'Location',
                value: 50
              },
              {
                name: 'VILEFONTAINE',
                class: 'Location',
                value: 50
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('devices', { devices: 'find', get: 'get' }),
    tree () {
      return this.devices().data
        .map((device) => {
          return { _id: device._id }
        })
    }
  },
  watch: {},
  mounted () {
    this.findDevices()
    d3.select('svg')
      .attr('viewBox', `0 0 ${this.height} ${this.width}`)

    const packLayout = d3.pack()
      .size([this.width * 0.85, this.height * 0.85])
      .padding(10)

    this.rootNode = d3.hierarchy(this.items)

    this.rootNode.sum((d) => {
      return d.value
    })

    packLayout(this.rootNode)
  },
  methods: {
    ...mapActions('devices', { findDevices: 'find', remove: 'remove' }),
    handleMouseOver (d, i) {
      d.fill = 'orange'
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
