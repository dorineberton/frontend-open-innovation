<template>
  <v-row>
    <v-col cols="12" md="4" class="mx-auto" justify="center" style="display:flex;justify-content: center" >
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
  </v-col>
  <v-col cols="12" md="8" style="margin: 0 auto">
    <v-img alt="image de sécurité" src="../assets/camera.jpg" />
  </v-col>
  <v-alert
    type="error"
    v-model="alert"
    color="#FF7043"
    style="position: fixed; top: 70px; left: 10px"
>
  Une erreur est survenue
</v-alert>
  </v-row>
</template>

<script>
export default {
  name: 'Register',

  data: () => ({
    valid: false,
    password: '',
    email: '',
    emailRules: [
      v => !!v || 'L\'email est obligatoire.',
      v => /.+@.+\..+/.test(v) || 'L\'email doit être valide'
    ],
    passwordRules: [
      v => !!v || 'Le mot de passe est obligatoire.',
      v => (v && v.length >= 8) || 'Le mot de passe doit faire plus de 8 caractères.'
    ],
    alert: false
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
      const user = {
        email: this.email,
        password: this.password
      }
      console.log('user', user)
      this.email && this.password ? this.$refs.form.reset() : this.alert = true
      setTimeout(() => { this.alert = false }, 5000)
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>
