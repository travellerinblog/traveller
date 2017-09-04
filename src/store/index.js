import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from './../firebase'
import header from './modules/header'
import visual from './modules/visual'
import blogList from './modules/blog_list'
import countryList from './modules/country_list'
import recommendation from './modules/recommendation'
import list from './modules/list'
import memberLeave from './modules/member_leave'
import mypage from './modules/mypage'
import post from './modules/post'
import signin from './modules/signin'
import signup from './modules/signup'

Vue.use(Vuex)
Vue.use(firebase)

export const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    header, visual, blogList, countryList, recommendation, list, memberLeave, mypage, post, signin, signup
  },
  state: {
  },
  getters: {
  },
  actions: {
    getListsFromFireBase () {
      let api = 'https://traveller-in-blog.firebaseio.com/lists.json'
      axios.get(api).then((response) => {
        window.localStorage.setItem('lists', JSON.stringify(response.data))
      }).catch(error => console.log(error.message))
    },
    getReplyFireBase ({commit}) {
      let api = 'https://traveller-in-blog.firebaseio.com/lists.json'
      axios.get(api).then((response) => {
        window.localStorage.setItem('lists', JSON.stringify(response.data))
      }).catch(error => console.log(error.message))
      commit('gotoBlogViewReply', this.$route.params.id)
    },
    getCountryAndCityFromFireBase (context) {
      let api = 'https://traveller-in-blog.firebaseio.com/locations.json'
      axios.get(api).then((response) => {
        context.commit('setCountryAndCity', response.data)
      }).catch(error => console.log(error.message))
    }
  },
  mutations: {
    setCountryAndCity (state, payload) {
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
      window.localStorage.setItem('country_and_city', JSON.stringify(countryAndCityName))
      window.localStorage.setItem('city_group', JSON.stringify(cityNameGroup))
    }
  }
})
