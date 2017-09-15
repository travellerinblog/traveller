import firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyCYfuIUcb_3I8LkvfK-mA-0SnltpwkaqOc',
  authDomain: 'traveller-in-blog.firebaseapp.com',
  databaseURL: 'https://traveller-in-blog.firebaseio.com',
  projectId: 'traveller-in-blog',
  storageBucket: 'traveller-in-blog.appspot.com',
  messagingSenderId: '514437709393'
}

firebase.initializeApp(config)
let googleAuthProvider = new firebase.auth.GoogleAuthProvider()
let facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
export default {
  database: firebase.database(),
  storage: firebase.storage(),
  auth: firebase.auth,
  googleProvider: googleAuthProvider,
  facebookProvider: facebookAuthProvider
}
