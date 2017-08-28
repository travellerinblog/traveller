<template lang="pug">
  div 
    t-main
</template>

<script>
  import TMain from './TMain.vue'

  export default {
    name: 'home',
    components: {
      TMain
    },
    created: function () {
      this.$store.dispatch('getListsFromFireBase')
      this.$store.dispatch('getCountryAndCityFromFireBase')
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/App';
</style>
