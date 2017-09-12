import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Navigation from '../components/Home/Navigation.vue'
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
      }
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
