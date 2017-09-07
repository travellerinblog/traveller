import firebase from './../../firebase'
import axios from 'axios'
export default {
  state: {
    temp_write_data: {},
    write_title_value: '제목을 입력하세요',
    write_tag_value: '태그를 입력하세요',
    title_img_url: '',
    write_contents_data: [],
    selected_write_city: [],
    temp_selected_write_city: [],
    temp_date: {},
    show_write_country: false,
    show_write_city: false,
    selected_write_country_key: '',
    write_error_message: '',
    show_write_error_message: false
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
    writeContentsData (state) {
      return state.write_contents_data
    },
    writeTagValue (state) {
      return state.write_tag_value
    },
    selectedWriteCity (state) {
      return state.selected_write_city.length === 0 ? '여행지를 선택하세요.' : state.selected_write_city.join(', ')
    },
    showWriteCountry (state) {
      return state.show_write_country
    },
    showWriteCity (state) {
      return state.show_write_city
    },
    selectedWriteCountryKey (state) {
      return state.selected_write_country_key
    },
    writeErrorMessage (state) {
      return state.write_error_message
    },
    showWriteErrorMessage (state) {
      return state.show_write_error_message
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
    setTitleValue (state, payload) {
      state.write_title_value = payload
      state.temp_write_data.title = payload
    },
    setTitleImgUrl (state, payload) {
      if (state.title_img_url !== '') {
        let storageRef = firebase.storage.ref('/Write/' + state.temp_write_data.title_img_name)
        storageRef.delete()
      }
      state.title_img_url = payload.url
      state.temp_write_data.title_img = payload.url
      state.temp_write_data.title_img_name = payload.name
    },
    clearInput (state, payload) {
      if (payload.type === 'title') {
        state.write_title_value = payload.value === '제목을 입력하세요' ? '' : payload.value
      }
      if (payload.type === 'tag') {
        state.write_tag_value = payload.value === '태그를 입력하세요' ? '' : payload.value
      }
    },
    inputValueCheck (state, payload) {
      switch (payload) {
        case 'title':
          state.write_title_value = '제목을 입력하세요'
          break
        case 'tag':
          state.write_tag_value = '태그를 입력하세요'
          break
        default:
          state.write_contents_data.splice(payload, 1)
          break
      }
    },
    setTagValue (state, payload) {
      state.write_tag_value = payload
      state.temp_write_data.tag = payload.split('#')
      state.temp_write_data.tag.shift()
    },
    setSelectedItem (state, payload) {
      if (payload.checked) {
        state.temp_selected_write_city.push(payload.id)
      } else {
        let index = state.temp_selected_write_city.indexOf(payload.id)
        state.temp_selected_write_city.splice(index, 1)
      }
    },
    selectComplete (state, payload) {
      state.selected_write_city = state.temp_selected_write_city.slice()
      state.show_write_country = false
      state.show_write_city = false
      state.temp_write_data.city = []
      state.temp_write_data.city_kr = []
      // firebase에 올릴 데이터 입력
      for (var i = payload.length; i--;) {
        if (payload[i].countryKey === state.selected_write_country_key) {
          state.temp_write_data.country = payload[i].countryKey
          state.temp_write_data.country_kr = payload[i].country
          for (var j = payload[i].citygroup.length; j--;) {
            for (var k = state.temp_selected_write_city.length; k--;) {
              if (payload[i].citygroup[j].city === state.temp_selected_write_city[k]) {
                state.temp_write_data.city.push(payload[i].citygroup[j].key)
                state.temp_write_data.city_kr.push(payload[i].citygroup[j].city)
              }
            }
          }
        }
      }
    },
    toggleWriteCountryCity (state, payload) {
      switch (payload) {
        case 'country':
          state.show_write_country = !state.show_write_country
          if (state.show_write_country === false) {
            // country 필터가 fasle가 되면 city도 flase가 되어야 다시 열었을 때 첫 화면에 도시 이름들이 보이지 않는다.
            state.show_write_city = false
          }
          break
        case 'cancel':
          state.show_write_country = false
          state.show_write_city = false
          break
        default :
          if (state.temp_selected_write_city.length !== 0) {
            state.temp_selected_write_city.length = []
          }
          if (payload === state.selected_write_country_key) {
            // 같은 나라 이름을 눌렀을 때 토글.
            state.show_write_city = !state.show_write_city
          } else {
            // 열려있는 나라와 다른 나라를 눌렀을 때는 값을 반전시키면
            // 클릭한 나라의 값이 열리지않고 보이고 있던 나라가 닫혀버리기만 하기 때문에 true값을 준다.
            state.show_write_city = true
            // 현재 보이고 있는 나라의 값을 변경해준다.
            state.selected_write_country_key = payload
          }
          break
      }
    },
    setDate (state, payload) {
      switch (payload.sort) {
        case 'start':
          state.temp_date.start = payload.date
          break
        case 'end':
          state.temp_date.end = payload.date
          break
      }
    },
    saveDate (state) {
      state.temp_write_data.start_date = state.temp_date.start
      state.temp_write_data.end_date = state.temp_date.end
    },
    resetDate (state) {
      state.temp_write_data.start_date = ''
      state.temp_write_data.end_date = ''
    },
    setContentImgUrl (state, payload) {
      let contentImg = {key: 'img'}
      contentImg.value = payload.url
      contentImg.name = payload.name
      state.write_contents_data.push(contentImg)
      state.temp_write_data.contents = state.write_contents_data
    },
    setContentsText (state) {
      let contentText = {key: 'text'}
      contentText.value = ''
      state.write_contents_data.push(contentText)
      state.temp_write_data.contents = state.write_contents_data
    },
    addContentsText (state, payload) {
      state.write_contents_data[payload].value = event.target.value
      state.temp_write_data.contents = state.write_contents_data
    },
    deleteContent (state, payload) {
      let content = state.write_contents_data[payload]
      switch (content.key) {
        case 'text':
          state.write_contents_data.splice(payload, 1)
          state.temp_write_data.contents = state.write_contents_data
          break
        case 'img':
          let storageRef = firebase.storage.ref('/Write/' + content.name)
          storageRef.delete().then(snapshot => {
            state.write_contents_data.splice(payload, 1)
            state.temp_write_data.contents = state.write_contents_data
          }).catch(error => console.log(error))
          break
      }
    },
    printErrorMessage (state, payload) {
      let message = []
      if (payload === 'all') {
        state.write_error_message = '내용을 입력 해주세요.'
      } else {
        for (var i = 0, l = payload.length; i < l; i++) {
          message.push(payload[i].print)
        }
        state.write_error_message = '내용을 입력해주세요. ( ' + message.join(', ') + ' )'
      }
      state.show_write_error_message = true
    },
    setRemainWriteInfo (state, payload) {
      state.temp_write_data.id = payload.id
      state.temp_write_data.name = payload.name
      state.temp_write_data.view = 0
      // state.temp_write_data.write_date
    }
  },
  actions: {
    setImageToStorage ({commit}, payload) {
      var date = new Date()
      date = date.getFullYear() + (date.getMonth() + 1).toString() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds()
      var uploadName = payload.id + '_' + payload.type + '_' + date + '_' + payload.image.name
      var storageRef = firebase.storage.ref('/Write/' + uploadName)
      storageRef.put(payload.image).then(snapshot => {
        let imgInfo = { 'url': snapshot.downloadURL, 'name': uploadName }
        payload.type === 'title' ? commit('setTitleImgUrl', imgInfo) : commit('setContentImgUrl', imgInfo)
      })
    },
    saveWriteData (context, payload) {
      const userApi = 'https://traveller-in-blog.firebaseio.com/users.json'
      // const listApi = 'https://traveller-in-blog.firebaseio.com/lists.json'
      let tempData = context.state.temp_write_data
      let requiredData = [{ 'key': 'title', 'print': '제목' }, { 'key': 'title_img', 'print': '대표 이미지' }, { 'key': 'tag', 'print': '태그' }, { 'key': 'city', 'print': '여행지' }, { 'key': 'start_date', 'print': '여행 시작 날짜' }, { 'key': 'end_date', 'print': '여행 종료 날짜' }, { 'key': 'contents', 'print': '블로그 본문' }]
      axios.get(userApi).then(response => {
        // user값을 저장하는 통신
        for (let prop in response.data) {
          if (prop === payload) {
            context.commit('setUserInfo', response.data[prop])
          }
        }
      }).then(response => {
        // list에 저장하는 통신
      }).catch(error => console.log(error.message))
      if (Object.keys(tempData).length === 11) {
        // 통신할 때 user 정보 추가하여 저장.
        // router.push(...) 로 라우터 연결
      } else if (Object.keys(tempData).length === 0) {
        context.commit('printErrorMessage', 'all')
      } else {
        for (let prop in tempData) {
          for (let i = requiredData.length; i--;) {
            if (requiredData[i].key === prop) {
              requiredData.splice(i, 1)
            }
          }
        }
        context.commit('printErrorMessage', requiredData)
      }
    }
  }
}
