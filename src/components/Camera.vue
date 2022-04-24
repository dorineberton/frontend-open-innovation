<template>
  <div v-if="$vuetify.breakpoint.mdAndUp">
      <h2>Caméras</h2>
    </div>
    <div v-else>
      <h3>Caméras</h3>
    </div>
</template>
<script>
export default {
  name: 'Camera'
}
</script>
