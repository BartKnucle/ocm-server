<template>
  <section>
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-toolbar-title class="white--text">
          Rules
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          @click="add()"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-toolbar>
      <ListRules
        :rules="rules().data"
        @edit="edit($event)"
        @remove="removeRule"
      />
    </v-card>
    <AddEditRules
      :ruleid="add_edit_props.ruleid"
      :rules="rules().data"
      :groups="groups().data"
      :dialog="add_edit_props.dialog"
      :status="add_edit_props.status"
      @closed="add_edit_props.dialog = false"
      @saved="save"
      @edited="reset()"
    />
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import AddEditRules from '~/components/rules/add-edit.vue'
import ListRules from '~/components/rules/list.vue'
export default {
  components: {
    AddEditRules,
    ListRules
  },
  data () {
    return {
      add_edit_props: {
        dialog: false,
        status: 'Add',
        ruleid: null
      }
    }
  },
  computed: {
    ...mapGetters('rules', { rules: 'find', get: 'get' }),
    ...mapGetters('groups', { groups: 'find' })
  },
  mounted () {
    this.findRules()
    this.findGroups()
  },
  methods: {
    ...mapActions('rules', { findRules: 'find', create: 'create', patch: 'patch', remove: 'remove' }),
    ...mapActions('groups', { findGroups: 'find' }),
    save (rule) {
      if (!rule._id) {
        this.create(rule.data)
      } else {
        this.patch(rule._id, rule)
      }
    },
    removeRule (ruleId) {
      this.remove(ruleId)
    },
    reset () {
      this.add_edit_props.status = 'Add'
      this.add_edit_props.ruleid = ''
      this.add_edit_props.dialog = false
    },
    add () {
      this.add_edit_props.status = 'Add'
      this.add_edit_props.dialog = true
    },
    edit (val) {
      this.add_edit_props.status = 'Edit'
      this.add_edit_props.ruleid = val
      this.add_edit_props.dialog = true
    }
  }
}
</script>

<style>
.auth-form ul {
  list-style: none;
  padding: 0;
}

.auth-form li + li {
  margin-top: .5em;
}
</style>
