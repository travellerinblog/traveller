<template lang="pug">
  .sign-up
    h3 회원가입하기
    a.email-sign-up(href="#") Email로 가입하기
    a.google-sign-up(href="#" @click="signUpByGoogle()") Google계정으로 가입하기
    a.facebook-sign-up(href="#") FaceBook 계정으로 가입하기
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations(['signUpByGoogle'])
  }
}
</script>

<style lang="scss">
  .sign-up a{
    display: block;
  }
</style>
