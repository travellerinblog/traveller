<template lang="pug">
  #app
    img(src="./assets/logo.png")
    router-view.test.col-m-3.col-m-offset-1.col-t-6.col-t-offset-1
    router-view(name="gnb")
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
@import './sass/App';
.test{
  background-color: yellow;
  height: 100px;
 }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
