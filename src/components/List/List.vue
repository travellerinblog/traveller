<template lang="pug">
  .list-container
    t-header
    h1.list-title 당신의 다음 목적지는 어디인가요?
    ul.list-filter
      li 
        a(href) {{ selectedFilter }}
        ul.new-and-popular-filter
          router-link( :to="{ name: 'ListView', params: { id: $route.params.id }}" tag="li"  @click.native="newListFilter")
            a(href) 최신순
          router-link( :to="{ name: 'ListView', params: { id: $route.params.id }}" tag="li" @click.native="popularListFilter")
            a(href) 인기순
      li 
        a(href) {{ selectedCountryFilter }}
        ul.country-and-city-filter
          router-link( :to="{ name: 'ListView', params: { id: 'all' }}" tag="li" @click.native="setAllBlogList")
            a(href) 나라전체
          li(v-for="(country, index) in getCountryAndCityName" :key="'country' + index")
            a(href) {{country.country}} 
            ul.city-filter
              router-link( :to="{ name: 'ListView', params: { id: country.countryKey }}" tag="li" @click.native="filterCountryList(country.countryKey)")
                a(href) 지역전체
              router-link( :to="{ name: 'ListView', params: { id: citygroup.key }}" tag="li" v-for="(citygroup, index) in country.citygroup" :key="'city' + index" @click.native="filterCityList(citygroup.key)")
                a(href) {{ citygroup.city }}
              hr
    router-view
    .goto-write
      h2 당신의 여행 일지를 트래블러스들에게 자랑하는 공간!
      router-link(:to="{name: 'Write', params: {id: 'wirte'}}") 여행 일지 쓰기
    t-footer
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import THeader from './../Home/THeader.vue'
import TFooter from './../Home/TFooter.vue'
import ListView from './ListView.vue'
export default {
  name: 'list',
  components: {
    THeader, TFooter, ListView
  },
  mounted () {
    this.$store.dispatch('setListsData', this.$route.params.id)
    this.$store.dispatch('setCountryAndCity')
  },
  computed: {
    ...mapGetters(['getFilteredList', 'getCountryAndCityName', 'selectedFilter', 'selectedCountryFilter'])
  },
  methods: {
    setAllBlogList () {
      this.$store.commit('setAllBlogList')
      this.$store.commit('makePageNumber', this.getFilteredList.length)
    },
    ...mapMutations(['gotoBlogView', 'popularListFilter', 'newListFilter', 'filterCountryList', 'filterCityList'])
  }
}
</script>

<style lang="scss">
@import '../../sass/App';
.list-container {
  @extend %maxwidth;
  margin: 55px 0 0 0;
  a {
    text-decoration: none;
  }
  .blog-list{
    display: flex;
    img{
      margin: -5px;
    }
    a {
      position: relative;
      color: inherit;
    }
    .list-item{
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
@include mobile {

}
@include tablet {

}
@include desktop {

}
@include breakpoint(0px, 1199px){

}
</style>
