import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './../firebase'

Vue.use(Vuex)
Vue.use(firebase)

export const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state: {

// -------------------------------------------
// 공통
// -------------------------------------------
    all_blog_list: [],
    filter_by: '',
    blog_view_item: null,
// -------------------------------------------
// Firebase state
// -------------------------------------------
    // firebase의 모든 데이터
    firebase_data: null,
// -------------------------------------------
// Home state
// -------------------------------------------
  // 비주얼 영역 state
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
    visible: false,

    // country list state
    country_list_items: [
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fkorea.jpg?alt=media&token=291e1aa7-628c-4cbc-8a39-e7e531efa617', alt: '대한민국', content: '대한민국', country: 'Korea'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fgreece.jpg?alt=media&token=0a597b14-9a23-472c-9ee3-99920aa95da6', alt: '그리스', content: '그리스', country: 'greece'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fchina.jpg?alt=media&token=954c0410-cc65-489e-8263-275dcfc16fb0', alt: '중국', content: '중국', country: 'china'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2FItaly.jpg?alt=media&token=41786354-e223-4d5c-b7bd-c7ede4424379', alt: '이탈리아', content: '이탈리아', country: 'Italy'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fcanada.jpg?alt=media&token=17c94efd-5be8-4efb-899f-a8a334d77630', alt: '캐나다', content: '캐나다', country: 'Canada'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fjapan.jpg?alt=media&token=8d89fc0f-6bc5-4fbc-8a8b-6aa18824724e', alt: '일본', content: '일본', country: 'japan'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2FPhilippines.jpg?alt=media&token=1f07e1e9-25bb-40a0-a1be-60dc0961b6bb', alt: '필리핀', content: '필리핀', country: 'Philippines'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Fuk.jpg?alt=media&token=73a53c15-15fc-4262-ad9f-de231f8f0659', alt: '영국', content: '영국', country: 'uk'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2Ftaiwan.jpg?alt=media&token=b7e289b6-b1b5-418c-a3fa-7074d1c1b019', alt: '대만', content: '대만', country: 'Taiwan'},
      {src: 'https://firebasestorage.googleapis.com/v0/b/traveller-in-blog.appspot.com/o/CountryList%2FUS.jpg?alt=media&token=eda10492-1beb-4a22-a17e-7b7c380c7df6', alt: '미국', content: '미국', country: 'US'}
    ],
      // 나라 이름으로 필터된 item들
    filtered_country_list: [],

    // recommendation state
    recommend_item: {},
    ellipsis_text: ''
  },
  getters: {
// -------------------------------------------
// 공통
// -------------------------------------------
    // list에 뿌려줄 item들
    // state의 fiter_by값에 따라서 화면에 보여줄 내용이 달라진다.
    // 필터링하는 메소드에서 fitery_by에 값을 넣어주어야 함.
    getFilteredList (state) {
      switch (state.filter_by) {
        case 'country':
          return state.filtered_country_list
        case 'all':
          return state.all_blog_list
      }
    },
    // 블로그 내용에 해당하는 item
    getBlogViewItem (state) {
      return state.blog_view_item
    },
// -------------------------------------------
// Firebase
// -------------------------------------------
    firebaseAlldata (state) {
      return state.firebase_data
    },
// -------------------------------------------
// Home
// -------------------------------------------
    // 비주얼 영역 getters
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
    // country list 영역 getters
    getCountryListItems (state) {
      return state.country_list_items
    },
    // 추천 영역의 getters
    getRecommendItem (state) {
      return state.recommend_item
    },
    getConvertedDate (state) {
      var convert = state.recommend_item.write_date
      return convert.substring(0, 10).split('-').join('.')
    },
    getEllipsisText (state) {
      return state.ellipsis_text
    }
  },
  actions: {
// -------------------------------------------
// Home
// -------------------------------------------
    // 비주얼
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
    // 비주얼 뮤테이션
    // 윈도우 사이즈에 따른 기기명을 state에 넣는다.
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
    },
    // country list 뮤테이션
    swipeCountryList (state, payload) {
      // 전달 받은 값에 따라서 이미지 슬라이드가 왼쪽으로 움직일지 오른쪽으로 움직일지 정한다.
      // next라면 배열 리스트의 첫번째 요소가 가장 뒤로가고
      // prev라면 배열 리스트의 마지막 요소가 가장 앞으로 온다.
      switch (payload) {
        case 'next':
          var firstItem = state.country_list_items.shift()
          state.country_list_items.push(firstItem)
          break
        case 'prev':
          var lastItem = state.country_list_items.pop()
          state.country_list_items.unshift(lastItem)
          break
      }
    },
    filterCountryList (state, payload) {
      // countrylist.vue로 부터 나라 이름을 전달 받아, 같은 나라의 글 목록만 필터링하는 메소드
      var lists = state.firebase_data.lists
      // 배열을 비워주지 않으면, 그전에 넣어두었던 데이터까지 보여지게 된다.
      state.filtered_country_list = []
      for (var prop in lists) {
        if (payload === lists[prop].country) {
          // payload값과 lists의 나라 이름이 같으면 state의 배열에 추가해준다.
          state.filtered_country_list.push(lists[prop])
        }
      }
      // getter에서 어떤 목록을 보낼 것 인지 판단 할 수 있게, 필터링한 종류를 입력한다.
      state.filter_by = 'country'
    },
    setAllBlogList (state) {
      // 모든 blog 글 목록을 구하는 메소드
      // state.firebase_data.lists는 Object이기 때문에, 사용하기 편하게 배열에 하나씩 push해 주었다.
      var lists = state.firebase_data.lists
      state.all_blog_list = []
      for (var prop in lists) {
        state.all_blog_list.push(lists[prop])
      }
      state.filter_by = 'all'
    },
    // 추천의 뮤테이션
    setRecommendItem (state) {
      // 미리 받아놓은 firebase_data를 사용하려고 하니 에러가 발생하여, list item 하나만 가져와서 사용.
      firebase.database.ref('/lists/list1').on('value', snapshot => {
        state.recommend_item = snapshot.val()
      })
    },
    gotoBlogView (state, key) {
      // 블로그 글 내용으로 가는 메소드.
      // 전체 글 목록에서 Recommendation.vue에서 전달받은 key값과 같은 key를 갖는 list를 state에 넣어준다.
      var lists = state.firebase_data.lists
      for (var prop in lists) {
        if (prop === key) {
          state.blog_view_item = lists[prop]
        }
      }
    },
    setEllipsisText (state) {
      // 화면 사이즈에 따라서 몇 글자까지 보일지 정해준다.
      let clientWidth = document.documentElement.clientWidth
      let textLength = state.recommend_item.contents[1].length
      let text = state.recommend_item.contents[1]
      if (clientWidth < 767) {
        if (textLength < 120) {
          state.ellipsis_text = text
        } else {
          state.ellipsis_text = text.substring(0, 117) + '...'
        }
      } else if (clientWidth >= 768 && clientWidth < 1200) {
        if (textLength < 250) {
          state.ellipsis_text = text
        } else {
          state.ellipsis_text = text.substring(0, 247) + '...'
        }
      } else {
        if (textLength < 500) {
          state.ellipsis_text = text
        } else {
          state.ellipsis_text = text.substring(0, 497) + '...'
        }
      }
    },
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
