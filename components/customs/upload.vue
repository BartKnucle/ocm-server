<template>
  <v-layout>
    <v-file-input
      label="File input"
      @change="upload($event)">
      <template v-slot:selection="{ text }">
        <v-chip
          small
          label
          color="primary"
        >
          {{ text }}
        </v-chip>
        <v-progress-circular :value="progress"> {{ progress }} </v-progress-circular>
      </template>
    </v-file-input>
  </v-layout>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      progress: 0
    }
  },
  methods: {
    ...mapActions('upload', { create: 'create' }),
    upload (file) {
      const formData = new FormData()
      formData.append('avatar', file)

      const xhr = new XMLHttpRequest()

      xhr.open('POST', '/upload')

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
