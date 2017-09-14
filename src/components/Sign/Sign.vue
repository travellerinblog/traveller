
<template lang="pug">
div
  .sign-background(@click="closeContainer")
  .sign-container
    .tab-interface
      ul.tab-list(role="tablist")
        li(role="presentation" :class="{'active-tab': showSignUp}")
          a.tab(href @click.prevent="signViewChange('up')" role="tab" :aria-selected="showSignUp").sign-up SNS로 시작하기
        li(role="presentation" :class="{'active-tab': showSignIn}")
          a.tab(href @click.prevent="signViewChange('in')" role="tab" :aria-selected="showSignIn").sign-in 로그인 하기
    sign-up.tab-panel(v-show="showSignUp" role="tabpanel" :aria-expanded="showSignUp")
    sign-in.tab-panel(v-show="showSignIn" role="tabpanel" :aria-expanded="showSignIn")
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
    // mounted () {
    //   this.$store.dispatch('getUsersData')
    // },
    computed: {
      ...mapGetters(['showSignUp', 'showSignIn'])
    },
    methods: {
      ...mapMutations(['signViewChange', 'closeContainer'])
    }
  }
</script>
<style lang="scss" scoped>
  .sign-background{
    background: rgba(#000, 0.5);
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
    margin-top: -250px; 
    width: 400px; 
    height: 500px; 
    background: #fff; 
  }
</style>