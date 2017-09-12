<template lang="pug">
  .sign-in
    h3 로그인 하기
    button.google-sign-up(href="#" type="button" @click="signUpByGoogle()") Google계정으로 로그인하기
    button.facebook-sign-up(href="#" type="button") FaceBook 계정으로 로그인하기
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="sass">

</style>
