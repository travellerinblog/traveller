// Vue와 vuex 및 테스트할 컴포넌트 가져오기
import Vue from 'vue'
import Vuex from 'vuex'
import VisualComponent from '../../src/components/Home/Visual.vue'


Vue.use(Vuex)


//테스트를 위한 가상 store 
const mockedStore ={
  state: { 
    screen_size: ''
  },
  getters: { 
    getScreenSize (state) {
      return state.screen_size
    },
    isDesktopScreen (state) {
      return state.screen_size === 'desktop'
    },
    isTabletScreen (state) {
      return state.screen_size === 'tablet'
    }
  },
  actions: {
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
    setScreenSize (state, payload) {
      state.screen_size = payload
    }
  }
}


describe('Visual Component', () => {
  // 테스트를 위해 Vue 인스턴스를 생성하고, 마운트한다. 마운트할 때 store 객체를 만들어준다. 
  const Ctor = Vue.extend(VisualComponent)
  const vm = new Ctor({store: new Vuex.Store(mockedStore)}).$mount()
  
  it('윈도우 사이즈가 1300이면 screen_size는 desktop이다', () => {
    vm.$store.dispatch('setScreenSize', 1300)
    expect(vm.$store.state.screen_size).toBe('desktop')
  }), 
  it('윈도우 사이즈가 750이면 screen_size는 mobile이다', () => {
    vm.$store.dispatch('setScreenSize', 750)
    expect(vm.$store.state.screen_size).toBe('mobile')
  }), 
  it('윈도우 사이즈가 790이면 screen_size는 tablet이다', () => {
    vm.$store.dispatch('setScreenSize', 790)
    expect(vm.$store.state.screen_size).toBe('tablet')
  }), 
  it('screen_size가 desktop이면, isDesktopScreen는 true이다', () =>{
    vm.$store.state.screen_size = 'desktop'
    expect(vm.$store.getters.isDesktopScreen).toBe(true)
  })
})

//테스트 케이스
// 1. 윈도우 사이즈가 750일 때 screen_size는 'moblie', 
// 2. 윈도우 사이즈가 790일 때 screen_size는 'tablet', 
// 3. 윈도우 사이즈가 1300일 때 screen_size는 'desktop', 
// 4. screen_size가 desktop일 때 isDesktopScreen은 true

// Home - Visual 기능들
// 1. 모바일
// 1-1) 자동으로 이미지 변경
//  -. image active class 변경
//  -. tab active class 변경
//  -. aria-hidden 변경
//  -. aria-selected 변경
// 1-2) 탭을 눌렀을 때 이미지 변경
//  -. 1-1 동일 
//  -. 탭 눌렀을때 자동 변경 기능 정지
// 1-3) 드래그 동작으로 이미지 변경
//  -. 1-1 동일
//  -. 드래그 했을 때 자동 변경 기능 정지
// 2. 태블릿
// 2-1) 자동으로 이미지 변경
// 2-2) 탭을 눌렀을 때 이미지 변경
// 2-3) 드래그 동작으로 이미지 변경
//    => 모바일과 동일
// 2-4) prev/next 버튼을 눌러 사진 이미지 변경
// 3. 데스크탑
// 3-1) 비디오 재생
// 4. 윈도우 사이즈에 맞춰서 이미지 크기 변경 
