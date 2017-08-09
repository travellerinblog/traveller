// 회원 탈퇴
export default {
  namespaced: true,
  state: {
    user_id: '',
    user_name: '',
    input_password: '' // 유저 비밀번호 확인을 위한...
  },
  getters: {
    getMemberId (state) {
      return state.user_id
    },
    getUserName (state) {
      return state.user_name
    },
    getPassword (state) {
      return state.input_password
    }
  },
  mutations: {},
  actions: {}
}
