<template>
  <section>
    <svg>
      <g
        v-if="rootNode">
        <circle
          v-for="item in rootNode.descendants()"
          :key="item.data.name"
          :class="item.data.class"
          :r="item.value"
          :cx="item.x"
          :cy="item.y"
        >
        </circle>
      </g>
    </svg>
  </section>
</template>

<script>
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
                value: 500
              },
              {
                name: '42S',
                class: 'Location',
                value: 150
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
  computed: {},
  watch: {},
  mounted () {
    const packLayout = d3.pack()
      .size([1000, 1000])
      .padding(10)

    this.rootNode = d3.hierarchy(this.items)

    this.rootNode.sum((d) => {
      return d.value
    })

    packLayout(this.rootNode)
    console.log(this.rootNode.descendants())

    d3.select('svg')
      .attr('viewBox', `0 0 ${this.height} ${this.width}`)
  },
  methods: {
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

  circle {
    fill: rgb(226, 132, 132);
    opacity: 0.3;
    stroke: white;
  }
</style>
