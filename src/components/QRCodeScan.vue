<template>
  <div>
    <h2>scanner</h2>
      <qrcode-stream
        class="qr-code"
        :key="_uid"
        :track="selected.value"
        @detect="onDetect"
        @decode="onDecode"
        @init="onInit"
      >
        <div v-if="validationSuccess" class="validation-success">
          This is a URL
        </div>

        <div v-if="validationFailure" class="validation-failure">
          This is NOT a URL!
        </div>

        <div v-if="validationPending" class="validation-pending">
          Long validation in progress...
        </div>
      </qrcode-stream>
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
  /*
  mounted () {
    const connection = new WebSocket('ws://back-securiface.herokuapp.com:5001/')
    connection.onmessage = (event) => {
      console.log('je  recois un message du serveur', event.data)
    }
    connection.onerror = error => {
      console.log(`WebSocket error: ${error}`)
    }
    connection.onopen = (event) => {
      console.log('connexion ouverte', event)
    }
    this.connection = connection
  },
  */
  watch: {
    result: function (val) {
      const conn = this.getConnection
      console.log('resultat a changé', val)
      this.result = val
      console.log('recup socket id avant envoi au back', this.getQrCode)
      conn.send({ message: this.getToken, qrcode: this.getQrCode })
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

    async onDetect (promise) {
      try {
        const {
          content, // decoded String
          location // QR code coordinates
        } = await promise

        console.log('content', content, 'location', location)
      } catch (error) {
        console.log('error on detect', error)
      }
    },

    onDecode (content) {
      this.result = content
      console.log('je suis dans ondecode')
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
