<template lang="pug">
  div
    t-header
    t-main
    t-footer
</template>

<script>
  import THeader from './THeader.vue'
  import TMain from './TMain.vue'
  import TFooter from './TFooter.vue'

  export default {
    name: 'home',
    components: {
      THeader, TMain, TFooter
    },
    created: function () {
      this.$store.dispatch('getListsFromFireBase')
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/App';
</style>
