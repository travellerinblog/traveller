import firebase from './../../firebase'
export default {
  state: {
    show_sign_container: false,
    show_sign_in: false,
    show_sign_up: false
  },
  getters: {
    showSignContainer (state) {
      return state.show_sign_container
    },
    showSignIn (state) {
      return state.show_sign_in
    },
    showSignUp (state) {
      return state.show_sign_up
    }
  },
  mutations: {
    showSignModal (state) {
      state.show_sign_container = !state.show_sign_container
    },
    signViewChange (state, payload) {
      switch (payload) {
        case 'in':
          state.show_sign_in = true
          state.show_sign_up = false
          break
        case 'up':
          state.show_sign_up = true
          state.show_sign_in = false
          break
      }
    },
    signUpByGoogle (e) {
      e.preventdefault
      var token, user
      var googleProvider = firebase.googleProvider
      firebase.auth().signInWithPopup(googleProvider).then(function (result) {
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
  },
  actions: {}
}
