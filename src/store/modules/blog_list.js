import axios from 'axios'
export default {
  state: {
    // 모든 blog 글 목록
    lists: []
  },
  getters: {
    get_BlogList (state) {
      return state.lists
    }
  },
  mutations: {
    mu_BlogList (state, payload) {
      var item = {}
      state.lists = []
      for (var prop in payload) {
        item = payload[prop]
        item.key = prop
        item.write_date = payload[prop].write_date.substring(0, 10).split('-').join('.')
        state.lists.push(item)
      }
      state.lists.sort((a, b) => b.write_date - a.write_date)
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
