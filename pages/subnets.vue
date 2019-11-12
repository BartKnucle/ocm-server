<template>
  <section>
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-toolbar-title class="white--text">
          Subnets
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <ListSubnets
        @edit="edit($event)"
      />
    </v-card>
  </section>
</template>

<script>
import ListSubnets from '~/components/subnets/list.vue'
export default {
  components: {
    ListSubnets
  },
  data () {
    return {}
  }
}
</script>
