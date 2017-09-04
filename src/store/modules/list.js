export default {
  state: {
    // 필터하지 않은 모든 blog 글 목록
    all_blog_list: [],
    // 어떤 것을 기준으로 필터되었는지 (all, country, city 등)
    filter_by: 'all',
    // 나라 이름으로 필터된 item들
    filtered_country_list: [],
    // 도시 이름으로 필터된 item들
    filtered_city_list: [],
    // 글 상세 내용으로 보일 list item
    blog_view_item: null,
    // 나라와 도시 정보가 들어간 배열
    country_and_city_name: [],
    city_name_group: [],
    // 지금 보고 있는 페이지
    active_page: 1,
    // 보여질 리스트의 개수(화면 크기에 따라 달라진다)
    show_amount: 12,
    // 페이지 수
    page_amount: 10,
    // 선택된 필터의 종류
    selected_filter: null,
    selected_country_filter: null,
    selected_country_key: null,
    // 필터 토글
    show_filter: false,
    show_country: false,
    show_city: false,
    // 블로그 상세페이지 이미지 / 텍스트 리스트
    blog_view_item_contents: [],
    // 블로그 상세페이지 리플
    blog_view_item_reply: [],
    // 블로그 상세페이지 태그
    blog_view_item_tag: [],
    blog_view_all_data: {}
  },
  getters: {
    // list에 뿌려줄 item들
    // state의 fiter_by값에 따라서 화면에 보여줄 내용이 달라진다.
    // 필터링하는 메소드에서 fitery_by에 값을 넣어주어야 함.
    getFilteredList (state) {
      switch (state.filter_by) {
        case 'country':
          return state.filtered_country_list
        case 'city':
          return state.filtered_city_list
        case 'all':
          return state.all_blog_list
        case 'default':
          return state.all_blog_list
      }
    },
    // 블로그 내용에 해당하는 item
    getBlogViewItem (state) {
      return state.blog_view_item
    },
    // 나라와 도시 이름을 오름차순으로 정렬한다.
    getCountryAndCityName (state) {
      return state.country_and_city_name
    },
    // 화면 표시해줄 첫번째 아이템 (v-for에서 사용)
    startShowItem (state) {
      return (state.active_page - 1) * state.show_amount
    },
    // 화면 표시해줄 마지막 아이템 (v-for에서 사용)
    endShowItem (state) {
      return state.active_page * state.show_amount
    },
    // 페이지 넘버링 관련
    pageAmount (state) {
      return state.page_amount
    },
    activePage (state) {
      return state.active_page - 1
    },
    // 선택된 필터를 표시하기 위한 값.
    selectedFilter (state) {
      return state.selected_filter === 'popular' ? '인기순' : '최신순'
    },
    selectedCountryFilter (state) {
      return state.selected_country_filter === null ? '보고싶은 나라를 선택하세요.' : state.selected_country_filter
    },
    selectedCountryKey (state) {
      return state.selected_country_key
    },
    // 필터 토글 관련
    showFilter (state) {
      return state.show_filter
    },
    showCountry (state) {
      return state.show_country
    },
    showCity (state) {
      return state.show_city
    },
    // 블로그 상세페이지 이미지 / 텍스트 리스트
    getBlogViewItemContents (state) {
      return state.blog_view_item_contents
    },
    // 블로그 상세페이지 리플 리스트
    getBlogViewItemReply (state) {
      return state.blog_view_item_reply
    },
    // 태그 리스트
    getBlogViewItemTag (state) {
      return state.blog_view_item_tag
    }
  },
  mutations: {
    makePageNumber (state, payload) {
      // 화면 크기에 따라 표시하는 아이템 수와 페이지 수를 설정.
      let width = document.documentElement.clientWidth
      if (width < 768) {
        state.show_amount = 4
        state.page_amount = Math.ceil(payload / 4)
        if (state.active_page > state.page_amount) {
          state.active_page = state.page_amount
        } else if (state.active_page === 0) {
          state.active_page = 1
        }
      } else if (width >= 768 && width < 1200) {
        state.show_amount = 8
        state.page_amount = Math.ceil(payload / 8)
        if (state.active_page > state.page_amount) {
          state.active_page = state.page_amount
        } else if (state.active_page === 0) {
          state.active_page = 1
        }
      } else {
        state.show_amount = 12
        state.page_amount = Math.ceil(payload / 12)
        if (state.active_page > state.page_amount) {
          state.active_page = state.page_amount
        } else if (state.active_page === 0) {
          state.active_page = 1
        }
      }
    },
    changePageNumber (state, payload) {
      // 페이지 숫자를 눌렀을 때 active_page 변경.
      state.active_page = payload
    },
    changePagePosition (state, payload) {
      // 페이지 버튼을 눌렀을 때 active_page의 변경.
      switch (payload) {
        case 'first':
          state.active_page = 1
          break
        case 'last':
          state.active_page = state.page_amount
          break
        case 'prev':
          state.active_page === 1 ? 1 : state.active_page--
          break
        case 'next':
          state.active_page === state.page_amount ? state.page_amount : state.active_page++
          break
      }
    },
    filterCountryList (state, payload) {
      // countrylist.vue로 부터 나라 이름을 전달 받아, 같은 나라의 글 목록만 필터링하는 메소드
      // 배열을 비워주지 않으면, 그전에 넣어두었던 데이터까지 보여지게 된다.
      var lists = JSON.parse(localStorage.getItem('lists'))
      var countryNameList = JSON.parse(localStorage.getItem('country_and_city'))
      var item = {}
      var countryKr = ''
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
      // 필터를 선택하였을 때, 선택된 도시 이름이 표시 되도록 한다.
      for (var i = countryNameList.length; i--;) {
        if (countryNameList[i].countryKey === payload) {
          countryKr = countryNameList[i].country
        }
      }
      // getter에서 어떤 목록을 보낼 것 인지 판단 할 수 있게, 필터링한 종류를 입력한다.
      state.filter_by = 'country'
      state.selected_country_filter = countryKr
      state.show_city = false
      state.show_country = false
    },
    filterCityList (state, payload) {
      var lists = JSON.parse(localStorage.getItem('lists'))
      var item = {}
      var cityNameList = JSON.parse(localStorage.getItem('city_group'))
      var cityKr = ''
      state.filtered_city_list = []
      for (var prop in lists) {
        for (var i = lists[prop].city.length; i--;) {
          if (payload === lists[prop].city[i]) {
            // payload값과 lists의 나라 이름이 같으면 state의 배열에 추가해준다.
            item = lists[prop]
            item.key = prop
            item.write_date = lists[prop].write_date.substring(0, 10).split('-').join('.')
            state.filtered_city_list.push(item)
          }
        }
      }
      // 필터를 선택하였을 때, 선택된 도시 이름이 표시 되도록 한다.
      for (var j = cityNameList.length; j--;) {
        for (var k = cityNameList[j].length; k--;) {
          if (cityNameList[j][k].key === payload) {
            cityKr = cityNameList[j][k].city
          }
        }
      }
      // getter에서 어떤 목록을 보낼 것 인지 판단 할 수 있게, 필터링한 종류를 입력한다.
      state.filter_by = 'city'
      state.selected_country_filter = cityKr
      state.show_city = false
      state.show_country = false
    },
    setAllBlogList (state, payload) {
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
      payload === 'default' ? state.filter_by = 'default' : state.filter_by = 'all'
      payload === 'default' ? state.selected_country_filter = null : state.selected_country_filter = '나라전체'
      state.show_country = false
    },
    popularListFilter (state) {
      // 현재 어떤 필터가 선택되어 있는지를 확인하여 state의 배열을 정렬한다.
      switch (state.filter_by) {
        case 'country':
          state.filtered_country_list.sort((a, b) => {
            if (a.view < b.view) {
              return 1
            }
            if (a.view > b.view) {
              return -1
            }
            return 0
          })
          break
        case 'city':
          state.filtered_city_list.sort((a, b) => {
            if (a.view < b.view) {
              return 1
            }
            if (a.view > b.view) {
              return -1
            }
            return 0
          })
          break
        case 'all':
          state.all_blog_list.sort((a, b) => {
            if (a.view < b.view) {
              return 1
            }
            if (a.view > b.view) {
              return -1
            }
            return 0
          })
          break
      }
      state.selected_filter = 'popular'
      state.show_filter = false
    },
    newListFilter (state) {
      // 현재 어떤 필터가 선택되어 있는지를 확인하여 state의 배열을 정렬한다.
      switch (state.filter_by) {
        case 'country':
          state.filtered_country_list.sort((a, b) => {
            if (Number(a.write_date.split('.').join('')) < Number(b.write_date.split('.').join(''))) {
              return 1
            }
            if (Number(a.write_date.split('.').join('')) > Number(b.write_date.split('.').join(''))) {
              return -1
            }
            return 0
          })
          break
        case 'city':
          state.filtered_city_list.sort((a, b) => {
            if (Number(a.write_date.split('.').join('')) < Number(b.write_date.split('.').join(''))) {
              return 1
            }
            if (Number(a.write_date.split('.').join('')) > Number(b.write_date.split('.').join(''))) {
              return -1
            }
            return 0
          })
          break
        case 'all':
          state.all_blog_list.sort((a, b) => {
            if (Number(a.write_date.split('.').join('')) < Number(b.write_date.split('.').join(''))) {
              return 1
            }
            if (Number(a.write_date.split('.').join('')) > Number(b.write_date.split('.').join(''))) {
              return -1
            }
            return 0
          })
          break
      }
      state.selected_filter = 'new'
      state.show_filter = false
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
    },
    // 필터 클릭했을 때 토글. 어떤 필터를 눌렀는지 값을 받아서, 필터에 따라서 state 값을 변경한다.
    toggleFilter (state, payload) {
      switch (payload) {
        case 'filter':
          state.show_filter = !state.show_filter
          break
        case 'country':
          state.show_country = !state.show_country
          if (state.show_country === false) {
            // country 필터가 fasle가 되면 city도 flase가 되어야 다시 열었을 때 첫 화면에 도시 이름들이 보이지 않는다.
            state.show_city = false
          }
          break
        default :
          if (payload === state.selected_country_key) {
            // 같은 나라 이름을 눌렀을 때 토글.
            state.show_city = !state.show_city
          } else {
            // 열려있는 나라와 다른 나라를 눌렀을 때는 값을 반전시키면
            // 클릭한 나라의 값이 열리지않고 보이고 있던 나라가 닫혀버리기만 하기 때문에 true값을 준다.
            state.show_city = true
            // 현재 보이고 있는 나라의 값을 변경해준다.
            state.selected_country_key = payload
          }
          break
      }
    },
    setCountryAndCityData (state) {
      // 로컬에 저장된 나라이름 도시 이름을 state에 추가
      state.country_and_city_name = JSON.parse(localStorage.getItem('country_and_city'))
      state.city_name_group = JSON.parse(localStorage.getItem('city_group'))
    },
    gotoBlogViewContent (state, key) {
      // 블로그 이미지와 텍스트를 가져오는 곳
      var lists = JSON.parse(localStorage.getItem('lists'))
      for (var prop in lists) {
        if (lists.hasOwnProperty(prop)) {
          if (prop === key) {
            state.blog_view_item_contents = lists[prop].contents
          }
        }
      }
    },
    gotoBlogViewReply (state, key) {
      // 블로그 이미지와 텍스트를 가져오는 곳
      var lists = state.blog_view_all_data
      for (var prop in lists) {
        if (lists.hasOwnProperty(prop)) {
          if (prop === key) {
            state.blog_view_item_reply = lists[prop].reply
          }
        }
      }
    },
    gotoBlogViewTag (state, key) {
      // 블로그 이미지와 텍스트를 가져오는 곳
      var lists = JSON.parse(localStorage.getItem('lists'))
      for (var prop in lists) {
        if (lists.hasOwnProperty(prop)) {
          if (prop === key) {
            state.blog_view_item_tag = lists[prop].tag
          }
        }
      }
    },
    getReplyFireBase (state, payload) {
      state.blog_view_all_data = payload
    }
  },
  actions: {
    getReplyFireBase ({commit}, payload) {
      commit('getReplyFireBase', payload.data)
    },
    setListsData (context, payload) {
      var lists = JSON.parse(localStorage.getItem('lists'))
      if (payload === 'all') {
        context.commit('setAllBlogList')
      } else if (payload === 'default') {
        context.commit('setAllBlogList', payload)
        context.commit('makePageNumber', lists.length)
      } else {
        for (var prop in lists) {
          if (lists[prop].country === payload) {
            context.commit('filterCountryList', payload)
          } else {
            for (var i = lists[prop].city.length; i--;) {
              if (lists[prop].city[i] === payload) {
                context.commit('filterCityList', payload)
              }
            }
          }
        }
      }
    }
  }
}
