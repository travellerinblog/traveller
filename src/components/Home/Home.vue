<template lang="pug">
 .home-template
  Visual
</template>

<script>
// import {mapMutations} from 'vuex'
import Visual from './Visual.vue'
export default {
  name: 'home',
  components: {
    Visual
  },
  created: function () {
    this.$store.commit('getDatabase')
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
