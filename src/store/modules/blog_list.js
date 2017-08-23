import axios from 'axios'
export default {
  state: {
    // 모든 blog 글 목록
    lists: [],
    all_blog_list: []
  },
  getters: {
    get_BlogList (state) {
      return state.lists
    }
  },
  mutations: {
    mu_BlogList (state, payload) {
      state.lists = payload
      let lists = state.lists
      state.all_blog_list = []
      for (var prop in lists) {
        state.all_blog_list.push(lists[prop])
      }
      state.lists = state.all_blog_list.slice()
    },
    swipeBlogList (state, payload) {
      switch (payload) {
        case 'next':
          var firstItem = state.lists.shift()
          state.lists.push(firstItem)
          break
        case 'prev':
          var lastItem = state.lists.pop()
          state.lists.unshift(lastItem)
          break
      }
    }
  },
  actions: {
    ac_BlogList (context) {
      const baseURI = 'https://traveller-in-blog.firebaseio.com/'
      axios.get(`${baseURI}/lists.json`)
      .then((result) => {
        context.commit('mu_BlogList', result.data)
      })
    }
  }
}
