<template>
  <section>
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-toolbar-title class="white--text">
          Images
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          @click="add()"
          icon
        >
          <v-icon
            @click="showAddDialog = true"
          >
            mdi-plus
          </v-icon>
        </v-btn>
      </v-toolbar>
      <ListImages />
    </v-card>
    <AddImages
      :dialog="showAddDialog"
      @closed="showAddDialog = false"
    />
  </section>
</template>

<script>
import AddImages from '~/components/images/add.vue'
import ListImages from '~/components/images/list.vue'
export default {
  components: {
    AddImages,
    ListImages
  },
  data () {
    return {
      showAddDialog: false
    }
  },
  methods: {
    add () {}
  }
}
</script>
