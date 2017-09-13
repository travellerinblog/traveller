import firebase from './../../firebase'
import router from './../../router/'
import axios from 'axios'
export default {
  state: {
    temp_write_data: {},
    write_title_value: '',
    write_tag_value: '',
    title_img_url: '',
    write_contents_data: [],
    selected_write_city: [],
    temp_selected_write_city: [],
    temp_date: {},
    show_write_country: false,
    show_write_city: false,
    selected_write_country_key: '',
    title_error_message: '제목은 30자 이하로 작성해주세요.',
    show_title_error_message: false,
    tag_error_message: '태그 내용을 #으로 구분해주세요.',
    show_tag_error_message: false,
    date_error_message: '',
    show_date_error_message: false,
    write_error_message: '',
    content_error_message: '텍스트를 입력해주세요.',
    show_content_error_message: false,
    show_write_error_message: false,
    image_progress_message: '이미지를 업로드 하고있습니다.',
    show_title_image_progress: false,
    show_content_image_progress: false,
    error_check_before_post: {}
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
    titleErrorMessage (state) {
      return state.title_error_message
    },
    showTitleErrorMessage (state) {
      return state.show_title_error_message
    },
    tagErrorMessage (state) {
      return state.tag_error_message
    },
    showTagErrorMessage (state) {
      return state.show_tag_error_message
    },
    dateErrorMessage (state) {
      return state.date_error_message
    },
    showDateErrorMessage (state) {
      return state.show_date_error_message
    },
    writeErrorMessage (state) {
      return state.write_error_message
    },
    showWriteErrorMessage (state) {
      return state.show_write_error_message
    },
    contentErrorMessage (state) {
      return state.content_error_message
    },
    showContentErrorMessage (state) {
      return state.show_content_error_message
    },
    imageProgressMessage (state) {
      return state.image_progress_message
    },
    showTitleImageProgress (state) {
      return state.show_title_image_progress
    },
    showContentImageProgress (state) {
      return state.show_content_image_progress
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
      if (event.target.value.length > 30) {
        state.show_title_error_message = true
        state.error_check_before_post.title = false
        return
      }
      state.write_title_value = payload
      state.temp_write_data.title = payload
      state.show_title_error_message = false
      state.error_check_before_post.title = true
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
    clearFileValue () {
      event.target.value = null
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
      if (state.temp_write_data.tag.length === 0) {
        state.show_tag_error_message = true
        state.error_check_before_post.tag = false
        return
      } else if (event.target.value.slice(0, 1) !== '#') {
        state.show_tag_error_message = true
        state.error_check_before_post.tag = false
        return
      } else {
        for (let i = state.temp_write_data.tag.length; i--;) {
          if (state.temp_write_data.tag[i] === '') {
            state.show_tag_error_message = true
            state.error_check_before_post.tag = false
            return
          }
        }
        state.show_tag_error_message = false
        state.error_check_before_post.tag = true
      }
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
      let today = new Date()
      let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1).toString() : (today.getMonth() + 1).toString()
      let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
      let start = state.temp_date.start
      let end = state.temp_date.end
      today = today.getFullYear() + month + day
      if (start !== undefined && end !== undefined && start !== '' && end !== '') {
        if (start <= end) {
          if (today >= start.split('-').join('') && today >= end.split('-').join('')) {
            state.temp_write_data.start_date = start
            state.temp_write_data.end_date = end
            state.date_error_message = ''
            state.show_date_error_message = false
            state.error_check_before_post.date = true
          } else {
            state.date_error_message = '* 여행 날짜는 오늘 이후가 될 수 없습니다.'
            state.show_date_error_message = true
            state.error_check_before_post.date = false
          }
        } else {
          state.date_error_message = '* 여행 시작날짜는 종료날짜의 이후가 될 수 없습니다.'
          state.show_date_error_message = true
          state.error_check_before_post.date = false
        }
      } else {
        state.date_error_message = '* 여행 시작날짜와 종료 날짜를 모두 입력해주세요.'
        state.show_date_error_message = true
        state.error_check_before_post.date = false
      }
    },
    setContentImgUrl (state, payload) {
      let contentImg = {key: 'img'}
      contentImg.value = payload.url
      contentImg.name = payload.name
      state.write_contents_data.push(contentImg)
      state.temp_write_data.contents = state.write_contents_data
    },
    setContentsText (state) {
      let contents = state.write_contents_data
      // 빈 텍스트 에리어가 있으면 새로운 텍스트 에리어가 추가되지 않는다.
      for (var i = contents.length; i--;) {
        if (contents[i].key === 'text' && contents[i].value === '') {
          return
        }
      }
      let contentText = {key: 'text'}
      contentText.value = ''
      state.show_content_error_message = true
      state.error_check_before_post.content = false
      state.write_contents_data.push(contentText)
      state.temp_write_data.contents = state.write_contents_data
    },
    addContentsText (state, payload) {
      if (event.target.value.length > 0) {
        state.show_content_error_message = false
        state.error_check_before_post.content = true
      }
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
        state.write_error_message = '내용을 모두 입력 해주세요.'
      } else if (payload === 'error') {
        state.write_error_message = '규칙에 맞게 내용을 입력해주세요.'
      } else {
        for (var i = 0, l = payload.length; i < l; i++) {
          message.push(payload[i].print)
        }
        state.write_error_message = '내용을 모두 입력해주세요. ( ' + message.join(', ') + ' )'
      }
      state.show_write_error_message = true
    },
    setRemainWriteInfo (state, payload) {
      let times = new Date()
      let month = (times.getMonth() + 1) < 10 ? '0' + (times.getMonth() + 1).toString() : (times.getMonth() + 1).toString()
      let day = times.getDate() < 10 ? '0' + times.getDate() : times.getDate()
      let hours = times.getHours() < 10 ? '0' + times.getHours() : times.getHours()
      let minute = times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes()
      let second = times.getSeconds() < 10 ? '0' + times.getSeconds() : times.getSeconds()
      state.temp_write_data.id = payload.id
      state.temp_write_data.name = payload.name
      state.temp_write_data.view = 0
      state.temp_write_data.write_date = times.getFullYear() + month + day + hours + minute + second
    },
    resetTempData (state, payload) {
      state.temp_write_data = {}
      state.selected_write_city = []
      state.write_contents_data = []
      state.write_title_value = '제목을 입력하세요'
      state.write_tag_value = '태그를 입력하세요'
      state.title_img_url = ''
      state.write_error_message = ''
      state.error_check_before_post = {}
      state.date_error_message = ''
      payload.start.value = ''
      payload.end.value = ''
    },
    imageUploadProgress (state, payload) {
      if (payload.type === 'title' && payload.state === 'progress') {
        state.show_title_image_progress = true
      } else if (payload.type === 'title' && payload.state === 'done') {
        state.show_title_image_progress = false
      } else if (payload.type === 'content' && payload.state === 'progress') {
        state.show_content_image_progress = true
      } else if (payload.type === 'content' && payload.state === 'done') {
        state.show_content_image_progress = false
      }
    }
  },
  actions: {
    setImageToStorage ({commit}, payload) {
      var date = new Date()
      date = date.getFullYear() + (date.getMonth() + 1).toString() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds()
      var uploadName = payload.id + '_' + payload.type + '_' + date + '_' + payload.image.name
      var storageRef = firebase.storage.ref('/Write/' + uploadName)
      commit('imageUploadProgress', {'state': 'progress', 'type': payload.type})
      storageRef.put(payload.image).then(snapshot => {
        let imgInfo = { 'url': snapshot.downloadURL, 'name': uploadName }
        payload.type === 'title' ? commit('setTitleImgUrl', imgInfo) : commit('setContentImgUrl', imgInfo)
        commit('imageUploadProgress', {'state': 'done', 'type': payload.type})
      })
    },
    saveWriteData (context, payload) {
      const userApi = 'https://traveller-in-blog.firebaseio.com/users.json'
      const listApi = 'https://traveller-in-blog.firebaseio.com/lists.json'
      let tempData = context.state.temp_write_data
      let requiredData = [{ 'key': 'title', 'print': '제목' }, { 'key': 'title_img', 'print': '대표 이미지' }, { 'key': 'tag', 'print': '태그' }, { 'key': 'city', 'print': '여행지' }, { 'key': 'start_date', 'print': '여행 시작 날짜' }, { 'key': 'end_date', 'print': '여행 종료 날짜' }, { 'key': 'contents', 'print': '블로그 본문' }]
      let errorCheck = context.state.error_check_before_post
      for (var prop in errorCheck) {
        if (errorCheck[prop] === false) {
          context.commit('printErrorMessage', 'error')
          return
        }
      }
      if (Object.keys(tempData).length === 11) {
        axios.get(userApi).then(response => {
          // user값을 저장하는 통신
          for (let prop in response.data) {
            if (prop === payload.id) {
              context.commit('setRemainWriteInfo', response.data[prop])
            }
          }
        }).then(response => {
          // list에 저장하는 통신
          axios.post(listApi, context.state.temp_write_data).then(response => {
            // router.push(...) 로 라우터 연결
            router.push({name: 'View', params: { id: response.data.name }})
          }).catch(error => console.log(error))
        }).catch(error => console.log(error.message))
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
