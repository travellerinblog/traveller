<template lang="pug">
  .main.grid
    Visual
    Country-List
</template>

<script>
import Visual from './Visual.vue'
import CountryList from './CountryList.vue'

export default {
  name: 'main',
  components: {
    Visual, CountryList
  }
}
</script>

<style lang="scss">
@import '../../sass/App';
.main{
  padding-top: 56px;
}
</style>
