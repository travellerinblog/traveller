export default {
  state: {
    show_modal: false,
    show_search: false
  },
  getters: {
    showNav (state) {
      return state.show_modal
    },
    closeNav (state) {
      return state.show_modal
    },
    showSearch (state) {
      return state.show_search
    },
    closeSearch (state) {
      return state.show_search
    }
  },
  mutations: {
    showMeModal (state) {
      state.show_modal = true
    },
    closeMeModal (state) {
      state.show_modal = false
    },
    showMeSearch (state) {
      state.show_search = true
    },
    closeMeSearch (state) {
      state.show_search = false
    }
  },
  actions: {}
}
