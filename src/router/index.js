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
import Maps from '../components/List/Maps.vue'
import View from '../components/List/Post/View.vue'
import Write from '../components/List/Post/Write.vue'
import Delete from '../components/List/Post/Delete.vue'

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
      path: '/view/:id',
      component: View,
      name: 'View',
      props: true
    },
    {
      path: '/list/:id',
      components: {
        default: List,
        gnb: Navigation
      },
      props: true,
      children: [
        {
          path: '',
          component: ListView,
          name: 'ListView'
        },
        {
          path: '/maps',
          component: Maps,
          name: 'Maps'
        },
        {
          path: '/write/:id',
          component: Write,
          name: 'Write'
        },
        {
          path: '/delete/:id',
          component: Delete,
          name: 'Delete'
        }
      ]
    }
  ]
})
