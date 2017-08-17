import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import THeader from '../components/Home/THeader.vue'
import Navigation from '../components/Home/Navigation.vue'
import TFooter from '../components/Home/TFooter.vue'
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
          path: '',
          component: THeader,
          name: 'THeader'
        },
        {
          path: '',
          component: TFooter,
          name: 'TFooter'
        },
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
      path: '/view',
      component: View,
      name: 'View',
      props: true
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
