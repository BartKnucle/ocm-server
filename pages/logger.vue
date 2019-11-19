<template>
  <section>
    <v-card>
      <v-toolbar
        color="primary"
      >
        <v-toolbar-title class="white--text">
          Logs
        </v-toolbar-title>
        <v-spacer />
        <v-spacer />
        <v-btn
          icon
          @click="$refs.ListLogs.clear()"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </v-toolbar>
      <ListLogs ref="ListLogs" />
    </v-card>
  </section>
</template>
<script>
import ListLogs from '~/components/logger/list.vue'
export default {
  components: {
    ListLogs
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
.auth-form ul {
  list-style: none;
  padding: 0;
}

.auth-form li + li {
  margin-top: .5em;
}
</style>
