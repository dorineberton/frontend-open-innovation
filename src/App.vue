<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
    >
      <div class="d-flex align-center">
        <img
          alt="Logo securiface"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <div class="text-h4 black--text">Securiface</div>

    </v-app-bar>

    <v-main>
      <register/>
    </v-main>
  </v-app>
</template>

<script>
import Register from './components/Register'

export default {
  name: 'App',

  components: {
    Register
  },

  data () {
    return {
      //
    }
  }
}
</script>
