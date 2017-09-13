export default {
  state: {
    recommend_item: {},
    ellipsis_text: '',
    item_img_src: '',
    contents: '',
    write_date: ''
  },
  getters: {
    getRecommendItem (state) {
      return state.recommend_item
    },
    getRecommendItemImgSrc (state) {
      return state.item_img_src
    },
    getConvertedDate (state) {
      return state.write_date.substr(0, 4) + '.' + state.write_date.substr(4, 2) + '.' + state.write_date.substr(6, 2)
    },
    getEllipsisText (state) {
      return state.ellipsis_text
    }
  },
  mutations: {
    setRecommendItem (state, payload) {
      state.recommend_item = payload.list1
      state.item_img_src = payload.list1.title_img
      state.contents = payload.list1.contents[1].value
      state.write_date = payload.list1.write_date
    },
    setEllipsisText (state) {
      // 화면 사이즈에 따라서 몇 글자까지 보일지 정해준다.
      let clientWidth = document.documentElement.clientWidth
      let textLength = state.contents.length
      let text = state.contents
      if (clientWidth < 767) {
        if (textLength < 120) {
          state.ellipsis_text = text
        } else {
          state.ellipsis_text = text.substring(0, 117) + '...'
        }
      } else if (clientWidth >= 768 && clientWidth < 1200) {
        if (textLength < 250) {
          state.ellipsis_text = text
        } else {
          state.ellipsis_text = text.substring(0, 247) + '...'
        }
      } else {
        if (textLength < 500) {
          state.ellipsis_text = text
        } else {
          state.ellipsis_text = text.substring(0, 497) + '...'
        }
      }
    }
  },
  actions: {
    setRecommendItem (context, payload) {
      context.commit('setRecommendItem', payload)
    }
  }
}
