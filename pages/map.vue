<template>
  <section>
    <svg id="graph" ref="graph">
      <circle
        v-for="device in devices().data"
        :key="device._id"
        r="20"
        :class="'device ' + device.distro.replace(/\s/g, '')"
      />
      <circle
        v-for="subnet in subnets().data"
        :key="subnet._id"
        r="20"
        class="subnet"
      />
      <line
        v-for="link in links"
        :key="link.source + link.target"
        stroke="white"
        stroke-width="2"
      />
    </svg>
    {{ nodes }}
    {{ links }}
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
      height: 1000
    }
  },
  computed: {
    ...mapGetters('devices', { devices: 'find' }),
    ...mapGetters('subnets', { subnets: 'find' }),
    nodes () {
      const nodes = [...this.devices().data, ...this.subnets().data]
      return nodes
    },
    links () {
      const devicesLinks = [...this.devices().data]
        .filter(link => link.gatewayV4)
        .map((link) => {
          const newLink = {}
          newLink.source = link._id
          newLink.target = link.gatewayV4
          return newLink
        })
      return devicesLinks
    }
  },
  created () {
    const loadDevices = this.findDevices()
    const loadSubnets = this.findSubnets()

    Promise.all([loadDevices, loadSubnets])
      .then((devices) => {
        this.createGraph()
      })
  },
  methods: {
    ...mapActions('devices', { findDevices: 'find' }),
    ...mapActions('subnets', { findSubnets: 'find' }),
    createGraph () {
      this.svg = d3.select('#graph')
        .attr('viewBox', `0 0 ${this.height} ${this.width}`)

      this.simulation = d3.forceSimulation(this.nodes)
        .force('charge', d3.forceManyBody().strength(d => -100))
        .force('link', d3.forceLink(this.links).id((d) => { return d._id }).distance(50))
        .force('center', d3.forceCenter(this.width / 2, this.height / 2))
        .on('tick', this.ticked)
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
    fill: blue;
    stroke: white;
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
