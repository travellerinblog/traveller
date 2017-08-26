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
    selected_country_filter: null
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
    startShowItme (state) {
      return (state.active_page - 1) * state.show_amount
    },
    endShowItem (state) {
      return state.active_page * state.show_amount
    },
    pageAmount (state) {
      return state.page_amount
    },
    activePage (state) {
      return state.active_page - 1
    },
    selectedFilter (state) {
      return state.selected_filter === 'popular' ? '인기순' : '최신순'
    },
    selectedCountryFilter (state) {
      return state.selected_country_filter === null ? '나라별' : state.selected_country_filter
    }
  },
  mutations: {
    makePageNumber (state, payload) {
      let width = document.documentElement.clientWidth
      if (width < 768) {
        state.show_amount = 4
        state.page_amount = Math.ceil(payload / 4)
        if (state.active_page > state.page_amount) {
          state.active_page = state.page_amount
        }
      } else if (width >= 768 && width < 1200) {
        state.show_amount = 8
        state.page_amount = Math.ceil(payload / 8)
        if (state.active_page > state.page_amount) {
          state.active_page = state.page_amount
        }
      } else {
        state.show_amount = 12
        state.page_amount = Math.ceil(payload / 12)
        if (state.active_page > state.page_amount) {
          state.active_page = state.page_amount
        }
      }
    },
    changePageNumber (state, payload) {
      state.active_page = payload
    },
    changePagePosition (state, payload) {
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
      var countryNameList = state.country_and_city_name
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
    },
    filterCityList (state, payload) {
      var lists = JSON.parse(localStorage.getItem('lists'))
      var item = {}
      var cityNameList = state.city_name_group
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
      state.selected_country_filter = '나라전체'
    },
    setCountryAndCity (state, payload) {
      // 전체 리스트에서 필요한 부분만 빼오기. v-for 사용하기 쉽게
      state.country_and_city_name = []
      state.city_name_group = []
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
        state.country_and_city_name.push(countryItems)
        state.city_name_group.push(city)
        countryItems = {}
        city = []
      }
      // 나라 이름과 도시 이름을 오름차순 정렬
      state.country_and_city_name.sort((a, b) => {
        if (a.country > b.country) {
          return 1
        }
        if (a.country < b.country) {
          return -1
        }
        return 0
      })
      for (var i = state.country_and_city_name.length; i--;) {
        state.country_and_city_name[i].citygroup.sort((a, b) => {
          if (a.city > b.city) {
            return 1
          }
          if (a.city < b.city) {
            return -1
          }
          return 0
        })
      }
    },
    popularListFilter (state) {
      // 지금 필터링 되어있는 항목의 state를 정렬해준다.
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
    },
    newListFilter (state) {
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
  },
  actions: {
    setListsData (context, payload) {
      if (payload === 'all') {
        context.commit('setAllBlogList')
      } else {
        var lists = JSON.parse(localStorage.getItem('lists'))
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
    },
    setCountryAndCity (context) {
      let api = 'https://traveller-in-blog.firebaseio.com/locations.json'
      axios.get(api).then((response) => {
        context.commit('setCountryAndCity', response.data)
      }).catch(error => console.log(error.message))
    }
  }
}
