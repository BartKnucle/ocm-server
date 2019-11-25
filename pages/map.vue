<template>
  <section>
    <svg id="graph" ref="graph">
      <circle
        v-for="node in nodes"
        :key="node._id"
        r="20"
        :class="node.class"
      />
      <line
        v-for="link in links"
        :key="link.source + link.target"
        stroke="white"
        stroke-width="2"
      />
    </svg>
  </section>
</template>

<script>
import * as d3 from 'd3'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {},
  data () {
    return {
      width: 1000,
      height: 1000,
      loaded: false
    }
  },
  computed: {
    ...mapGetters('devices', { devices: 'find' }),
    ...mapGetters('subnets', { subnets: 'find' }),
    nodes () {
      return [
        ...this.devices().data
          .map((o) => {
            o.class = 'device '
            o.class += o.os_distro.replace(/\s/g, '')
            return o
          }),
        ...this.subnets().data
          .map((o) => {
            o.class = 'subnet '
            return o
          })
      ]
    },
    links () {
      return [...this.devices().data]
        .filter(link => link.net_gatewayV4)
        .map((link) => {
          const newLink = {}
          newLink.source = link._id
          newLink.target = link.net_gatewayV4
          return newLink
        })
    }
  },
  watch: {
    nodes () {
      this.restart()
    },
    links () {
      this.restart()
    }
  },
  mounted () {
    this.svg = d3.select('#graph')
      .attr('viewBox', `0 0 ${this.height} ${this.width}`)

    const loadDevices = this.findDevices()
    const loadSubnets = this.findSubnets()

    Promise.all([loadDevices, loadSubnets])
      .then((devices, subnets) => {
        this.loaded = true
        this.restart()
      })
  },
  methods: {
    ...mapActions('devices', { findDevices: 'find' }),
    ...mapActions('subnets', { findSubnets: 'find' }),
    restart () {
      if (this.loaded) {
        this.simulation = d3.forceSimulation(this.nodes)
          .force('charge', d3.forceManyBody().strength(d => -100))
          .force('link', d3.forceLink(this.links).id((d) => { return d._id }).distance(50))
          .force('center', d3.forceCenter(this.width / 2, this.height / 2))
          .on('tick', this.ticked)
      }
    },
    ticked () {
      const u = this.svg
        .selectAll('circle')
        .data(this.nodes)

      u.enter()
        .merge(u)
        .attr('cx', (d) => {
          return d.x
        })
        .attr('cy', (d) => {
          return d.y
        })

      u.exit().remove()

      const v = this.svg
        .selectAll('line')
        .data(this.links)

      v.enter()
        .merge(v)
        .attr('x1', (d) => {
          return d.source.x
        })
        .attr('y1', (d) => {
          return d.source.y
        })
        .attr('x2', (d) => {
          return d.target.x
        })
        .attr('y2', (d) => {
          return d.target.y
        })

      v.exit().remove()
    }
  }
}
</script>
<style scoped>
  #graph {
    position:fixed;
    top:0;
    left:0;
    height: 100%;
    width: 100%;
  }

  .device {
    fill: red;
    stroke: white;
  }

  .Ubuntu {
    fill: orange;
    stroke:white
  }

  .MicrosoftWindows10Entreprise {
    fill: lightblue;
    stroke:white
  }

  line {
    stroke: red;
  }

</style>
