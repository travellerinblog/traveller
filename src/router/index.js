import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Navigation from '../components/Home/Navigation.vue'
import SignUp from '../components/SignUp/SignUp.vue'
import SignIn from '../components/SignIn/SignIn.vue'
import MemberLeave from '../components/MemberLeave/MemberLeave.vue'
import MyPage from '../components/MyPage/MyPage.vue'
import List from '../components/List/List.vue'
import ListView from '../components/List/ListView.vue'
import View from '../components/List/Post/View.vue'
import Write from '../components/List/Post/Write.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        gnb: Navigation
      },
      children: [
        {
          path: 'sign-up',
          component: SignUp,
          name: 'SignUp'
        },
        {
          path: 'sign-ip',
          component: SignIn,
          name: 'SignIn'
        },
        {
          path: 'member-leave',
          component: MemberLeave,
          name: 'MemberLeave'
        },
        {
          path: 'member/:id',
          component: MyPage,
          name: 'MyPage'
        }
      ]
    },
    {
      path: '/write/:id',
      component: Write,
      name: 'Write'
    },
    {
      path: '/view/:id',
      component: View,
      name: 'View',
      props: true
    },
    {
      path: '/list',
      components: {
        default: List,
        gnb: Navigation
      },
      props: true,
      children: [
        {
          path: ':id',
          component: ListView,
          name: 'ListView'
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
