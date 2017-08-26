<template lang="pug">
  .list-view.grid
    ul.col
      router-link.blog-list(tag="li" :to="{ name: 'View', params: { id: getFilteredList[index].key }}" v-for="(list, index) in getFilteredList" v-if="startShowItme <= index && index < endShowItem" key="getFilteredList[index].key" @click.native="gotoBlogView(getFilteredList[index].key)" )
        a(href)
          figure
            img.list-img(:src="list.contents[0]")
            figcaption.list-item
              p.title {{ list.title }}
              p.content {{ list.write_date }} | {{ list.country_kr}} | {{ list.name}}
  
    .page
      a(href @click.prevent="changePagePosition('first')") 처음페이지
      a(href @click.prevent="changePagePosition('last')") 마지막페이지
      a(href @click.prevent="changePagePosition('prev')") 이전
      a(href @click.prevent="changePagePosition('next')") 다음
      ul.page-number
        li(v-for="(page, index) in pageAmount") 
          a(href @click.prevent="changePageNumber(index + 1)" :class="{'active-page': activePage === index}") {{ page }}     
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'listview',
  mounted () {
    // next Tick을 통해 데이터 갱신후 UI까지 완성되었을 때, callback 함수 실행
    this.$nextTick(function () {
      // 윈도우 사이즈가 변할때 이벤트가 발생하게 연결
      window.addEventListener('resize', this.makePageNumber)
      // 접속했을 때의 윈도우 사이즈를 알아내기 위해 실행.
      this.makePageNumber()
    })
  },
  computed: {
    ...mapGetters(['getFilteredList', 'startShowItme', 'endShowItem', 'pageAmount', 'activePage'])
  },
  methods: {
    makePageNumber () {
      this.$store.commit('makePageNumber', this.getFilteredList.length)
    },
    ...mapMutations(['gotoBlogView', 'changePageNumber', 'changePagePosition'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/App';

  a {
    color: inherit
  }
  .active-page{
    background-color: yellow;
    color: blue;
    font-weight: bold;
  }
</style>
