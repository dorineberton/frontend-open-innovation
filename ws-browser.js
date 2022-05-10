import WebSocket from 'ws'
var WS = null

if (typeof WebSocket !== 'undefined') {
  WS = WebSocket
} else if (typeof global !== 'undefined') {
  WS = global.WebSocket || global.MozWebSocket
} else if (typeof window !== 'undefined') {
  WS = window.WebSocket || window.MozWebSocket
} else if (typeof self !== 'undefined') {
  WS = self.WebSocket || self.MozWebSocket
}

export default WS
