<template>
  <div id="app" class="overflow-hidden">
  <v-app-bar
    elevation="4"
    color="#fff"
  >
      <img alt="Vue logo" src="./assets/logo.png" width="40">
      <router-link to="/" class="text-h2" style="text-decoration:none">
        <v-toolbar-title>Securiface</v-toolbar-title>
      </router-link>
      <v-spacer />
      <v-app-bar-nav-icon
        @click="handleClickMenu"
      ></v-app-bar-nav-icon>
  </v-app-bar>
  <v-main>
    <v-container>
        <router-view/>
    </v-container>
  </v-main>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['isMenuEnabled'])
  },

  mounted () {
    console.log('enabled', this.isMenuEnabled)
  },

  methods: {
    handleClickMenu () {
      console.log('click')
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.container {
  max-width: 100vw !important;
}
</style>
