<template>
    <v-row>
      <v-col cols="12" lg="6" class="mx-auto" justify="center">
        <h1 style="margin-bottom: 10px">Se connecter</h1>
        <div style="display: flex; justify-content: space-evenly">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="mx-auto"
            style="width: 300px"
            @submit.prevent="validate"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="Mot de passe"
              required
            ></v-text-field>
            <br />
            <div style="display:flex; justify-content: space-around">
              <v-btn
                :disabled="!valid"
                color="#1976D2"
                class="mr-4"
                style="color:white"
                @click="validate"
              >
                Valider
              </v-btn>

              <v-btn
                color="#00897B"
                class="mr-4"
                style="color:white"
                @click="reset"
              >
                Supprimer
              </v-btn>
            </div>
          </v-form>
          <div v-if="$vuetify.breakpoint.mdAndUp" id="qrcode" align="center">
            <qr-code
              class="qr-code"
              text=text
              size="300"
              color="#000"
              bg-color="#fff"
              error-level="L">
            </qr-code>
            <div style="margin: 12px 0">
              <p>Se connecter via QR Code</p>
              <p>Scanner le QR Code avec l'app mobile</p>

            </div>
          </div>
        </div>
    </v-col>
    <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="12" md="6" style="margin: 0 auto">
      <v-img alt="image de sécurité" src="../assets/camera.jpg" />
    </v-col>
    <v-alert
      type="error"
      v-model="alert"
      color="#FF7043"
      style="position: fixed; top: 70px; left: 10px"
  >
    {{ message }}
  </v-alert>
    </v-row>
</template>

<script>
// import WebSocket from 'isomorphic-ws'
// import WS from '../ws-browser.js'
import { io } from 'socket.io-client'
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import QrCode from 'vue-qrcode-component'
export default {
  name: 'Register',
  components: {
    QrCode
  },
  data () {
    return {
      text: '',
      message: '',
      valid: false,
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'L\'email est obligatoire.',
        v => /.+@.+\..+/.test(v) || 'L\'email doit être valide'
      ],
      passwordRules: [
        v => !!v || 'Le mot de passe est obligatoire.',
        v => (v && v.length >= 6) || 'Le mot de passe doit faire plus de 6 caractères.'
      ],
      alert: false
    }
  },

  mounted () {
    // const socket = io.connect(this.getUrlWS)

    const socket = io(this.getUrlWS, {
      withCredentials: true
    })
    socket.emit('open', 'connection ok')
    socket.on('connect', () => {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.setQrCode(socket.id)
        console.log('socket id', socket.id)
      }
    })
    // receive a message from the server
    socket.on('message', event => {
      console.log('je  recois un message du serveur', event.data)
    })
    socket.on('session', session => {
      console.log('session recue', session.user, session.token)
    })
    this.setConnection(socket)
  },

  computed: {
    ...mapGetters(['getUser', 'getUrlBase', 'getUrlWS'])
  },

  methods: {
    ...mapActions(['setMenuEnabled', 'setUser', 'setToken', 'setAuthenticated', 'setConnection', 'setQrCode']),
    validate () {
      this.$refs.form.validate()
      const user = {
        email: this.email,
        password: this.password
      }
      console.log('user', user, this.getUrlBase + 'login')
      axios
        .post(this.getUrlBase + 'login', user)
        .then(response => {
          const res = response.data
          console.log('res', res)
          if (res.message !== '' && !res.user) {
            this.message = res.message
            this.alert = true
          } else {
            console.log('test', res.token)
            this.setUser(res.user)
            this.setToken(res.token)
            this.setAuthenticated(true)
            this.$router.push({ path: `/user/${this.getUser.id}/` })
            this.setMenuEnabled(true)
          }
        })

      this.email && this.password ? this.$refs.form.reset() : this.alert = true
      setTimeout(() => { this.alert = false }, 5000)
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>
