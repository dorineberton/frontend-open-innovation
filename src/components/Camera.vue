<template>
  <div v-if="$vuetify.breakpoint.mdAndUp">
      <h2>Caméra</h2>
      <video autoplay :width="$vuetify.breakpoint.lgAndUp ? 1000 : 900" style="margin-top: 12px">
        <source
          src="@/assets/video.mp4"
          type="video/mp4"
        >
        <p>Désolé, votre navigateur ne supporte pas ce type de vidéo.</p>
      </video>
  </div>
  <div v-else>
    <h3>Caméra</h3>
    <video autoplay :width="$vuetify.breakpoint.xs ? 300 : 500" style="margin-top: 36px">
      <source
        src="@/assets/video.mp4"
        type="video/mp4"
      >
      <p>Désolé, votre navigateur ne supporte pas ce type de vidéo.</p>
    </video>
  </div>
</template>
<script>
export default {
  name: 'Camera'
}
</script>
