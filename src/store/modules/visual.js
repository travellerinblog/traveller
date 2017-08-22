export default {
  state: {
    // screen_size는 mobile/tablet/desktop , screen_width는 창크기(숫자)
    screen_size: '',
    screen_width: '',
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
    // mobile/tablet/desktop 값을 반환
    // class에 동적으로 연결, 스타일 지정에 사용.
    getScreenSize (state) {
      return state.screen_size
    },
    getScreenWidth (state) {
      return state.screen_width
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
  mutations: {
    setScreenSize (state, payload) {
      state.screen_size = payload.screenSize
      state.screen_width = payload.screenWidth
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
    }
  },
  actions: {
    // 윈도우 사이즈에 따른 기기명을 actions에 전달
    setScreenSize (context, screenWidth) {
      let screenSize = ''
      if (screenWidth < 768) {
        screenSize = 'mobile'
      } else if (screenWidth >= 768 && screenWidth < 1200) {
        screenSize = 'tablet'
      } else {
        screenSize = 'desktop'
      }
      context.commit('setScreenSize', {screenSize, screenWidth})
    }
  }
}
