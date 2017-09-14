const userApi = 'https://traveller-in-blog.firebaseio.com/users.json'
import firebase from './../../firebase'
import axios from 'axios'
export default {
  state: {
    show_sign_container: false,
    show_sign_in: false,
    show_sign_up: false,
    show_sign_up_message: false,
    sign_up_message: '',
    show_sign_in_message: false,
    sign_in_message: '',
    users_data: {},
    signin_user: {},
    user_status: 'out',
    user_name: ''
  },
  getters: {
    showSignContainer (state) {
      return state.show_sign_container
    },
    showSignIn (state) {
      return state.show_sign_in
    },
    showSignUp (state) {
      return state.show_sign_up
    },
    showSignUpMessage (state) {
      return state.show_sign_up_message
    },
    SignUpMessage (state) {
      return state.sign_up_message
    },
    showSignInMessage (state) {
      return state.show_sign_in_message
    },
    SignInMessage (state) {
      return state.sign_in_message
    },
    userStatus (state) {
      return state.user_status
    },
    userName (state) {
      return state.user_name
    }
  },
  mutations: {
    showSignModal (state) {
      state.show_sign_container = !state.show_sign_container
    },
    closeContainer (state) {
      state.show_sign_container = false
      state.show_sign_in = false
      state.show_sign_up = false
    },
    signViewChange (state, payload) {
      switch (payload) {
        case 'in':
          state.show_sign_in = true
          state.show_sign_up = false
          state.show_sign_up_message = false
          state.sign_up_message = ''
          break
        case 'up':
          state.show_sign_up = true
          state.show_sign_in = false
          state.show_sign_in_message = false
          state.sign_in_message = ''
          break
      }
    },
    getUsersData (state, userDB) {
      state.users_data = userDB
    },
    changeUsetStatus (state, status) {
      state.user_status = status
    },
    userDataCheck (state, userInfo) {
      let userDB = state.users_data
      state.signin_user = userInfo
      // userDB의 id 들을 확인해서 같은 값이 있으면 error_msg
      // 로그인 할 경우와 회원 가입할 경우로 나눠서
      if (state.show_sign_up === true) {
        for (let prop in userDB) {
          if (userDB[prop].uid === userInfo.uid) {
            state.show_sign_up_message = true
            state.sign_up_message = userInfo.provider + ' 계정으로 이미 가입된 아이디입니다. 로그인해주세요.'
            return
          }
        }
      }
      if (state.show_sign_in === true) {
        // userDB에 같은 id가 있는지를 check
        let count = 0
        for (let prop in userDB) {
          if (userDB[prop].uid === userInfo.uid) {
            count++
          }
        }
        if (count === 0) {
          state.show_sign_in_message = true
          state.sign_in_message = '가입되지 않은 아이디입니다. 회원가입을 해주세요.'
          return
        }
      }
    },
    logout (state) {
      localStorage.removeItem('user_uid')
      state.user_status = 'out'
    },
    showUserName (state) {
      let user = JSON.parse(localStorage.getItem('user_uid'))
      let userDB = state.users_data
      if (user) {
        for (let prop in userDB) {
          if (userDB[prop]['uid'] === user) {
            state.user_name = userDB[prop]['name'] + '님'
          }
        }
      } else {
        state.user_name = '로그인을 해주세요.'
      }
    }
  },
  actions: {
    signUpAndSignIN (context, payload) {
      let userInfo = {}
      let provider = payload.provider === 'google' ? firebase.googleProvider : firebase.facebookProvider
      firebase.auth().signInWithPopup(provider).then(result => {
        let user = result.user
        userInfo.id = user.email
        userInfo.name = user.displayName
        userInfo.picture = user.photoURL
        userInfo.uid = user.uid
        userInfo.provider = result.additionalUserInfo.providerId
        context.commit('userDataCheck', userInfo)
        switch (payload.type) {
          case 'up':
            if (context.state.show_sign_up_message === false) {
              axios.post(userApi, userInfo).then(result => {
                window.localStorage.setItem('user_uid', JSON.stringify(userInfo.uid))
                axios.get(userApi).then(response => {
                  context.commit('getUsersData', response.data)
                  context.commit('showSignModal')
                  context.commit('changeUsetStatus', 'in')
                })
              })
            }
            break
          case 'in':
            if (context.state.show_sign_in_message === false) {
              window.localStorage.setItem('user_uid', JSON.stringify(userInfo.uid))
              context.commit('showSignModal')
              context.commit('changeUsetStatus', 'in')
            }
            break
        }
      }).catch(function (error) {
        console.log(error.message)
      })
    },
    getUsersData ({commit}) {
      axios.get(userApi).then(response => {
        commit('getUsersData', response.data)
      })
    },
    checkUserExist ({commit}) {
      let user = JSON.parse(localStorage.getItem('user_uid'))
      if (user) {
        commit('changeUsetStatus', 'in')
      }
    }
  }
}
