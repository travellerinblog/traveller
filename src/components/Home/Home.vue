<template lang="pug">
 h1 Home.vue
  button(type="button" @click="getDatabase()") click
  router-link(to="sign-up" tag="a") sign up
  router-view
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'home',
  created: function () {
    this.$store.commit('getDatabase')
  },
  methods: {
    ...mapMutations(['getDatabase'])
  }
}
</script>

<style lang="scss">

</style>
