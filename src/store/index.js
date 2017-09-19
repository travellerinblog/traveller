import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import firebase from './../firebase'
import header from './modules/header'
import visual from './modules/visual'
import blogList from './modules/blog_list'
import countryList from './modules/country_list'
import recommendation from './modules/recommendation'
import list from './modules/list'
import post from './modules/post'
import edit from './modules/edit'
import sign from './modules/sign'
import view from './modules/view'

Vue.use(Vuex)
Vue.use(firebase)

export const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    header, visual, blogList, countryList, recommendation, list, post, sign, view, edit
  },
  state: {
  },
  getters: {
  },
  actions: {
  },
  mutations: {
  }
})
