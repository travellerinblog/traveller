<template lang="pug">
  div 
    t-main
</template>

<script>
  let listApi = 'https://traveller-in-blog.firebaseio.com/lists.json'
  import TMain from './TMain.vue'
  import axios from 'axios'
  export default {
    name: 'home',
    components: {
      TMain
    },
    beforeCreate () {
      axios.get(listApi).then((response) => {
        let payload = { 'data': response.data, 'id': null }
        this.$store.dispatch('setListsData', payload).then(response => {
          this.$store.commit('gotoBlogView', this.$route.params.id)
        })
      }).catch(error => console.log(error.message))
    },
    created: function () {
      // this.$store.dispatch('getListsFromFireBase')
      // this.$store.dispatch('getCountryAndCityFromFireBase')
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/App';
</style>
