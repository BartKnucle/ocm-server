<template>
  <section>
    <v-icon
      v-for="icon in icons"
      v-bind:key="icon"
      large
    >
      {{ icon.icon }}
    </v-icon>
  </section>
</template>

<script>
export default {
  data () {
    return {
      icons: [
        {
          name: 'City',
          icon: 'mdi-city-variant'
        },
        {
          name: 'Laptop',
          icon: 'mdi-laptop'
        },
        {
          name: 'Desktop',
          icon: 'mdi-desktop-tower'
        },
        {
          name: 'Server',
          icon: 'mdi-server'
        },
        {
          name: 'Mac',
          icon: 'mdi-desktop-mac-dashboard'
        },
        {
          name: 'Linux',
          icon: 'mdi-linux'
        },
        {
          name: 'Windows',
          icon: 'mdi-windows'
        }
      ]
    }
  }
}
</script>
