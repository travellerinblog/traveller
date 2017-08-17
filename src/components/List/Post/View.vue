<template lang="pug">
  div
    h1 블로그 페이지
    p  제목: {{getBlogViewItem.title}}
    p  작성자: {{getBlogViewItem.name}}

</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getBlogViewItem'])
  }
}
</script>

<style lang="sass">

</style>
