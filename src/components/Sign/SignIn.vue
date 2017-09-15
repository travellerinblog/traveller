<template lang="pug">
  .sign-in 
    button.google-sign-up(href="#" type="button" @click="signUpAndSignIN({'type': 'in', 'provider': 'google'})") Google계정으로 로그인하기 
    button.facebook-sign-up(href="#" type="button" @click="signUpAndSignIN({'type': 'in', 'provider': 'facebook'})") FaceBook 계정으로 로그인하기
    p(v-show="showSignInMessage") {{ SignInMessage }}
    button(v-show="showSignInMessage" @click.prevent="signViewChange('up')").sign-up SNS계정으로 시작하기
</template>

<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['showSignInMessage', 'SignInMessage'])
  },
  methods: {
    ...mapMutations(['signViewChange']),
    ...mapActions(['signUpAndSignIN'])
  }
}
</script>

<style lang="sass">

</style>
