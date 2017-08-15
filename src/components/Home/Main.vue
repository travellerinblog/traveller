<template lang="pug">
  .main.grid
    Visual
    p 가나다라
    p 가나다라
    p 가나다라
    p 가나다라
    p 가나다라
    p 가나다라
</template>

<script>
import Visual from './Visual.vue'

export default {
  name: 'main',
  components: {
    Visual
  }
}
</script>

<style lang="scss">
@import '../../sass/App';
.main{
  padding-top: 56px;
}
</style>
