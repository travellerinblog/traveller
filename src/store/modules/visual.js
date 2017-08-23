import axios from 'axios'
export default {
  state: {
    // screen_size는 mobile/tablet/desktop , screen_width는 창크기(숫자)
    screen_size: '',
    screen_width: '',
    // carousel items
    carousel_items: [],
    active_index: 0,
    visible: false,
    slide: ''
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
    },
    slide (state) {
      return state.slide
    }
  },
  mutations: {
    setScreenSize (state, payload) {
      state.screen_size = payload.screenSize
      state.screen_width = payload.screenWidth
    },
    prevItem (state) {
      state.active_index === 0 ? state.active_index = 3 : state.active_index--
      state.slide = 'slideright'
    },
    nextItem (state) {
      state.active_index === 3 ? state.active_index = 0 : state.active_index++
      state.slide = 'slideleft'
    },
    gotoItem (state, payload) {
      if (state.active_index === 0 && payload === 3) {
        state.slide = 'slideright'
      } else if (state.active_index === 3 && payload === 0) {
        state.slide = 'slideleft'
      } else {
        state.active_index < payload ? state.slide = 'slideleft' : state.slide = 'slideright'
      }
      state.active_index = payload
    },
    isVisible (state, payload) {
      state.visible = payload === state.active_index
    },
    setCarouselItem (state, payload) {
      state.carousel_items = []
      for (var prop in payload) {
        if (payload.hasOwnProperty(prop) && payload[prop].star === 5) {
          var item = payload[prop]
          item.key = prop
          state.carousel_items.push(item)
          if (state.carousel_items.length === 4) {
            break
          }
        }
      }
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
    },
    setCarouselItem (context) {
      let api = 'https://traveller-in-blog.firebaseio.com/lists.json'
      axios.get(api).then(response => {
        context.commit('setCarouselItem', response.data)
      }).catch(error => console.log(error.message))
    }
  }
}
