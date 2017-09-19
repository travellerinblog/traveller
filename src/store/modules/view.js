const userApi = 'https://traveller-in-blog.firebaseio.com/users.json'
// const listApi = 'https://traveller-in-blog.firebaseio.com/lists.json'
import axios from 'axios'
export default {
  state: {
    // 댓글 등록시 필요한 데이터
    view_reply_data: {
      date: '',
      id: '',
      name: '',
      user_uid: '',
      reply_text: '댓글을 작성해주세요'
    },
    // 삭제 여부 확인을 위한 값
    show_delete_post: false,
    // 댓글을 수정할 수 있는 상태로 만들기 위한 값
    reply_editable: {
      state: false,
      index: null
    },
    // 수정을 눌렀을 때 저장/취소 버튼이 보이도록 하는 값
    show_edit_reply: false,
    // 댓글 수정 취소시에 원래의 댓글을 넣어주기 위해 값을 저장
    original_reply_text: '',
    // 수정된 댓들을 저장
    edited_reply_text: ''
  },
  getters: {
    viewReplyData (state) {
      return state.view_reply_data
    },
    showDeletePost (state) {
      return state.show_delete_post
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
    askDeletePost (state, payload) {
      // 댓글 삭제 여부 확인 창 열기
      state.show_delete_post = true
    },
    closeDeletePost (state) {
      // 댓글 삭제 여부 확인 창 닫음
      state.show_delete_post = false
      console.log(state.show_delete_post)
    },
    changeEditReply (state, payload) {
      // 저장버튼 보이게하고 리플 텍스트 editable 상태를 변경
      state.show_edit_reply = !state.show_edit_reply
      state.reply_editable.state = !state.reply_editable.state
      // 해당 요소만 저장 할 수 있도록 하기 위해 index 값이 필요
      state.reply_editable.index = payload.index
      if (payload.replyText) {
        state.original_reply_text = payload.replyText
      }
    },
    editReplyText (state, replyText) {
      // 리플 텍스트의 input 이벤트, state에서 reply 값을 변경한다.
      state.edited_reply_text = event.target.textContent
    },
    scrollViewPostion (state, position) {
      switch (position) {
        case 'top':
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
          break
        case 'bottom':
          window.scrollTo({top: document.body.scrollHeight, left: 0, behavior: 'smooth'})
          break
      }
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
      // 서버와 통신 reply 값을 변경
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
