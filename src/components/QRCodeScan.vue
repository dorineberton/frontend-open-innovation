<template>
  <div>
    <h2>scanner</h2>
    <StreamBarcodeReader
      @decode="(a, b, c) => onDecode(a, b, c)"
      @loaded="() => onLoaded()"
    ></StreamBarcodeReader>
    Input Value: {{ text || "Nothing" }}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { StreamBarcodeReader } from "vue-barcode-reader";
export default {
  name: 'QRCodeScan',
  components: {
    StreamBarcodeReader
  },
  data () {
    return {
      text: "",
      id: null,
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
      console.log('recup socket id avant envoi au back', this.getSocketId)
      conn.send({ message: this.getToken, id: this.getSocketId })
    }
  },
  computed: {
    ...mapGetters(['getToken', 'getConnection', 'getSocketId']),
    //
  },
  methods: {
    onDecode(a, b, c) {
      console.log(a, b, c);
      this.text = a;
      if (this.id) clearTimeout(this.id);
      this.id = setTimeout(() => {
        if (this.text === a) {
          this.text = "";
        }
      }, 5000);
    },
    onLoaded() {
      console.log("load");
    },
    },
  }
}
</script>
