import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './../firebase'

Vue.use(Vuex)
Vue.use(firebase)

export const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {
// -------------------------------------------
// Firebase state
// -------------------------------------------
    // firebase의 모든 데이터
    firebase_data: {},
// -------------------------------------------
// Home state
// -------------------------------------------
  // 비주얼 영역 state
    screen_size: ''
  },
  getters: {
// -------------------------------------------
// Firebase
// -------------------------------------------
    firebaseAlldata (state) {
      return state.firebase_data
    },
// -------------------------------------------
// Home
// -------------------------------------------
    // 비주얼
    getScreenSize (state) {
      return state.screen_size
    },
    isDesktopScreen (state) {
      return state.screen_size === 'desktop'
    }
  },
  actions: {
// -------------------------------------------
// Home
// -------------------------------------------
    // 비주얼
    setScreenSize (context, payload) {
      let screenSize = ''
      if (payload < 768) {
        screenSize = 'mobile'
      } else if (payload >= 768 && payload < 1200) {
        screenSize = 'tablet'
      } else {
        screenSize = 'desktop'
      }
      context.commit('setScreenSize', screenSize)
    }
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
// Home
// -------------------------------------------
    // 비주얼
    setScreenSize (state, payload) {
      state.screen_size = payload
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
