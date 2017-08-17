<template lang="pug">
  .main.grid
    Visual
    Country-List
    Recommendation
</template>

<script>
import Visual from './Visual.vue'
import CountryList from './CountryList.vue'
import Recommendation from './Recommendation.vue'

export default {
  name: 'main',
  components: {
    Visual, CountryList, Recommendation
  }
}
</script>

<style lang="scss">
@import '../../sass/App';
.main{
  padding-top: 56px;
}
</style>
