<template lang="pug">
 h1 Home.vue
</template>

<script>
// import {mapMutations} from 'vuex'
export default {
  name: 'home',
  created: function () {
    this.$store.commit('getDatabase')
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
