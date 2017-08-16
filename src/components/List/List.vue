<template lang="pug">
  div
    h1 블로그 리스트 페이지
    ul
      li(v-for="list in getFilteredList")
        p 제목: {{ list.title }}
        p 나라: {{ list.country }}
        p 작성자: {{ list.name }}
        hr
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['getFilteredList'])
  }
}
</script>

<style lang="sass">

</style>
