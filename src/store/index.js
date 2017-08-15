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
    screen_size: '',
    // carousel items
    carousel_items: [
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fcarousel_img%2Fgwanghwamun.jpg?alt=media&token=b31abddb-19c3-4503-b466-4191321f33aa', alt: '대한민국 서울 광화문의 야경', content: '서울'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fcarousel_img%2Fmatterhorn.jpg?alt=media&token=a68b8630-c08c-4315-a014-e0381911e340', alt: '스위스 마테호른산이 보이는 산길', content: '스위스'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fcarousel_img%2Fchiang-mai.jpg?alt=media&token=45d46ccb-3516-4524-be67-bc3c59e3fd43', alt: '태국 치앙마이의 사원', content: '태국'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/visual%2Fcarousel_img%2Fsydney.jpg?alt=media&token=d5a01206-9bd2-4d02-b2c2-79705ef6f8cf', alt: '호주 시드니 오페라 하우스의 야경', content: '호주'}
    ],
    active_index: 0,
    visible: false
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
    },
    getCarouselItems (state) {
      return state.carousel_items
    },
    getAcitveIndex (state) {
      return state.active_index
    },
    itemCount (state) {
      return state.carousel_items.length
    },
    isVisible (state) {
      return state.visible
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
    setItemIndex (state) {
      state.carousel_items.forEach((item, index) => {
        item.index = index
      })
    },
    prevItem (state) {
      state.active_index === 0 ? state.active_index = 3 : state.active_index--
    },
    nextItem (state) {
      state.active_index === 3 ? state.active_index = 0 : state.active_index++
    },
    gotoItem (state, payload) {
      state.active_index = payload
    },
    isVisible (state, payload) {
      state.visible = payload === state.active_index
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
