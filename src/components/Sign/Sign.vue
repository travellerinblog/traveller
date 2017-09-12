<template lang="pug">
  .sign-container
    button(type="button" @click="signViewChange('in')").sign-up 회원 가입 하기
    sign-in(v-show="showSignUp")
    button(type="button" @click="signViewChange('up')").sign-in 로그인 하기
    sign-up(v-show="showSignIn")
</template>

<script>
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'
import {mapGetters, mapMutations} from 'vuex'
export default {
  components: {
    SignIn, SignUp
  },
  computed: {
    ...mapGetters(['showSignUp', 'showSignIn'])
  },
  methods: {
    ...mapMutations(['signViewChange'])
  }
}
</script>

<style lang="scss">

</style>
