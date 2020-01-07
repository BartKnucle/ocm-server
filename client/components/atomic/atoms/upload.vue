<template>
  <v-layout>
    <v-file-input
      @change="upload($event)"
      label="File input"
    >
      <template v-slot:selection="{ text }">
        <v-chip
          small
          label
          color="primary"
        >
          {{ text }}
        </v-chip>
        <v-progress-circular
          :value="progress"
        >
          {{ progress }}
        </v-progress-circular>
      </template>
    </v-file-input>
  </v-layout>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      progress: 0,
      response: {}
    }
  },
  watch: {
    response (val) {
      this.$emit('uploaded', this.response)
    }
  },
  methods: {
    ...mapActions('upload', { create: 'create' }),
    upload (file) {
      const formData = new FormData()
      formData.append('avatar', file)

      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/upload')

      xhr.onload = (e) => {
        this.response = xhr.response
      }

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          this.progress = Math.round((e.loaded / e.total) * 100)
        }
      }

      xhr.send(formData)
    }
  }
}
</script>
<style>
</style>
