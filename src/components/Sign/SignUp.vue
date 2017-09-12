<template lang="pug">
  .sign-up
    h3 회원가입하기
    button.google-sign-up(href="#" type="button" @click="signUpByGoogle()") Google계정으로 가입하기
    button.facebook-sign-up(href="#" type="button") FaceBook 계정으로 가입하기
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
