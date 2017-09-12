<template lang="pug">
  .sign-in 
    button.google-sign-up(href="#" type="button" @click="signUpByGoogle('in')") Google계정으로 로그인하기 
    button.facebook-sign-up(href="#" type="button") FaceBook 계정으로 로그인하기
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
    ...mapActions(['signUpByGoogle'])
  }
}
</script>

<style lang="sass">

</style>
