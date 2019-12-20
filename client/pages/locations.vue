<template>
  <section>
    <br>
    <v-row>
      <v-col>
        <TreeCard
          :buttons="treeButtons"
          :items="locations().data"
          :properties="treeProperties"
          @onBtnBar="onBtnBar"
          @selectItem="selectLocation"
        />
        <v-dialog
          v-model="locationDialog"
          max-width="600px"
        >
          <Card>
            <TextField
              :properties="textProperties"
              :item="locationName"
              @textChanged="locationName=$event"
            />
            <ActionBar
              :items="saveLocationsButtons"
              @componentEvent="onBtnBar"
            >
              <v-spacer />
            </ActionBar>
          </Card>
        </v-dialog>
      </v-col>
      <v-col>
        <ListCard
          :buttons="subnetsButtons"
          :properties="listProperties"
          @onBtnBar="onBtnBar"
        >
          <v-list-item-group
            v-model="locationSubnet"
          >
            <v-list-item
              v-for="(item) in subnets().data.filter(subnet => subnet.location === selectedLocation)"
              :key="item._id"
            >
              {{ item.start }}
            </v-list-item>
          </v-list-item-group>
        </ListCard>
        <v-dialog
          v-model="subnetDialog"
          max-width="600px"
        >
          <Card>
            <v-list>
              <v-list-item-group
                v-model="availableSubnet"
              >
                <v-list-item
                  v-for="(item) in subnets().data.filter(subnet => (!subnet.location || subnet.location === ''))"
                  :key="item._id"
                >
                  {{ item.start }}
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <ActionBar
              :items="saveSubnetsButtons"
              @componentEvent="onBtnBar"
            >
              <v-spacer />
            </ActionBar>
          </Card>
        </v-dialog>
      </v-col>
    </v-row>
    {{ availableSubnet }}
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import TreeCard from '~/components/atomic/organisms/tree-card.vue'
import ListCard from '~/components/atomic/organisms/list-card.vue'
import Card from '~/components/atomic/atoms/card.vue'
import TextField from '~/components/atomic/atoms/text-field.vue'
import ActionBar from '~/components/atomic/molecules/action-bar.vue'
import Treeview from '~/components/atomic/atoms/treeview.vue'
export default {
  components: {
    TreeCard,
    ListCard,
    Card,
    TextField,
    ActionBar,
    Treeview
  },
  data () {
    return {
      treeProperties: [
        { 'item-key': '_id' },
        { 'activatable': true }
      ],
      textProperties: [
        { 'placeholder': 'Location name' }
      ],
      listProperties: [
        { 'disabled': false }
      ],
      selectedLocation: null,
      locationName: '',
      locationSubnet: null,
      availableSubnet: null,
      locationDialog: false,
      subnetDialog: false
    }
  },
  computed: {
    ...mapGetters('subnets', { subnets: 'find', get: 'get' }),
    ...mapGetters('locations', { locations: 'find', get: 'get' }),
    saveSubnetsButtons () {
      return [
        {
          _id: 'cancelSubnet',
          btnIcon: 'mdi-undo'
        },
        {
          _id: 'saveSubnet',
          btnIcon: 'mdi-content-save',
          disabled: !(this.availableSubnet)
        }
      ]
    },
    saveLocationsButtons () {
      return [
        {
          _id: 'cancelLocation',
          btnIcon: 'mdi-undo'
        },
        {
          _id: 'saveLocation',
          btnIcon: 'mdi-content-save',
          disabled: !(this.locationName !== '')
        }
      ]
    },
    treeButtons () {
      return [
        {
          _id: 'removeLocation',
          btnIcon: 'mdi-delete',
          disabled: !this.allowSuppressLocation
        },
        {
          _id: 'addLocation',
          btnIcon: 'mdi-plus'
        }
      ]
    },
    allowSuppressLocation () {
      return (
        this.locations().data
          .filter(x => x.parent === this.selectedLocation)
          .length === 0 &&
        this.subnets().data
          .filter(subnet => subnet.location === this.selectedLocation)
          .length === 0
      )
    },
    allowSuppressSubnet () {
      console.log(this.locationSubnet)
      return this.locationSubnet >= 0 && this.locationSubnet !== null
    },
    subnetsButtons () {
      return [
        {
          _id: 'removeSubnet',
          btnIcon: 'mdi-delete',
          disabled: !this.allowSuppressSubnet
        },
        {
          _id: 'addSubnet',
          btnIcon: 'mdi-plus',
          disabled: !this.selectedLocation
        }
      ]
    }
  },
  watch: {
    selectedLocation (val) {
      if (val === undefined) {
        this.locationSubnet = null
      }
    },
    subnetDialog (val) {
      if (!val) {
        this.availableSubnet = null
      }
    }
  },
  mounted () {
    this.findSubnets()
    this.findLocations()
  },
  methods: {
    ...mapActions('subnets', { findSubnets: 'find', update: 'update' }),
    ...mapActions('locations', { findLocations: 'find', remove: 'remove', create: 'create' }),
    async onBtnBar (event) {
      if (event.item._id === 'addLocation') {
        this.locationDialog = true
      }

      if (event.item._id === 'cancelLocation') {
        this.locationName = ''
        this.locationDialog = false
      }

      if (event.item._id === 'removeLocation') {
        if (this.selectedLocation) {
          this.remove(this.selectedLocation)
          this.selectedLocation = ''
        }
      }

      if (event.item._id === 'saveLocation') {
        const Location = { name: this.locationName }
        if (this.selectedLocation) {
          Location.parent = this.selectedLocation
        }
        this.create(Location)
        this.locationName = ''
        this.locationDialog = false
      }

      if (event.item._id === 'addSubnet') {
        this.subnetDialog = true
      }

      if (event.item._id === 'cancelSubnet') {
        this.subnetDialog = false
      }

      if (event.item._id === 'removeSubnet') {
        const { location, updated, _id, ...rest } = this.subnets().data.filter(subnet => subnet.location === this.selectedLocation)[this.locationSubnet]
        rest.location = ''
        this.update([
          _id,
          rest
        ])
      }

      if (event.item._id === 'saveSubnet') {
        await this.update([
          this.subnets().data.filter(subnet => (!subnet.location || subnet.location === ''))[this.availableSubnet]._id,
          {
            ...this.subnets().data.filter(subnet => (!subnet.location || subnet.location === ''))[this.availableSubnet],
            location: this.selectedLocation
          }
        ])

        this.subnetDialog = false
      }
    },
    selectLocation (event) {
      this.selectedLocation = event[0]
    }
  }
}
</script>
<style>
</style>
