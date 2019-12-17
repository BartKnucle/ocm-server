<template>
  <section>
    <Card>
      <Treeview
        :items="items"
        :properties="treeProperties"
        @componentEvent="onEvent"
      />
    </Card>
  </section>
</template>
<script>
import Card from '~/components/atomic/atoms/card.vue'
import Treeview from '~/components/atomic/atoms/treeview.vue'
export default {
  components: {
    Card,
    Treeview
  },
  data () {
    return {
      treeProperties: [
        { 'item-key': '_id' },
        { 'activatable': true }
      ],
      items: [
        { _id: 1, name: '07A' },
        { _id: 2, name: 'Aubenas', parent: 1 },
        { _id: 3, name: 'Annonay', parent: 1 },
        { _id: 4, name: 'Lanas', parent: 1 },
        { _id: 5, name: '99M' },
        { _id: 6, name: '42S', parent: 5 },
        { _id: 7, name: 'Siege', parent: 6 },
        { _id: 8, name: 'Banc épreuve', parent: 6 },
        { _id: 9, name: '42R', parent: 5 },
        { _id: 10, name: 'Roanne', parent: 9 },
        { _id: 11, name: '69R', parent: 5 },
        { _id: 12, name: 'Bourse', parent: 11 },
        { _id: 13, name: 'Musée', parent: 11 },
        { _id: 14, name: 'Vaise', parent: 11 },
        { _id: 15, name: '38N' },
        { _id: 16, name: 'IMT', parent: 15 },
        { _id: 17, name: 'Champ de mines', parent: 8 }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {
    onEvent (event) {
      console.log(event)
    }
  }
}
</script>
<style>
</style>
