<template>
  <section>
    <br>
    <Card>
      <ActionBar
        :items="buttons"
        @componentEvent="onBtnBar"
      >
        <v-spacer />
      </ActionBar>
      <TextField
        :properties="textProperties"
        @textChanged="onTextChanged"
      />
      <Treeview
        :nodes="items"
        :properties="treeProperties"
        @selectItem="selectLocation"
      />
    </Card>
    {{ items }}
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
  data () {
    return {
      buttons: [
        {
          _id: 'addLocation',
          btnIcon: 'mdi-plus'
        }
      ],
      textProperties: [
        { 'outlined': true },
        { 'placeholder': 'Location name' }
      ],
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
      ],
      selected: null,
      locationName: ''
    }
  },
  computed: {},
  mounted () {},
  methods: {
    onBtnBar (event) {
      if (event.item._id === 'addLocation') {
        const Location = { _id: this.items.length + 1, name: this.locationName }
        if (this.selected) {
          Location.parent = this.selected
        }
        console.log(Location)
        this.items.push(Location)
      }
    },
    onTextChanged (event) {
      this.locationName = event
    },
    selectLocation (event) {
      this.selected = event[0]
    }
  }
}
</script>
<style>
</style>
