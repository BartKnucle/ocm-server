<template>
  <section>
    <Card>
      <ActionBar
        :items="buttons"
        @componentEvent="$emit('onBtnBar', $event)"
      >
        <v-spacer />
      </ActionBar>
      <Treeview
        :nodes="items"
        :properties="properties"
        @selectItem="$emit('selectItem', $event)"
      />
    <slot/>
    </Card>
  </section>
</template>
<script>
import Card from '~/components/atomic/atoms/card.vue'
import TextField from '~/components/atomic/atoms/text-field.vue'
import ActionBar from '~/components/atomic/molecules/action-bar.vue'
import Treeview from '~/components/atomic/atoms/treeview.vue'
export default {
  components: {
    Card,
    TextField,
    ActionBar,
    Treeview
  },
  props: {
    items: {
      type: Array,
      default: () => { return [] }
    },
    buttons: {
      type: Array,
      default: () => { return [] }
    },
    properties: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      textProperties: [
        { 'outlined': true },
        { 'placeholder': 'Location name' }
      ],
      selected: null,
      locationName: ''
    }
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>
<style>
</style>
