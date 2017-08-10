<template lang="pug">
 h1 Home.vue
  button(type="button" @click="getDatabase()") click
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'home',
  created: function () {
    return this.$store.commit('getDatabase')
  },
  methods: {
    ...mapMutations(['getDatabase'])
  }
}
</script>

<style lang="scss">

</style>
