<template>
  <v-dialog
    v-model="isVisible"
  >
    <v-card>
      <v-card-title>
        <span class="headline" />
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Name"
          hint="Enter the image name"
        />
      </v-card-text>
      <Upload />
      <ItemPicker
        :items="imagesType"
        :selected="selectedType"
      />
      <small>*indicates required field</small>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="close()"
          text
        >
          Close
        </v-btn>
        <v-btn
          @click="add()"
          text
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Upload from '~/components/atomic/atoms/upload.vue'
import ItemPicker from '~/components/customs/item-picker.vue'
export default {
  components: {
    Upload,
    ItemPicker
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isVisible: false,
      imagesType: [
        {
          text: 'Windows'
        },
        {
          text: 'Linux'
        }
      ],
      selectedType: 'Windows'
    }
  },
  computed: {},
  watch: {
    dialog (val) {
      this.isVisible = val
    },
    isVisible (val) {
      !val && this.close()
    }
  },
  mounted () {},
  methods: {
    add () {},
    close () {
      this.$emit('closed')
    }
  }
}
</script>
