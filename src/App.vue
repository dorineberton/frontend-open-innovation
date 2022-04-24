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
        v-if="isMenuEnabled"
        @click="handleClickMenu"
      ></v-app-bar-nav-icon>
  </v-app-bar>
  <v-navigation-drawer
      v-model="isNavDrawerenabled"
      absolute
      right
      :width="$vuetify.breakpoint.mdAndUp ? '350' : '200'"
      temporary
      hide-overlay
      style="height: 100vh"
  >
        <v-list-item style="height: 64px">
        <v-spacer />
        <v-btn icon>
          <v-icon @click="isNavDrawerenabled=false">
            mdi-close
          </v-icon>
        </v-btn>
    </v-list-item>

    <v-divider></v-divider>
    <v-list>
      <v-list-item
        class="camera"
        style="margin-left: 10px"
        @click="$router.push({name: 'video'})"
      >
        <v-list-item-icon>
          <v-icon :size="$vuetify.breakpoint.mdAndUp ? '32' : '20'">mdi-video-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title :style="{fontSize: $vuetify.breakpoint.mdAndUp ? '20' : '12'}">Caméras</v-list-item-title>
        </v-list-item-content>
      </v-list-Item>
        <v-list-item
        v-if="this.getUser.role === 'admin'"
        class="people"
        style="margin-left: 10px"
        @click="$router.push({name: 'users'})"
      >
        <v-list-item-icon>
          <v-icon :size="$vuetify.breakpoint.mdAndUp ? '32' : '20'">mdi-account-multiple-plus-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title :style="{fontSize: $vuetify.breakpoint.mdAndUp ? '20' : '12'}">Utilisateurs</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          style="color:#fff; background:purple;"
          block
          @click="deconnection"
        >
          Déconnexion
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
  <v-main>
    <v-container>
        <router-view/>
    </v-container>
  </v-main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      isNavDrawerenabled: false
    }
  },
  computed: {
    ...mapGetters(['isMenuEnabled', 'getUser'])
  },

  mounted () {
    console.log('enabled', this.isMenuEnabled)
  },

  methods: {
    ...mapActions(['setToken', 'setAuthenticated', 'setMenuEnabled']),
    handleClickMenu () {
      console.log('click')
      this.isNavDrawerenabled = !this.isNavDrawerenabled
    },
    deconnection () {
      this.setToken(null)
      this.setAuthenticated(false)
      this.setMenuEnabled(false)
      this.isNavDrawerenabled = false
      this.$router.push({ name: 'login' })
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
.camera i.v-icon.v-icon {
  color: rgb(0, 137, 123);
}
.people i.v-icon.v-icon {
  color: rgb(25, 118, 210);
}
.v-image {
  z-index: -1 !important;
}
</style>
