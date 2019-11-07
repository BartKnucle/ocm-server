<template>
  <section>
    <v-card>
      <v-toolbar
        color="primary"
      >
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
            @click="add()"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <ListGroups
        @edit="edit($event)"
      />
    </v-card>
    <AddEditGroups
      :groupid="groups.groupid"
      :dialog="groups.dialog"
      :status="groups.status"
      @closed="groups.dialog = false"
      @edited="reset()"
    />
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
      groups: {
        dialog: false,
        status: 'Add',
        groupid: ''
      }
    }
  },
  methods: {
    reset () {
      this.groups.status = 'Add'
      this.groups.groupid = ''
      this.groups.dialog = false
    },
    add () {
      this.groups.status = 'Add'
      this.groups.dialog = true
    },
    edit (val) {
      this.groups.status = 'Edit'
      this.groups.groupid = val
      this.groups.dialog = true
    }
  }
}
</script>
