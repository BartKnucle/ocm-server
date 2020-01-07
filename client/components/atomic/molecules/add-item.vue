<template>
  <Dialog
    :bindings="dialog"
  >
    <Card>
      <slot />
    </Card>
  </Dialog>
</template>

<script>
import Card from '~/components/atomic/atoms/card.vue'
import Dialog from '~/components/atomic/atoms/dialog.vue'
import ItemPicker from '~/components/customs/item-picker.vue'
export default {
  components: {
    Card,
    Dialog,
    ItemPicker
  },
  props: {
    dialog: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      isVisible: false,
      imagesType: [
        {
          text: 'Windows'
        },
        {
          text: 'Linux'
        }
      ],
      selectedType: 'Windows'
    }
  },
  computed: {},
  watch: {
    dialog (val) {
      this.isVisible = val
    },
    isVisible (val) {
      !val && this.close()
    }
  },
  mounted () {},
  methods: {
    add () {},
    close () {
      this.$emit('closed')
    }
  }
}
</script>
