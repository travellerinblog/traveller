import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Join from '../components/Join/Join.vue'
import SignIn from '../components/SignIn/SignIn.vue'
import MemberLeave from '../components/MemberLeave/MemberLeave.vue'
import MyPage from '../components/MyPage/MyPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/Join',
          component: Join
        },
        {
          path: '/SingIn',
          component: SignIn
        },
        {
          path: '/MemberLeave',
          component: MemberLeave
        },
        {
          path: '/member/:id',
          component: MyPage
        }
      ]
    }
  ]
})
