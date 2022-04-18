<template>
  <div>
    <h1>Tableau de bord</h1>
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
