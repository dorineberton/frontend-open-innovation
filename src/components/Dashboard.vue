<template>
  <div>
    <div v-if="$vuetify.breakpoint.mdAndUp">
      <h1>Tableau de bord</h1>
    </div>
    <div v-else>
      <h2>Tableau de bord</h2>
    </div>

    <router-view />
  </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  data () {
    return {
      message: null
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    ...mapActions(['setUsers']),
    getUsers () {
      axios
        .get('http://localhost:5000/users')
        .then(response => {
          this.setUsers(response.data.users)
        })
    }
  }
}
</script>
