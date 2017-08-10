import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './../firebase'
import home from './modules/home'
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
    home, list, memberLeave, mypage, post, signin, signup
  },
  state: {
    // firebase의 모든 데이터
    firebase_data: {}
  },
  getters: {
    firebaseAlldata (state) {
      return state.firebaseAlldata
    }
  },
  actions: {
  },
  mutations: {
    // firebase에 등록되어 있는 모든 데이터들 가지고 와서 State의 값을 변경한다.
    getDatabase (state) {
      firebase.database.ref('/').on('value', snapshot => {
        state.firebase_data = snapshot.val()
      })
    }
  }
})
