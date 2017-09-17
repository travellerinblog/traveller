const userApi = 'https://traveller-in-blog.firebaseio.com/users.json'
// const listApi = 'https://traveller-in-blog.firebaseio.com/lists.json'
import axios from 'axios'
export default {
  state: {
    view_reply_data: {
      date: '',
      id: '',
      name: '',
      user_uid: '',
      reply_text: '댓글을 작성해주세요'
    },
    show_delete_reply: {
      display: false,
      index: null
    },
    reply_editable: {
      state: false,
      index: null
    },
    show_edit_reply: false,
    original_reply_text: '',
    edited_reply_text: ''
  },
  getters: {
    viewReplyData (state) {
      return state.view_reply_data
    },
    showDeleteReply (state) {
      return state.show_delete_reply
    },
    replyEditable (state) {
      return state.reply_editable
    },
    showEditReply (state) {
      return state.show_edit_reply
    },
    originalReplyText (state) {
      return state.original_reply_text
    }
  },
  mutations: {
    inputReplyText (state, payload) {
      // 입력된 댓글을 state에 저장
      state.view_reply_data.reply_text = event.target.value
      let times = new Date()
      let month = (times.getMonth() + 1) < 10 ? '0' + (times.getMonth() + 1).toString() : (times.getMonth() + 1).toString()
      let day = times.getDate() < 10 ? '0' + times.getDate() : times.getDate()
      let hours = times.getHours() < 10 ? '0' + times.getHours() : times.getHours()
      let minute = times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes()
      let second = times.getSeconds() < 10 ? '0' + times.getSeconds() : times.getSeconds()
      state.view_reply_data.date = times.getFullYear() + month + day + hours + minute + second
      if (state.view_reply_data.user_uid === '') {
        state.view_reply_data.id = payload.id
        state.view_reply_data.name = payload.name
        state.view_reply_data.user_uid = payload.uid
      }
    },
    resetReplytext (state) {
      // 댓글 작성할 때 기본값이 들어가 있다면 value를 비워준다.
      if (state.view_reply_data.reply_text === '댓글을 작성해주세요' || state.view_reply_data.reply_text === '댓글이 입력되지 않았습니다. 댓글을 입력해주세요') {
        state.view_reply_data.reply_text = ''
        return
      }
    },
    checkReplyText (state) {
      // 리플 등록할 때, 입력한 값이 없다면 reply_text를 변경하여 알림
      let textCheck = state.view_reply_data.reply_text.trim().length
      if (textCheck === 0) {
        state.view_reply_data.reply_text = '댓글이 입력되지 않았습니다. 댓글을 입력해주세요'
        return
      }
    },
    clearReplyData (state) {
      // reply text 초기화
      state.view_reply_data.reply_text = '댓글을 작성해주세요'
      state.original_reply_text = ''
      state.edited_reply_text = ''
    },
    askDeleteReply (state, payload) {
      // 댓글 삭제 여부 확인 창 열기
      state.show_delete_reply.display = true
      state.show_delete_reply.index = payload
    },
    closeDeleteReply (state) {
      // 댓글 삭제 여부 확인 창 닫음
      state.show_delete_reply.display = false
      state.show_delete_reply.index = null
    },
    changeEditReply (state, index) {
      // 저장버튼 보이게하고 리플 텍스트 editable 상태를 변경
      state.show_edit_reply = !state.show_edit_reply
      state.reply_editable.state = !state.reply_editable.state
      // 해당 요소만 저장 할 수 있도록 하기 위해 index 값이 필요
      state.reply_editable.index = index
    },
    editReplyText (state, replyText) {
      // 리플 텍스트의 input 이벤트, state에서 reply 값을 변경한다.
      state.original_reply_text = replyText
      state.edited_reply_text = event.target.textContent
    }
  },
  actions: {
    inputReplyText ({commit, state}) {
      // input창에 글 쓸 때의 동작
      // 만약에 리플 데이터에 유저 값이 저장되어 있지 않다면 firebase에서 유저값을 가져와서 mutation에 던져준다.
      if (state.view_reply_data.user_uid === '') {
        let user = JSON.parse(localStorage.getItem('user_uid'))
        axios.get(userApi).then(response => {
          for (let prop in response.data) {
            if (response.data[prop].uid === user) {
              commit('inputReplyText', response.data[prop])
            }
          }
        })
      } else {
        // 유저값이 저장되어 있다면 통신 필요없이 바로 commit
        commit('inputReplyText')
      }
    },
    saveEditReply ({commit, state}, payload) {
      // 댓글 수정후 저장 버튼을 눌렀을 때의 동작
      // 서버와 통신 reply 값을 변경, key값 필요
      let URL = 'https://traveller-in-blog.firebaseio.com/lists/' + payload.post_id + '/reply/' + payload.reply_key + '.json'
      axios.patch(URL, {'reply_text': state.edited_reply_text})
      .catch(function (error) {
        console.log('error', error)
      })
      // 댓글 저장 버튼을 숨기고 다시 수정/삭제 버튼이 나오도록 한다
      commit('changeEditReply')
    }
  }
}
