<template lang="pug">
  div
    Header-Component
    Main-Component
    Footer-Component
</template>

<script>
import HeaderComponent from './Header.vue'
import MainComponent from './Main.vue'
import FooterComponent from './Footer.vue'
// import {mapMutations} from 'vuex'

export default {
  name: 'home',
  components: {
    HeaderComponent, MainComponent, FooterComponent
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
