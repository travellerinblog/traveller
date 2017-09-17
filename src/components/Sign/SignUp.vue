<template lang="pug">
  .sign-up
    h1 트레블러 시작하기
    p
      span 복잡한 절차 없이 SNS 계정으로
      span 간편하게 트레블러를 만나보세요!
    button.google-sign-up(href="#" type="button" @click.prevent="signUpAndSignIN({'type': 'up', 'provider': 'google'})") Google계정으로 시작하기
    button.facebook-sign-up(href="#" type="button" @click.prevent="signUpAndSignIN({'type': 'up', 'provider': 'facebook'})") FaceBook 계정으로 시작하기
    strong(v-show="showSignUpMessage") {{ SignUpMessage }}
    button(v-show="showSignUpMessage" @click.prevent="signViewChange('in')").sign-in 로그인하기
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  export default {
    computed: {
      ...mapGetters(['SignUpMessage', 'showSignUpMessage'])
    },
    methods: {
      ...mapActions(['signUpAndSignIN']),
      ...mapMutations(['signViewChange'])
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/App.scss';
  * {
    box-sizing: border-box;
  }
  
  .sign-up {
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
    strong{
      display: block;
      width: 80%;
      margin: 20px auto 20px auto;
      text-align: center;
      color: #b0b0b0;
      font-weight: bold;
      font-size: 14px;
      line-height: 1.2em;
    }
    .google-sign-up {
      display: block;
      width: 80%;
      height: 50px;
      line-height: 50px;
      margin: 0 auto 10px auto;
      color: #ea4335;
      border: 1px solid #ea4335;
      border-radius: 50px;
      background: #fff;
    }
    
    .facebook-sign-up {
      display: block;
      width: 80%;
      height: 50px;
      line-height: 50px;
      margin: 0 auto;
      color: #4c72b6;
      border: 1px solid #4c72b6;
      border-radius: 50px;
      background: #fff;
    }

    .sign-in {
      display: block;
      width: auto;
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      margin: 0 auto;
      color: $color1;
      border: 1px solid $color1;
      background: #fff;
    }
  }
</style>