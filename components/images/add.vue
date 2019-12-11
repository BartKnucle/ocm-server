<template>
  <v-dialog
    v-model="dialog"
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ status }} {{ name }}</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Name"
          hint="Enter the image name"
        />
      </v-card-text>
      <Upload />
      <small>*indicates required field</small>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close()">
          Close
        </v-btn>
        <v-btn text @click="add()">
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Upload from '~/components/customs/upload.vue'
export default {
  components: {
    Upload
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  mounted () {},
  methods: {
    add () {}
  }
}
</script>
