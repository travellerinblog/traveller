import axios from 'axios'
export default {
  state: {
    // 필터하지 않은 모든 blog 글 목록
    all_blog_list: [],
    // 어떤 것을 기준으로 필터되었는지 (all, country, city 등)
    filter_by: 'all',
    // 나라 이름으로 필터된 item들
    filtered_country_list: [],
    // 글 상세 내용으로 보일 list item
    blog_view_item: null,
    blog_view_item_contents: []
  },
  getters: {
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
    getBlogViewItemContents (state) {
      return state.blog_view_item_contents
    }
  },
  mutations: {
    filterCountryList (state, payload) {
      // countrylist.vue로 부터 나라 이름을 전달 받아, 같은 나라의 글 목록만 필터링하는 메소드
      // 배열을 비워주지 않으면, 그전에 넣어두었던 데이터까지 보여지게 된다.
      var lists = JSON.parse(localStorage.getItem('lists'))
      var item = {}
      state.filtered_country_list = []
      for (var prop in lists) {
        if (payload === lists[prop].country) {
          // payload값과 lists의 나라 이름이 같으면 state의 배열에 추가해준다.
          item = lists[prop]
          item.key = prop
          item.write_date = lists[prop].write_date.substring(0, 10).split('-').join('.')
          state.filtered_country_list.push(item)
        }
      }
      // getter에서 어떤 목록을 보낼 것 인지 판단 할 수 있게, 필터링한 종류를 입력한다.
      state.filter_by = 'country'
    },
    setAllBlogList (state) {
      // 모든 blog 글 목록을 구하는 메소드
      var lists = JSON.parse(localStorage.getItem('lists'))
      var item = {}
      state.all_blog_list = []
      for (var prop in lists) {
        item = lists[prop]
        item.key = prop
        item.write_date = lists[prop].write_date.substring(0, 10).split('-').join('.')
        state.all_blog_list.push(item)
      }
      state.filter_by = 'all'
    },
    gotoBlogView (state, key) {
      // 블로그 글 내용으로 가는 메소드.
      // 전체 글 목록에서 Recommendation.vue에서 전달받은 key값과 같은 key를 갖는 list를 state에 넣어준다.
      var lists = JSON.parse(localStorage.getItem('lists'))
      for (var prop in lists) {
        if (lists.hasOwnProperty(prop)) {
          if (prop === key) {
            state.blog_view_item = lists[prop]
          }
        }
      }
    }
    // gotoBlogViewContent (state, key) {
    //   // 블로그 이미지와 텍스트를 가져오는 곳
    //   var lists = JSON.parse(localStorage.getItem('lists'))
    //   for (var prop in lists) {
    //     if (lists.hasOwnProperty(prop)) {
    //       if (prop === key) {
    //         state.blog_view_item = lists[prop]
    //       }
    //     }
    //   }
    //   // console.log(state.blog_view_item.contents)
    // }
  },
  actions: {
    setListsData (context, payload) {
      let api = 'https://traveller-in-blog.firebaseio.com/lists.json'
      axios.get(api).then((response) => {
        window.localStorage.setItem('lists', JSON.stringify(response.data))
        if (payload === 'all') {
          context.commit('setAllBlogList')
        } else {
          var lists = JSON.parse(localStorage.getItem('lists'))
          for (var prop in lists) {
            if (lists[prop].country === payload) {
              context.commit('filterCountryList', payload)
            }
          }
        }
      }).catch(error => console.log(error.message))
    }
  }
}
