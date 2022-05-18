<template>
  <div>
    <h2>scanner</h2>
      <qrcode-stream
        class="qr-code"
        :key="_uid"
        :track="selected.value"
        @decode="onDecode"
        @init="onInit"
      />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: 'QRCodeScan',
  components: {
    QrcodeStream
  },
  data () {
    return {
      selected: { text: 'outline', value: this.paintOutline },
      isValid: undefined,
      camera: 'auto',
      result: null
    }
  },
  watch: {
    result: function (val) {
      const conn = this.getConnection
      console.log('resultat a changé', val)
      this.result = val
      console.log('recup socket id avant envoi au back', val)
      conn.send({ message: this.getToken, qrcode: val })
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getConnection', 'getQrCode']),
    validationPending () {
      return this.isValid === undefined && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    }
  },
  methods: {
    paintOutline (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints
        console.log('firstPoint', firstPoint)
        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },

    onDecode (content) {
      this.result = content
      console.log('je suis dans ondecode', content)
      return new Promise(resolve => {
        if (content !== '' || content !== undefined) {
          this.isValid = true
          console.log('je vais envoyer le lien sur lordi', this.result)
        }
      })
    },
    onInit (promise) {
      promise
        .catch(console.error)
        .then(this.resetValidationState)
    },
    turnCameraOn () {
      this.camera = 'auto'
      console.log('je suis dans turncameraon')
    },

    turnCameraOff () {
      this.camera = 'off'
      console.log('je suis dans turncameraoff')
    }
  }
}
</script>
<style scoped>
  .qr-code {
    border: 1px solid #fff;
    padding: 1px;
  }
</style>
