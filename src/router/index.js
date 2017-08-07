import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Header from '../components/Home/Header.vue'
import Navigation from '../components/Home/Navigation.vue'
import Footer from '../components/Home/Footer.vue'
import SignUp from '../components/SignUp/SignUp.vue'
import SignIn from '../components/SignIn/SignIn.vue'
import MemberLeave from '../components/MemberLeave/MemberLeave.vue'
import MyPage from '../components/MyPage/MyPage.vue'
import List from '../components/List/List.vue'
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
          path: '/header',
          component: Header,
          name: 'Header'
        },
        {
          path: '/footer',
          component: Footer,
          name: 'Footer'
        },
        {
          path: '/sign-in',
          component: SignUp,
          name: 'SignUp'
        },
        {
          path: '/sign-up',
          component: SignIn,
          name: 'SignIn'
        },
        {
          path: '/member-leave',
          component: MemberLeave,
          name: 'MemberLeave'
        },
        {
          path: '/member/:id',
          component: MyPage,
          name: 'MyPage'
        }
      ]
    },
    {
      path: '/list',
      name: 'List',
      components: {
        default: List,
        gnb: Navigation
      },
      children: [
        {
          path: '/maps',
          component: Maps,
          name: 'Maps'
        },
        {
          path: '/:id/view',
          component: View,
          name: 'View'
        },
        {
          path: '/:id/write',
          component: Write,
          name: 'Write'
        },
        {
          path: '/:id/delete',
          component: Delete,
          name: 'Delete'
        }
      ]
    }
  ]
})
