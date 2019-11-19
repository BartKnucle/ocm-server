<template>
  <section>
    <svg id="graph" ref="graph">
      <circle
        v-for="device in devices().data"
        :key="device._id"
        cx="500"
        cy="500"
        r="20"
        :class="'device ' + device.distro.replace(/\s/g, '')"
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
      height: 1000
    }
  },
  computed: {
    ...mapGetters('devices', { devices: 'find' })
  },
  created () {
    this.findDevices()
      .then((devices) => {
        this.createGraph()
      })
  },
  methods: {
    ...mapActions('devices', { findDevices: 'find' }),
    createGraph () {
      this.svg = d3.select('#graph')
        .attr('viewBox', `0 0 ${this.height} ${this.width}`)

      this.simulation = d3.forceSimulation(
        this.devices().data.map((device) => {
          device.x = null
          device.y = null
          return device
        })
      )
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(this.width / 2, this.height / 2))
        .on('tick', this.ticked)
    },
    ticked () {
      const u = this.svg
        .selectAll('circle')
        .data(this.devices().data)

      u.enter()
        .merge(u)
        .attr('cx', (d) => {
          return d.x
        })
        .attr('cy', (d) => {
          return d.y
        })

      u.exit().remove()
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
