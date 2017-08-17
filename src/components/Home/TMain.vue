<template lang="pug">
  main#content.grid
    blog-list
</template>

<script>
import BlogList from './BlogList.vue'
export default {
  components: {
    BlogList
  }
}
</script>

<style lang="scss">
@import '../../sass/App';
main{
  padding: 56px 0 0 0;
  overflow: hidden;
}
@include mobile{
  main{
  }
}
@include tablet{
  main{
  }
}
@include desktop{
  main{
  }
}
</style>
