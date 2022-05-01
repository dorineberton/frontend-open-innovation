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
import { mapGetters, mapActions } from 'vuex'

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
  computed: {
    ...mapGetters(['getUrlBase'])
  },
  methods: {
    ...mapActions(['setUsers']),
    getUsers () {
      axios
        .get(this.getUrlBase + 'users')
        .then(response => {
          this.setUsers(response.data.users)
        })
    }
  }
}
</script>
