export default () => {
  return {
    menuEnabled: false,
    user: {},
    token: null,
    authenticated: false,
    users: [],
    // urlBase: 'https://back-securiface.herokuapp.com/',
    // urlWS: 'ws://back-securiface.herokuapp.com:5001/',
    urlBase: 'localhost:8080/',
    connection: ''
  }
}
