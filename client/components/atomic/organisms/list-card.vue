<template>
  <section>
    <Card>
      <ActionBar
        :items="buttons"
        @componentEvent="$emit('onBtnBar', $event)"
      >
        <v-spacer />
      </ActionBar>
      <List
        :properties="properties"
        @selectItem="$emit('selectItem', $event)"
      >
        <slot/>
      </List>
    </Card>
  </section>
</template>
<script>
import Card from '~/components/atomic/atoms/card.vue'
import TextField from '~/components/atomic/atoms/text-field.vue'
import ActionBar from '~/components/atomic/molecules/action-bar.vue'
import List from '~/components/atomic/atoms/list.vue'
export default {
  components: {
    Card,
    TextField,
    ActionBar,
    List
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
    return {}
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>
<style>
</style>
