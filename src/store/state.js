export default () => {
  return {
    menuEnabled: false,
    user: {},
    token: null,
    authenticated: false,
    users: [],
    // urlBase: 'https://back-securiface.herokuapp.com/',
    urlWS: 'localhost:5001',
    urlBase: 'localhost:5000/',
    connection: ''
  }
}
