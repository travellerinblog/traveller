import axios from 'axios'
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
    // 검색어로 필터된 item들
    filtered_search_list: [],
    // 글 상세 내용으로 보일 list item
    blog_view_item: null,
    // 나라와 도시 정보가 들어간 배열
    country_and_city_name: [],
    city_name_group: [],
    tag_name_group: [],
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
    blog_view_item_replys: [],
    // 블로그 상세페이지 태그
    blog_view_item_tag: [],
    // 조회수 기본 값
    view_count: null,
    // 화면 크기에 따라 표시되는 페이지 넘버의 개수를 다르게 하기 위한 값
    min_page_num: null,
    max_page_num: null,
    // 글쓰기를 눌렀을 때 쿼리로 연결 될 user uid
    user_uid: '',
    // 리스트를 불러오고 있는지 여부를 표시
    list_loading: true
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
        case 'search':
          return state.filtered_search_list
        case 'tag':
          return state.filtered_tag_list
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
    minPageNum (state) {
      return state.min_page_num
    },
    maxPageNum (state) {
      return state.max_page_num
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
      return state.blog_view_item_replys
    },
    // 태그 리스트
    getBlogViewItemTag (state) {
      return state.blog_view_item_tag
    },
    getViewCount (state) {
      return state.view_count
    },
    userUid (state) {
      return state.user_uid
    },
    listLoading (state) {
      return state.list_loading
    }
  },
  mutations: {
    makePageNumber (state, payload) {
      // 화면 크기에 따라 표시하는 아이템 수와 페이지 수를 설정.
      let width = document.documentElement.clientWidth
      state.active_page = 1
      if (width < 768) {
        state.show_amount = 4
        state.page_amount = Math.ceil(payload / 4)
        state.min_page_num = 0
        state.max_page_num = 3
        if (state.active_page > state.page_amount) {
          state.active_page = state.page_amount
        }
      } else if (width >= 768 && width < 1200) {
        state.show_amount = 8
        state.page_amount = Math.ceil(payload / 8)
        state.min_page_num = 0
        state.max_page_num = 5
        if (state.active_page > state.page_amount) {
          state.active_page = state.page_amount
        }
      } else {
        state.show_amount = 12
        state.page_amount = Math.ceil(payload / 12)
        state.min_page_num = 0
        state.max_page_num = 10
        if (state.active_page > state.page_amount) {
          state.active_page = state.page_amount
        }
      }
    },
    changePageNumber (state, payload) {
      // 페이지 숫자를 눌렀을 때 active_page 변경.
      state.active_page = payload
    },
    changePagePosition (state, payload) {
      // 페이지 버튼을 눌렀을 때 active_page의 변경.
      let width = document.documentElement.clientWidth
      switch (payload) {
        case 'first':
          state.active_page = 1
          if (width < 768) {
            state.min_page_num = 0
            state.max_page_num = 3
          } else if (width >= 768 && width < 1200) {
            state.min_page_num = 0
            state.max_page_num = 5
          } else {
            state.min_page_num = 0
            state.max_page_num = 10
          }
          break
        case 'last':
          state.active_page = state.page_amount
          let active = state.active_page
          if (width < 768) {
            if (active % 3 === 0) {
              state.min_page_num = active - 3
              state.max_page_num = active
            } else {
              state.min_page_num = Math.floor((active / 3)) * 3
              state.max_page_num = state.min_page_num + 3
            }
          } else if (width >= 768 && width < 1200) {
            if (active % 5 === 0) {
              state.min_page_num = active - 5
              state.max_page_num = active
            } else {
              state.min_page_num = Math.floor((active / 5)) * 5
              state.max_page_num = state.min_page_num + 5
            }
          } else {
            if (active % 10 === 0) {
              state.min_page_num = active - 10
              state.max_page_num = active
            } else {
              state.min_page_num = Math.floor((active / 10)) * 10
              state.max_page_num = state.min_page_num + 10
            }
          }
          break
        case 'prev':
          if (width < 768) {
            state.active_page--
            if (state.active_page % 3 === 0 && state.active_page !== 1) {
              state.min_page_num -= 3
              state.max_page_num -= 3
            }
          } else if (width >= 768 && width < 1200) {
            state.active_page--
            if (state.active_page % 5 === 0 && state.active_page !== 1) {
              state.min_page_num -= 5
              state.max_page_num -= 5
            }
          } else {
            state.active_page--
            if (state.active_page % 10 === 0 && state.active_page !== 1) {
              state.min_page_num -= 10
              state.max_page_num -= 10
            }
          }
          break
        case 'next':
          if (width < 768) {
            state.active_page++
            if (state.active_page % 3 === 1 && state.active_page < state.page_amount) {
              state.min_page_num += 3
              state.max_page_num += 3
            }
          } else if (width >= 768 && width < 1200) {
            state.active_page++
            if (state.active_page % 5 === 1 && state.active_page < state.page_amount) {
              state.min_page_num += 5
              state.max_page_num += 5
            }
          } else {
            state.active_page++
            if (state.active_page % 10 === 1 && state.active_page < state.page_amount) {
              state.min_page_num += 10
              state.max_page_num += 10
            }
          }
          break
      }
    },
    filterCountryList (state, payload) {
      // countrylist.vue로 부터 나라 이름을 전달 받아, 같은 나라의 글 목록만 필터링하는 메소드
      // 배열을 비워주지 않으면, 그전에 넣어두었던 데이터까지 보여지게 된다.
      var lists = state.all_blog_list
      var countryNameList = state.country_and_city_name
      var item = {}
      var countryKr = ''
      state.filtered_country_list = []
      for (var prop in lists) {
        if (payload === lists[prop].country) {
          // payload값과 lists의 나라 이름이 같으면 state의 배열에 추가해준다.
          item = lists[prop]
          item.key = lists[prop].key
          item.write_date = lists[prop].write_date.substring(0, 8)
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
      var lists = state.all_blog_list
      var item = {}
      var cityNameList = state.city_name_group
      var cityKr = ''
      state.filtered_city_list = []
      for (var prop in lists) {
        for (var i = lists[prop].city.length; i--;) {
          if (payload === lists[prop].city[i]) {
            // payload값과 lists의 나라 이름이 같으면 state의 배열에 추가해준다.
            item = lists[prop]
            item.key = lists[prop].key
            item.write_date = lists[prop].write_date.substring(0, 8)
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
    filterSearchList (state, payload) {
      var lists = state.all_blog_list
      // 이전 결과값을 비워줘야 합니다.
      state.filtered_search_list = []
      state.selected_country_filter = null
      // 검색어 소문자로 변경
      let searchData = payload.search.toLowerCase()
      let keywordAll = []
      let keywordOnce = {}
      if (searchData) {
        for (let prop in lists) {
          // 나라명 1개
          let keywordCountry = lists[prop].country
          // 지역명 배열
          let keywordCity = lists[prop].city
          // 지역명 배열을 문자열
          let keywordCityAll = ''
          for (let i = 0, l = keywordCity.length; i < l; i++) {
            keywordCityAll = keywordCityAll + keywordCity[i]
          }
          // 여행 기간 (공백 및 . 제거)
          let keywordEndDate = lists[prop].end_date
          keywordEndDate = keywordEndDate.replace(/\s/g, '').replace(/\./g, '')
          let keywordStartDate = lists[prop].start_date
          keywordStartDate = keywordStartDate.replace(/\s/g, '').replace(/\./g, '')
          // id
          let keywordId = lists[prop].id
          // name
          let keywordName = lists[prop].name
          // tag 배열
          let keywordTag = lists[prop].tag.join('')
          // reply
          let keywordReply = lists[prop].reply
          let keywordReplyAll = ''
          for (let prop in keywordReply) {
            keywordReplyAll = keywordReplyAll + (keywordReply[prop].date + keywordReply[prop].id + keywordReply[prop].name + keywordReply[prop].reply_text)
          }
          // title
          let keywordTitle = lists[prop].title
          // title_img
          // let keywordTitleImg = lists[prop].title_img
          // write_date
          let keywordWriteDate = lists[prop].write_date
          // contents
          let keywordContents = lists[prop].contents
          let keywordContentsAll = ''
          for (let i = 0, l = keywordContents.length; i < l; i++) {
            if (keywordContents[i].key === 'text') {
              keywordContentsAll = keywordContentsAll + keywordContents[i].value
            }
          }
          // 모든 컨텐츠 합치기
          let keyword = keywordCityAll + keywordCountry + keywordStartDate + keywordEndDate + keywordWriteDate + keywordId + keywordName + keywordTitle + keywordContentsAll + keywordTag + keywordReplyAll
          // 대문자를 소문자로 통일
          keyword = keyword.toLowerCase()
          keywordOnce.key = lists[prop].key
          keywordOnce.value = keyword
          keywordAll.push(keywordOnce)
          keywordOnce = {}
        }
        // 키워드를 모두 한곳에 넣어둔 값중에 같은 리스트를 찾는다
        for (let i in keywordAll) {
          if (keywordAll[i].value.indexOf(searchData) >= 0) {
            for (let prop in lists) {
              if (lists[prop].key === keywordAll[i].key) {
                state.filtered_search_list.push(lists[prop])
              }
            }
          }
        }
        state.filter_by = 'search'
      }
    },
    setAllBlogList (state, payload) {
      // 모든 blog 글 목록을 구하는 메소드 / 새로고침이 되었을때 payload.data가 비워지기 때문에 다시 넣어줌
      var lists = payload.data
      var item = {}
      state.all_blog_list = []
      for (var prop in lists) {
        item = lists[prop]
        item.key = prop
        item.write_date = lists[prop].write_date.substring(0, 8)
        state.all_blog_list.push(item)
      }
      if (payload.id === null) { return }
      payload.id === 'default' ? state.filter_by = 'default' : state.filter_by = 'all'
      payload.id === 'default' ? state.selected_country_filter = null : state.selected_country_filter = '나라전체'
      state.show_country = false
    },
    popularListFilter (state) {
      // 현재 어떤 필터가 선택되어 있는지를 확인하여 state의 배열을 정렬한다.
      switch (state.filter_by) {
        case 'country':
          state.filtered_country_list.sort((a, b) => {
            return b.view - a.view
          })
          break
        case 'city':
          state.filtered_city_list.sort((a, b) => {
            return b.view - a.view
          })
          break
        case 'all':
          state.all_blog_list.sort((a, b) => {
            return b.view - a.view
          })
          break
        case 'search':
          state.filtered_search_list.sort((a, b) => {
            return b.view - a.view
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
            return Number(b.write_date) - Number(a.write_date)
          })
          break
        case 'city':
          state.filtered_city_list.sort((a, b) => {
            return Number(b.write_date) - Number(a.write_date)
          })
          break
        case 'all':
          state.all_blog_list.sort((a, b) => {
            return Number(b.write_date) - Number(a.write_date)
          })
          break
        case 'search':
          state.filtered_search_list.sort((a, b) => {
            return Number(b.write_date) - Number(a.write_date)
          })
          break
      }
      state.selected_filter = 'new'
      state.show_filter = false
    },
    gotoBlogView (state, key) {
      // 블로그 글 내용으로 가는 메소드.
      // 전체 글 목록에서 Recommendation.vue에서 전달받은 key값과 같은 key를 갖는 list를 state에 넣어준다.
      var lists = state.all_blog_list
      for (var prop in lists) {
        if (lists.hasOwnProperty(prop)) {
          if (lists[prop].key === key) {
            state.blog_view_item = lists[prop]
            // 숫자로 되어있는 것을 가져와요
            let replyDate = state.blog_view_item.write_date
            // 년으로 자르기
            let yearDate = replyDate.substr(0, 4)
            // 월로 자르기
            let monthDate = replyDate.substr(4, 2)
            // 일로 자르기
            let dayDate = replyDate.substr(6, 2)
            state.blog_view_item.write_date = yearDate + '.' + monthDate + '.' + dayDate
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
    setCountryAndCityData (state, payload) {
      // 로컬에 저장된 나라이름 도시 이름을 state에 추가
      if (!payload) {
        return
      }
      state.country_and_city_name = payload.countryAndCityName
      state.city_name_group = payload.cityNameGroup
    },
    gotoBlogViewContent (state, key) {
      // 블로그 이미지와 텍스트를 가져오는 곳
      var lists = state.all_blog_list
      for (var prop in lists) {
        if (lists.hasOwnProperty(prop)) {
          if (lists[prop].key === key) {
            state.blog_view_item_contents = lists[prop].contents
          }
        }
      }
    },
    gotoBlogViewReply (state, key) {
      state.blog_view_item_replys = []
      // 리플 가져오는 곳
      var lists = state.all_blog_list
      for (var prop in lists) {
        if (lists.hasOwnProperty(prop)) {
          if (lists[prop].key === key) {
            let replyAlls = lists[prop].reply // {{},{}}
            // 빈배열 만듬
            for (let replyProp in replyAlls) {
              // reply를 삭제하거나 수정할때 사용하도록 key값을 객체에 추가해준다.
              replyAlls[replyProp].key = replyProp
              // 빈배열에 객체를 순서대로 넣어줌
              state.blog_view_item_replys.push(replyAlls[replyProp])
              // 객체안에서 date 값끼리 비교해서 오름차순으로 적용
              state.blog_view_item_replys.sort((a, b) => {
                return b.date - a.date
              })
            }
            // replyAllCheckDate는 [{date: 12345677},{date: 12345677},{date: 12345677}] 이런식으로 들어가져 있다.
            let replyAllCheckDate = state.blog_view_item_replys
            for (let i = 0, l = replyAllCheckDate.length; i < l; i++) {
              // 숫자로 되어있는 것을 가져와요
              let replyDate = replyAllCheckDate[i].date
              // 년으로 자르기
              let yearDate = replyDate.substr(0, 4)
              // 월로 자르기
              let monthDate = replyDate.substr(4, 2)
              // 일로 자르기
              let dayDate = replyDate.substr(6, 2)
              // 시간으로 자르기
              let hourDate = replyDate.substr(8, 2)
              // 분으로 자르기
              let minDate = replyDate.substr(10, 2)
              let timeDate
              if (hourDate < 12) {
                timeDate = hourDate + ':' + minDate + ' AM'
              } else if (hourDate === '12') {
                timeDate = hourDate + ':' + minDate + ' PM'
              } else if (hourDate >= 22) {
                timeDate = (hourDate - 12) + ':' + minDate + ' PM'
              } else {
                timeDate = '0' + (hourDate - 12) + ':' + minDate + ' PM'
              }
              replyAllCheckDate[i].date = yearDate + '.' + monthDate + '.' + dayDate + ' | ' + timeDate
            }
          }
        }
      }
    },
    gotoBlogViewTag (state, key) {
      // 블로그 이미지와 텍스트를 가져오는 곳
      let lists = state.all_blog_list
      for (let prop in lists) {
        if (lists.hasOwnProperty(prop)) {
          if (lists[prop].key === key) {
            state.blog_view_item_tag = lists[prop].tag
          }
        }
      }
    },
    // 조회수 변경
    changeViewCount (state, payload) {
      state.view_count = payload + 1
    },
    getUserUid (state) {
      state.user_uid = JSON.parse(localStorage.getItem('user_uid'))
    },
    changeListLoadingStatus (state) {
      state.list_loading = false
    }
  },
  actions: {
    // 통신은 액션에서 해야합니다.
    setListsData (context, payload) {
      let lists = payload.data
      if (payload.id === 'all') {
        context.commit('setAllBlogList', payload)
      } else if (payload.id === 'default') {
        context.commit('setAllBlogList', payload)
        context.commit('makePageNumber', Object.keys(lists).length)
      } else if (payload.id === null) {
        context.commit('setAllBlogList', payload)
      } else if (payload.id === 'search') {
        context.commit('setAllBlogList', payload)
        context.commit('filterSearchList', payload)
        context.commit('makePageNumber', Object.keys(lists).length)
      } else {
        for (let prop in lists) {
          if (lists[prop].country === payload.id) {
            context.commit('setAllBlogList', payload)
            context.commit('filterCountryList', payload.id)
          } else {
            for (var i = lists[prop].city.length; i--;) {
              if (lists[prop].city[i] === payload.id) {
                context.commit('setAllBlogList', payload)
                context.commit('filterCityList', payload.id)
              }
            }
          }
        }
      }
    },
    // 조회수
    setChangeViewCount (context, payload) {
      let lists = payload.list
      for (let list in lists) {
        if (list === payload.id) {
          context.commit('changeViewCount', lists[list].view)
          let URL = 'https://traveller-in-blog.firebaseio.com/lists/' + payload.id + '.json'
          axios.patch(URL, {'view': context.state.view_count})
              .catch(function (error) {
                console.log('error', error)
              })
        }
      }
    },
    setCountryAndCity ({commit}, payload) {
      // 전체 리스트에서 필요한 부분만 빼오기. v-for 사용하기 쉽게
      var countryAndCityName = []
      var cityNameGroup = []
      var countryItems = {}
      var city = []
      var countryKye = ''
      var country = ''
      for (var prop in payload) {
        country = payload[prop]
        countryKye = prop
        for (var countryProp in country) {
          if (countryProp !== 'country') {
            var cityitem = []
            cityitem = country[countryProp]
            cityitem.key = countryProp
            city.push(cityitem)
          }
        }
        countryItems.country = country.country
        countryItems.countryKey = countryKye
        countryItems.citygroup = city
        countryAndCityName.push(countryItems)
        cityNameGroup.push(city)
        countryItems = {}
        city = []
      }
      // 나라 이름과 도시 이름을 오름차순 정렬
      countryAndCityName.sort((a, b) => {
        if (a.country > b.country) {
          return 1
        }
        if (a.country < b.country) {
          return -1
        }
        return 0
      })
      for (var i = countryAndCityName.length; i--;) {
        countryAndCityName[i].citygroup.sort((a, b) => {
          if (a.city > b.city) {
            return 1
          }
          if (a.city < b.city) {
            return -1
          }
          return 0
        })
      }
      commit('setCountryAndCityData', {'countryAndCityName': countryAndCityName, 'cityNameGroup': cityNameGroup})
    }
  }
}
