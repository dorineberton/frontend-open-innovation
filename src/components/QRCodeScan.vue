<template>
  <div>
    <h2>scanner</h2>
      <qrcode-stream :key="_uid" :track="selected.value" @decode="onDecode" @init="onInit">
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
      result: null,
      connection: null
    }
  },
  mounted: function () {
    const connection = new WebSocket('ws://back-securiface.herokuapp.com:5001/')
    // const connection = new WebSocket('ws://127.0.0.1:5001/')
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
  watch: {
    result: function (val) {
      console.log('resultat a changé', this.getToken)
      this.result = val
      console.log('etat connexion', this.connection.readyState)
      this.connection.send(this.getToken)
      // if (this.readyState && (this.result !== '' && this.result !== undefined)) this.connection.send(this.getToken)
    }
  },
  computed: {
    ...mapGetters(['getToken']),
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
      // this.turnCameraOff()
      console.log('je suis dans ondecode')
      // pretend it's taking really long
      // await this.timeout(3000)
      return new Promise(resolve => {
        if (content.startsWith('http')) {
          // this.turnCameraOn()
          this.isValid = true
          console.log('je vais envoyer le lien sur lordi', this.result)
        }
      })
      // this.isValid = content.startsWith('http')
      // console.log('isvalid', this.isValid, content)
      // some more delay, so users have time to read the message
      // await this.timeout(2000)

      // this.turnCameraOn()
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
    /*
    timeout (ms) {
      console.log('je suis dans timeout')
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }
    */
  }
}
</script>
