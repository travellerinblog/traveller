import firebase from './../../firebase'
export default {
  state: {
    recommend_item: {},
    ellipsis_text: ''
  },
  getters: {
    getRecommendItem (state) {
      return state.recommend_item
    },
    getConvertedDate (state) {
      var convert = state.recommend_item.write_date
      return convert.substring(0, 10).split('-').join('.')
    },
    getEllipsisText (state) {
      return state.ellipsis_text
    }
  },
  mutations: {
    setRecommendItem (state) {
      // 미리 받아놓은 firebase_data를 사용하려고 하니 에러가 발생하여, list item 하나만 가져와서 사용.
      firebase.database.ref('/lists/list1').on('value', snapshot => {
        state.recommend_item = snapshot.val()
      })
    },
    setEllipsisText (state) {
      // 화면 사이즈에 따라서 몇 글자까지 보일지 정해준다.
      let clientWidth = document.documentElement.clientWidth
      let textLength = state.recommend_item.contents[1].length
      let text = state.recommend_item.contents[1]
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
  actions: {}
}
