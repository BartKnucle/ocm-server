<template>
  <section>
    <v-card>
      <v-toolbar extended>
        <v-toolbar-title class="white--text">
          Groups
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
        <template v-slot:extension>
          <v-btn
            fab
            bottom
            left
            absolute
            @click="groupAddDialog = !groupAddDialog"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <ListGroups />
    </v-card>
    <AddEditGroups
      :dialog="groupAddDialog"
      @closed="groupAddDialog = false"
    />
    {{ groupAddDialog }}
  </section>
</template>

<script>
import AddEditGroups from '~/components/groups/add-edit.vue'
import ListGroups from '~/components/groups/list.vue'
export default {
  components: {
    AddEditGroups,
    ListGroups
  },
  data () {
    return {
      groupAddDialog: false
    }
  }
}
</script>
