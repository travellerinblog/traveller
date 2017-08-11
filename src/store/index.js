import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './../firebase'

Vue.use(Vuex)
Vue.use(firebase)

export const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    // firebase의 모든 데이터
    firebase_data: {}
  },
  getters: {
    firebaseAlldata (state) {
      return state.firebase_data
    }
  },
  actions: {
  },
  mutations: {

// -------------------------------------------
// Firebase
// -------------------------------------------
    // firebase에 등록되어 있는 모든 데이터들 가지고 와서 State의 값을 변경한다.
    getDatabase (state) {
      firebase.database.ref('/').on('value', snapshot => {
        state.firebase_data = snapshot.val()
      })
    },

// -------------------------------------------
// Home component
// -------------------------------------------
// Header 영역
// Footer 영역
// 나 여기 왔다 갔다 영역
// -------------------------------------------
// 어디로 갈래 영역
// 우리가 강추한다 영역
// 비주얼 영역
// -------------------------------------------
    // List 컴포넌트
// -------------------------------------------
// -------------------------------------------
    // MemberLeave 컴포넌트
// -------------------------------------------
// -------------------------------------------
    // MyPage 컴포넌트
// -------------------------------------------
// -------------------------------------------
    // Sign In  컴포넌트
// -------------------------------------------
// -------------------------------------------
// Sign up  컴포넌트
// -------------------------------------------
    // google 계정으로 가입,
    // 아래 코드는 google 계정 연결까지만,
    // 모바일인 경우 Popup 말고
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
  }
})
