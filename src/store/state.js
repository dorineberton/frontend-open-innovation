export default () => {
  return {
    menuEnabled: false,
    user: {},
    token: null,
    authenticated: false,
    users: [],
    urlBase: 'https://back-securiface.herokuapp.com/',
    urlWS: 'https://socket-securiface.herokuapp.com/',
    // urlWS: 'http://localhost:5500/',
    // urlBase: 'http://localhost:5000/',
    connection: ''
  }
}
