import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import list from './modules/list'
import memberLeave from './modules/member_leave'
import mypage from './modules/mypage'
import post from './modules/post'
import signin from './modules/signin'
import signup from './modules/signup'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    home, list, memberLeave, mypage, post, signin, signup
  },
  state: {},
  getters: {},
  actions: {},
  mutations: {}
})
