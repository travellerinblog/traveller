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
      this.$store.commit('getDatabase')
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/App';
</style>
