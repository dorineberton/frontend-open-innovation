<template>
  <div>
    <h2>Liste des utilisateurs</h2>
    <v-data-table
      :headers="headers"
      :items="getUsers"
    >
    <template v-slot:top>
      <v-dialog v-model="dialogEdit">
        <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.fistname"
                  label="Prénom"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.lastname"
                  label="Nom"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.password"
                  label="Mot de passe"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.has_access"
                  label="Visible"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="getUsers"
      >
        Reset
      </v-btn>
    </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Users',
  components: {
    //
  },
  data () {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'PRENOM', value: 'firstname' },
        { text: 'NOM', value: 'lastname' },
        { text: 'EMAIL', value: 'email' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      dialogEdit: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        fistname: '',
        lastname: '',
        email: '',
        password: '',
        has_access: 1
      },
      defaultItem: {
        fistname: '',
        lastname: '',
        email: '',
        password: '',
        has_access: 1
      }
    }
  },
  computed: {
    ...mapGetters(['getUsers']),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialogEdit (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.getUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    deleteItem (item) {
      this.editedIndex = this.getUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.getUsers.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.getUsers[this.editedIndex], this.editedItem)
      } else {
        this.getUsers.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
