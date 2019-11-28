<template>
  <section>
    <svg width="1000" height="1000">
      <g />
    </svg>
  </section>
</template>

<script>
import * as d3 from 'd3'
export default {
  components: {},
  data () {
    return {
      root: null,
      pack: {
        name: 'CCIR',
        children: [
          {
            name: '99M',
            children: [
              {
                name: '69R',
                value: 500
              },
              {
                name: '42S',
                value: 150
              },
              {
                name: '42R',
                value: 50
              }
            ]
          },
          {
            name: '07A',
            children: [
              {
                name: 'AUBENAS',
                value: 50
              },
              {
                name: 'ANNONAY',
                value: 30
              },
              {
                name: 'LANAS',
                value: 50
              }
            ]
          },
          {
            name: '38G',
            children: [
              {
                name: 'IMT',
                value: 200
              },
              {
                name: 'SIEGE',
                value: 150
              },
              {
                name: 'HOCHE',
                value: 150
              }
            ]
          },
          {
            name: '38N',
            children: [
              {
                name: 'VIENNE',
                value: 50
              },
              {
                name: 'VILEFONTAINE',
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
      .size([800, 800])
      .padding(10)

    const rootNode = d3.hierarchy(this.pack)

    rootNode.sum((d) => {
      return d.value
    })

    packLayout(rootNode)

    const nodes = d3.select('svg g')
      .selectAll('g')
      .data(rootNode.descendants())
      .enter()
      .append('g')

    nodes
      .append('circle')
      .attr('cx', (d) => { return d.x })
      .attr('cy', (d) => { return d.y })
      .attr('r', (d) => { return d.r })

    nodes
      .append('text')
      .attr('dx', (d) => { return d.x })
      .attr('dy', (d) => { return d.y })
      .style('font', '14px times')
      .text((d) => {
        return d.children === undefined ? d.data.name : ''
      })
  },
  methods: {}
}
</script>
<style>
  circle {
    fill: #333;
    opacity: 0.3;
    stroke: white;
  }
</style>
