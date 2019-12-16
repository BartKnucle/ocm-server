<template>
  <v-card>
    <v-toolbar
      color="primary"
    >
      <v-toolbar-title class="white--text">
        Devices
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>
          mdi-view-module
        </v-icon>
      </v-btn>
    </v-toolbar>
    <ListDevices />
  </v-card>
</template>

<script>
import ListDevices from '~/components/devices/list.vue'
export default {
  name: 'Devices',
  components: {
    ListDevices
  }
}
</script>
