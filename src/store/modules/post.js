import firebase from './../../firebase'
import router from './../../router/'
import axios from 'axios'
export default {
  state: {
    // 글쓰기
    // 최종 post 값
    temp_write_data: {},
    // 제목 값
    write_title_value: '',
    // 태그 값
    write_tag_value: '',
    // 대표 이미지 값
    title_img_url: '',
    // 이미지 / 텍스트 값
    write_contents_data: [],
    // 최종 도시 값
    selected_write_city: [],
    // 도시 값
    temp_selected_write_city: [],
    // 날짜 값을 비교
    temp_date: {},
    // 나라 값
    selected_write_country_key: '',
    // show 관련된 것을 토글
    show_write_country: false,
    show_write_city: false,
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
    // 에러 메세지의 유무를 확인하는 곳
    error_check_before_post: {}
  },
  getters: {
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
    writeDate (state) {
      return state.temp_date
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
    // 수정
    setEditData (state, payload) {
      // 타이틀
      state.write_title_value = payload.data.title
      // 태그
      state.write_tag_value = '#' + payload.data.tag.join('#')
      // 대표이미지
      state.title_img_url = payload.data.title_img
      // 나라
      state.selected_write_country_key = payload.data.country
      // 시티
      state.selected_write_city = payload.data.city_kr
      // 여행 날짜
      state.temp_date.start = payload.data.start_date
      state.temp_date.end = payload.data.end_date
      // 이미지와 텍스트
      state.write_contents_data = payload.data.contents
      // 에러 메세지
      state.show_title_error_message = false
      state.show_write_country = false
      state.show_write_city = false
      state.show_tag_error_message = false
      state.show_date_error_message = false
      state.show_content_error_message = false
      state.show_write_error_message = false
      state.show_title_image_progress = false
      state.show_content_image_progress = false
      state.error_check_before_post.title = true
      state.temp_write_data = payload.data
    },
    // 글쓰기
    // 타이틀
    setTitleValue (state, payload) {
      if (event.target.value.length > 30) {
        state.show_title_error_message = true
        state.error_check_before_post.title = false
        setTimeout(() => { state.show_title_error_message = false }, 2500)
        return
      }
      state.write_title_value = payload
      state.temp_write_data.title = payload
      state.show_title_error_message = false
      state.error_check_before_post.title = true
    },
    setTitleImgUrl (state, payload) {
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
        setTimeout(() => { state.show_tag_error_message = false }, 2500)
        return
      } else if (event.target.value.slice(0, 1) !== '#') {
        state.show_tag_error_message = true
        state.error_check_before_post.tag = false
        setTimeout(() => { state.show_title_error_message = false }, 2500)
        return
      } else {
        for (let i = state.temp_write_data.tag.length; i--;) {
          if (state.temp_write_data.tag[i] === '') {
            state.show_tag_error_message = true
            state.error_check_before_post.tag = false
            setTimeout(() => { state.show_title_error_message = false }, 2500)
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
      if (Object.prototype.toString.call(state.write_contents_data).slice(8, -1).toLowerCase() !== 'array') {
        state.write_contents_data = []
      }
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
      if (Object.prototype.toString.call(state.write_contents_data).slice(8, -1).toLowerCase() !== 'array') {
        state.write_contents_data = []
      }
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
      // 이미지와 텍스트에리어의 삭제 버튼을 눌렀을 때 state 데이터에서 해당 값을 삭제해준다.
      let content = state.write_contents_data[payload]
      switch (content.key) {
        case 'text':
          state.write_contents_data.splice(payload, 1)
          state.temp_write_data.contents = state.write_contents_data
          break
        case 'img':
          state.write_contents_data.splice(payload, 1)
          state.temp_write_data.contents = state.write_contents_data
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
    closeErrorMessage (state) {
      state.show_write_error_message = false
    },
    setRemainWriteInfo (state, payload) {
      // 저장하기 전에 필요한 나머지 데이터들 추가해 주기.
      let times = new Date()
      let month = (times.getMonth() + 1) < 10 ? '0' + (times.getMonth() + 1).toString() : (times.getMonth() + 1).toString()
      let day = times.getDate() < 10 ? '0' + times.getDate() : times.getDate()
      let hours = times.getHours() < 10 ? '0' + times.getHours() : times.getHours()
      let minute = times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes()
      let second = times.getSeconds() < 10 ? '0' + times.getSeconds() : times.getSeconds()
      state.temp_write_data.id = payload.id
      state.temp_write_data.name = payload.name
      state.temp_write_data.uid = JSON.parse(localStorage.getItem('user_uid'))
      state.temp_write_data.view = 0
      state.temp_write_data.write_date = times.getFullYear() + month + day + hours + minute + second
    },
    resetTempData (state, payload) {
      // mounted시점에 이전에 입력했던 temp data들을 전부 비워준다.
      state.temp_write_data = {}
      state.selected_write_city = []
      state.write_contents_data = []
      state.write_title_value = '제목을 입력하세요'
      state.show_title_error_message = false
      state.write_tag_value = '태그를 입력하세요'
      state.show_tag_error_message = false
      state.title_img_url = ''
      state.write_error_message = ''
      state.show_write_error_message = false
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
    setImageToStorage ({commit, state}, payload) {
      var date = new Date()
      date = date.getFullYear() + (date.getMonth() + 1).toString() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds()
      var uploadName = payload.id + '_' + payload.type + '_' + date + '_' + payload.image.name
      var storageRef = firebase.storage.ref('/Write/' + uploadName)
      commit('imageUploadProgress', {'state': 'progress', 'type': payload.type})
      // if (state.title_img_url !== '') {
      //   let storageRef = firebase.storage.ref('/Write/' + state.temp_write_data.title_img_name)
      //   storageRef.delete()
      // }
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
      // 현제 표시된 에러가 하나라도 있으면 에러 창을 띄운다.
      for (var prop in errorCheck) {
        if (errorCheck[prop] === false) {
          context.commit('printErrorMessage', 'error')
          return
        }
      }
      // 필요한 모든 값이 들어와있으면(11개) 통신한다.
      if (Object.keys(tempData).length === 11) {
        axios.get(userApi).then(response => {
          // user값을 저장하는 통신
          for (let prop in response.data) {
            if (response.data[prop].uid === payload.id) {
              // temp data에 아직 저장되지 않은 값을 추가로 저장한다.
              context.commit('setRemainWriteInfo', response.data[prop])
            }
          }
        }).then(response => {
          // list에 저장하는 통신
          axios.post(listApi, context.state.temp_write_data).then(response => {
            // router.push(...) 로 라우터 연결 등록된 글로 연결.
            router.push({name: 'View', params: { id: response.data.name }})
          }).catch(error => console.log(error))
        }).catch(error => console.log(error.message))
      } else if (Object.keys(tempData).length === 0) {
        // 아무 것도 입력하지 않았을 때 에러 메세지 표시
        context.commit('printErrorMessage', 'all')
      } else {
        // 어떤 값이 입력되지 않았는지 확인한다.
        for (let prop in tempData) {
          for (let i = requiredData.length; i--;) {
            if (requiredData[i].key === prop) {
              requiredData.splice(i, 1)
            }
          }
        }
        // 입력되지 않은 값을 알려주는 에러 메세지 표시
        context.commit('printErrorMessage', requiredData)
      }
      setTimeout(() => { context.commit('closeErrorMessage') }, 2500)
    },
    saveEditData (context, payload) {
      let tempData = context.state.temp_write_data
      let requiredData = [{ 'key': 'title', 'print': '제목' }, { 'key': 'title_img', 'print': '대표 이미지' }, { 'key': 'tag', 'print': '태그' }, { 'key': 'city', 'print': '여행지' }, { 'key': 'start_date', 'print': '여행 시작 날짜' }, { 'key': 'end_date', 'print': '여행 종료 날짜' }, { 'key': 'contents', 'print': '블로그 본문' }]
      let errorCheck = context.state.error_check_before_post
      for (let prop in errorCheck) {
        if (errorCheck[prop] === false) {
          context.commit('printErrorMessage', 'error')
          setTimeout(() => { context.commit('closeErrorMessage') }, 2500)
          return
        }
      }
      if (Object.keys(tempData).length >= 16) {
        if (tempData.title === '' && tempData.contents.length === 0) {
          context.commit('printErrorMessage', [{ 'key': 'title', 'print': '제목' }, { 'key': 'contents', 'print': '블로그 본문' }])
          setTimeout(() => { context.commit('closeErrorMessage') }, 2500)
          return
        } else if (tempData.contents.length === 0) {
          context.commit('printErrorMessage', [{ 'key': 'contents', 'print': '블로그 본문' }])
          setTimeout(() => { context.commit('closeErrorMessage') }, 2500)
          return
        } else if (tempData.title === '') {
          context.commit('printErrorMessage', [{ 'key': 'title', 'print': '제목' }])
          setTimeout(() => { context.commit('closeErrorMessage') }, 2500)
          return
        } else {
          let URL = 'https://traveller-in-blog.firebaseio.com/lists/' + payload.key + '.json'
          axios.patch(URL, tempData).then(response => {
            router.push({name: 'View', params: { id: payload.key }})
          }).catch(function (error) {
            console.log('error', error)
          })
        }
      } else if (Object.keys(tempData).length === 0) {
        context.commit('printErrorMessage', 'all')
        setTimeout(() => { context.commit('closeErrorMessage') }, 2500)
      } else {
        for (let prop in tempData) {
          for (let i = requiredData.length; i--;) {
            if (requiredData[i].key === prop && tempData[prop].length !== 0) {
              requiredData.splice(i, 1)
            }
          }
        }
        context.commit('printErrorMessage', requiredData)
        setTimeout(() => { context.commit('closeErrorMessage') }, 2500)
      }
    },
    deleteContent ({commit, state}, payload) {
      let content = state.write_contents_data[payload]
      switch (content.key) {
        case 'text':
          commit('deleteContent', payload)
          break
        case 'img':
          let storageRef = firebase.storage.ref('/Write/' + content.name)
          storageRef.delete().then(snapshot => {
            commit('deleteContent', payload)
          }).catch(error => console.log(error))
          break
      }
    }
  }
}
