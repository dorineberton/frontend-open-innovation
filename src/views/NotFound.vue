<template>
  <div>
    <h2 style="margin: 20px 0">Désolé, la page que vous cherchez est introuvable !</h2>
    <router-link to="/login" @click="logout">Me connecter</router-link>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'NotFound',
  methods: {
    ...mapActions(['setToken']),
    logout () {
      this.setToken(null)
    }
  }
}
</script>
