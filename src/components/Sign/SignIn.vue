<template lang="pug">
  .sign-in 
    h1 트레블러 시작하기
    p
      span 복잡한 절차 없이 SNS 계정으로
      span 로그인을 간편하게 트레블러를 만나보세요!
    button.google-sign-in(href="#" type="button" @click="signUpAndSignIN({'type': 'in', 'provider': 'google'})") Google계정으로 로그인하기 
    button.facebook-sign-in(href="#" type="button" @click="signUpAndSignIN({'type': 'in', 'provider': 'facebook'})") FaceBook 계정으로 로그인하기
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

<style lang="scss" scoped>
  @import '../../sass/App.scss';
  *{
    box-sizing: border-box;
  }
  .sign-in{
    h1 {
      width: 80%;
      margin: 100px auto 20px auto;
      text-align: center;
      color: $color1;
      font-weight: bold;
      font-size: 36px;
      line-height: 1.2em;
    }
    p {
      width: 80%;
      margin: 0 auto 20px auto;
      text-align: center;
      color: #b0b0b0;
      font-weight: bold;
      font-size: 16px;
      line-height: 1.2em;
      span {
        display: block;
      }
       :first-of-type(span) {
        margin-bottom: 10px;
      }
    }
    strong {
      display: block;
      width: 80%;
      margin: 20px auto 20px auto;
      text-align: center;
      color: #b0b0b0;
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2em;
    }
    button {
      height: 50px;
      line-height: 50px;
      background: #fff;
    }
    .google-sign-in{
      display: block;
      width: 80%;
      margin: 0 auto 20px auto;
      color: #ea4335;
      border: 1px solid #ea4335;
      border-radius: 50px;
    }
    .facebook-sign-in{
      display: none;
      width: 80%;
      margin: 0 auto;
      color: #4c72b6;
      border: 1px solid #4c72b6;
    }
    .sign-up {
      display: block;
      width: auto;
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      margin: 0 auto;
      color: #fff;
      border: 0 none ;
      background: $color1;
    }
  }
</style>
