<template>
  <TypePicker :items="items" />
</template>

<script>
import TypePicker from '~/components/customs/type-picker.vue'
export default {
  components: {
    TypePicker
  },
  data () {
    return {
      items: [
        {
          value: 'location',
          text: 'Location',
          icon: 'mdi-home'
        },
        {
          value: 'hardware',
          text: 'Hardware',
          icon: 'mdi-laptop'
        },
        {
          value: 'Software',
          text: 'Software',
          icon: 'mdi-windows'
        }
      ]
    }
  }
}
</script>
