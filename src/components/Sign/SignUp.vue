<template lang="pug">
  .sign-up
    button.google-sign-up(href="#" type="button" @click.prevent="signUpAndSignIN({'type': 'up', 'provider': 'google'})") Google계정으로 시작하기
    button.facebook-sign-up(href="#" type="button") FaceBook 계정으로 시작하기
    p(v-show="showSignUpMessage") {{ SignUpMessage }}
    button(v-show="showSignUpMessage" @click.prevent="signViewChange('in')").sign-in 로그인하기
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  mounted () {
    this.$store.dispatch('getUsersData')
  },
  computed: {
    ...mapGetters(['SignUpMessage', 'showSignUpMessage'])
  },
  methods: {
    ...mapActions(['signUpAndSignIN']),
    ...mapMutations(['signViewChange'])
  }
}
</script>

<style lang="scss">
  .sign-up a{
    display: block;
  }
</style>
