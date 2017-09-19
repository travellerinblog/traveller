
<template lang="pug">
div
  .sign-background(@click="closeContainer")
  .sign-container
    .tab-interface
      ul.tab-list(role="tablist")
        li(role="presentation" :class="{'active-tab': showSignIn}")
          a.tab(:class="{'active': showSignIn}" href @click.prevent="signViewChange('in')" role="tab" :aria-selected="showSignIn").sign-in 로그인 하기
        li(role="presentation" :class="{'active-tab': showSignUp}")
          a.tab(:class="{'active': showSignUp}" href @click.prevent="signViewChange('up')" role="tab" :aria-selected="showSignUp").sign-up SNS로 시작하기
    sign-in.tab-panel(v-show="showSignIn" role="tabpanel" :aria-expanded="showSignIn")
    sign-up.tab-panel(v-show="showSignUp" role="tabpanel" :aria-expanded="showSignUp")
    button.btn-sign-close(@click="closeContainer") 닫기
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
      ...mapMutations(['signViewChange', 'closeContainer'])
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../sass/App.scss';
  *{
    box-sizing: border-box;
  }
  .sign-background{
    background: rgba(#181818, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }
  .sign-container { 
    position: fixed;
    z-index: 20;
    top: 50%; 
    left: 50%;
    margin-left: -200px;
    transform: translateY(-50%);
    width: 400px; 
    height: auto; 
    padding-bottom: 100px;
    background: #fff;
    box-shadow: 0 5px 5px rgba(#000, 0.3);
    .tab-list{
      @include clearfix;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      li{
        float: left;
        width: 50%;
        a{
          display: block;
          height: 50px;
          line-height: 50px;
          text-align: center;
          text-decoration: none;
          color: #aaa;
          background: rgba(#b0b0b0, .2);
          box-shadow: inset 5px -5px 5px 0 rgba(#b0b0b0, 0.3);
          &:hover{
            color: $color1;
          }
        }
        a.active{
          background: #fff;
          box-shadow: none;
          color: $color1;
        }
      }
    }
    .btn-sign-close{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff; 
      height: 50px;
      line-height: 50px;
      border: 0 none;
      border-top: 1px solid #b0b0b0;
      color: #aaa;
    }
  }
  @include mobile {
    .sign-background{
      display: none;
    }
    .sign-container { 
      position: fixed;
      z-index: 20;
      top: 0; 
      left: 0;
      margin-left: 0; 
      transform: translateY(0%);
      width: 100vw;
      height: 100vh; 
      background: #fff; 
    }
  }
</style>