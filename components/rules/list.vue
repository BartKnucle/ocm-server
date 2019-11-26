<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="rules"
      item-key="_id"
    >
      <template v-slot:item.updated="{ item }">
        {{ new Date(item.updated).toLocaleString() }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn icon @click="$emit('remove', item._id)">
          <v-icon
            color="red"
          >
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </section>
</template>

<script>
export default {
  components: {},
  props: {
    rules: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      headers: [
        { value: 'source', text: 'Source' },
        { value: 'query', text: 'Query' },
        { value: 'group', text: 'Group' },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>
