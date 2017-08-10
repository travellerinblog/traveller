import Vue from 'vue'
import firebase from './../../firebase'

Vue.use(firebase)

export default {
  namespaced: true,
  state: {},
  getters: {},
  actions: {},
  mutations: {
    signUpByGoogle (e) {
      e.preventdefault
      var token, user
      var provider = firebase.provider
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        token = result.credential.accessToken
        console.log('token:', token)
        // The signed-in user info.
        user = result.user
        console.log('user:', user)
        // ...
      }).catch(function (error) {
        console.log(error.message)
      })
    }
  }
}
