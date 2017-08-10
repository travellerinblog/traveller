
import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyCYfuIUcb_3I8LkvfK-mA-0SnltpwkaqOc',
  authDomain: 'traveller-in-blog.firebaseapp.com',
  databaseURL: 'https://traveller-in-blog.firebaseio.com',
  projectId: 'traveller-in-blog',
  storageBucket: 'traveller-in-blog.appspot.com',
  messagingSenderId: '514437709393'
}

firebase.initializeApp(config)
var authProvider = new firebase.auth.GoogleAuthProvider()

export default {
  database: firebase.database(),
  auth: firebase.auth,
  provider: authProvider
}
