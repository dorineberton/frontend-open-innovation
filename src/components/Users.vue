<template>
    <v-data-table
      data-app
      :headers="headers"
      :items="users"
      class="elevation-1"
    >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Liste des utilisateurs</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialogEdit"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="btn-add-user mx-2"
              fab
              v-bind="attrs"
              v-on="on"
              style="color:#fff; background:#1976D2"
            >
              <v-icon>mdi-account-plus</v-icon>
            </v-btn>
          </template>
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
                      v-model="editedItem.firstname"
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
                      label="visible"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.role"
                      label="role"
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
                Annuler
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Enregistrer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Voulez-vous vraiment supprimer cet utilisateur ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
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
        @click="users"
      >
        Reset
      </v-btn>
    </template>
    </v-data-table>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'Users',
  components: {
    //
  },
  data () {
    return {
      users: [],
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
        { text: 'VISIBLE', value: 'has_access' },
        { text: 'ROLE', value: 'role' },
        { text: 'ACTIONS', value: 'actions', sortable: false }
      ],
      dialogEdit: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        fistname: '',
        lastname: '',
        email: '',
        password: '',
        has_access: 1,
        role: ''
      },
      defaultItem: {
        fistname: '',
        lastname: '',
        email: '',
        password: '',
        has_access: 1,
        role: ''
      }
    }
  },
  mounted () {
    this.users = this.getUsers
  },
  computed: {
    ...mapGetters(['getUsers', 'getToken', 'getUrlBase']),
    formTitle () {
      return this.editedIndex === -1 ? 'Nouvel utilisateur' : 'Modifier l\'utilisateur'
    }
  },
  watch: {
    dialogEdit (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    getUsers (val) {
      this.users = val
    }
  },
  methods: {
    ...mapActions(['setUsers']),
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    deleteItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      const url = `${this.getUrlBase}users/delete/${this.editedItem.id}`
      console.log('headers', this.headersAxios)
      axios({
        method: 'DELETE',
        url: url,
        headers: { Authorization: 'Bearer ' + this.getToken, 'Content-Type': 'application/json' }
      })
        .then(response => {
          if (response.status === 200) {
            axios.get(this.getUrlBase + 'users')
              .then(res => this.setUsers(res.data.users))
          }
        })
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
      let url = ''
      let method = ''
      if (this.editedIndex > -1) {
        url = `${this.getUrlBase}users/update/${this.editedItem.id}`
        method = 'patch'
      } else {
        url = this.getUrlBase + 'users/create'
        method = 'post'
      }
      if (this.editedItem) {
        axios({
          method: method,
          url: url,
          headers: { Authorization: 'Bearer ' + this.getToken, 'Content-Type': 'application/json' },
          data: this.editedItem
        })
          .then(response => {
            if (response.status === 200) {
              axios.get(this.getUrlBase + 'users')
                .then(res => this.setUsers(res.data.users))
            }
          })
      }
      this.close()
    }
  }
}
</script>
<style scoped>
@media screen and (max-width: 520px) {
  .v-data-table {
    max-width: 300px;
    margin: 0 auto;
  }
  .btn-add-user {
    height: 46px;
    width: 46px;
    margin-right: -10px;
  }
  .v-dialog__content {
    height: 100%;
    left: 50%;
    pointer-events: none;
    position: fixed;
    top: 50%;
    transition: .2s cubic-bezier(.25,.8,.25,1),z-index 1ms;
    width: 100%;
    outline: none;
    transform: translate(-50%, -50%);
  }
}
</style>
