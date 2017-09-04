import firebase from './../../firebase'
export default {
  state: {
    write_title_value: '제목을 입력하세요',
    write_tag_value: '태그를 입력하세요',
    title_img_url: '',
    title_editable: false,
    tag_editable: false,
    temp_write_data: {}
  },
  getters: {
    writeTitleEditable (state) {
      return state.title_editable
    },
    writeTagEditable (state) {
      return state.tag_editable
    },
    writeTitleValue (state) {
      return state.write_title_value
    },
    wirteTitleImgUrl (state) {
      return state.title_img_url
    },
    writeTagValue (state) {
      return state.write_tag_value
    }
  },
  mutations: {
    changeEditable (state, payload) {
      switch (payload) {
        case 'title':
          state.title_editable = true
          break
        case 'tag':
          state.tag_editable = true
          break
      }
    },
    enterDetect (state, payload) {
      switch (payload) {
        case 'title':
          state.title_editable = false
          break
        case 'tag':
          state.tag_editable = false
          break
      }
    },
    setTitleValue (state, payload) {
      state.write_title_value = payload
      state.temp_write_data.title = payload
    },
    setTitleImgUrl (state, payload) {
      state.title_img_url = payload
      state.temp_write_data.title_img = payload
    },
    setTagValue (state, payload) {
      state.write_tag_value = payload
      state.temp_write_data.tag = payload.split(' ')
    }
  },
  actions: {
    setTitleValue ({commit}, payload) {
      commit('setTitleValue', payload.target.textContent)
    },
    setTagValue ({commit}, payload) {
      commit('setTagValue', payload.target.textContent)
    },
    enterDetect ({commit}, payload) {
      if (payload.event.keyCode === 13) {
        commit('enterDetect', payload.sort)
      }
    },
    toggleWriteCountryCity ({commit}) {
      commit('toggleWriteCountryCity')
    },
    setTitleImageToStorage ({commit}, payload) {
      var storageRef = firebase.storage.ref('/Write_temp/' + payload.name)
      storageRef.put(payload).then(snapshot => {
        commit('setTitleImgUrl', snapshot.downloadURL)
      })
    }
  }
}
