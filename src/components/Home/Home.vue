<template lang="pug">
  div
    Header
    Main
    Footer
</template>

<script>
import Header from './Header.vue'
import Main from './Main.vue'
import Footer from './Footer.vue'
import {mapMutations} from 'vuex'

export default {
  name: 'home',
  components: {
    Header, Main, Footer
  },
  created: function () {
    this.$store.commit('getDatabase')
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import '../../sass/App';

</style>
