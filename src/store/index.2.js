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
    // class에 사용할 기기명
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
    // mobile/tablet/desktop 값을 반환
    // class에 동적으로 연결, 스타일 지정에 사용.
    getScreenSize (state) {
      return state.screen_size
    },
    // 스크린 사이즈가에 따라서 true/false 반환
    // v-if에 값을 넣어 video/image 중 무엇이 보일지 정해준다.
    isDesktopScreen (state) {
      return state.screen_size === 'desktop'
    },
    // 태블릿 사이즈일 때 버튼이 보이게 연결.
    isTabletScreen (state) {
      return state.screen_size === 'tablet'
    }
  },
  actions: {
// -------------------------------------------
// Home
// -------------------------------------------
    // 비주얼
    // 윈도우 사이즈에 따른 기기명을 actions에 전달
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
    // 윈도우 사이즈에 따른 기기명을 state에 넣는다.
    setScreenSize (state, payload) {
      state.screen_size = payload
    },
    findImagesAndTabs (state, payload) {
      state.slide_images = payload.slideImages
      state.tabs = payload.tabs
      state.active_image = payload.active_image
      state.active_tab = payload.active_tab
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
