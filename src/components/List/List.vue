<template lang="pug">
  .list-container
    h1.list-title 당신의 다음 목적지는 어디인가요?
    ul.list-filter
      li.new-and-popular
        a(href @click.prevent="toggleFilter('filter')") {{ selectedFilter }}
        ul.new-and-popular-filter(v-show="showFilter")
          router-link( :to="{ name: 'ListView', params: { id: $route.params.id }}" tag="li"  @click.native="newListFilter")
            a(href) 최신순
          router-link( :to="{ name: 'ListView', params: { id: $route.params.id }}" tag="li" @click.native="popularListFilter")
            a(href) 인기순
      li.country-and-city
        a(href @click.prevent="toggleFilter('country')") {{ selectedCountryFilter }}
        ul.country-and-city-filter(v-show="showCountry")
          router-link( :to="{ name: 'ListView', params: { id: 'all' }}" tag="li" @click.native="setAllBlogList")
            a(href) 나라전체
          li(v-for="(country, index) in getCountryAndCityName" :key="'country' + index")
            a(href @click.prevent="toggleFilter(country.countryKey)") {{country.country}} 
            ul.city-filter(v-if="selectedCountryKey===country.countryKey" v-show="showCity")
              router-link( :to="{ name: 'ListView', params: { id: country.countryKey }}" tag="li" @click.native="filterCountryList(country.countryKey)")
                a(href) 지역전체
              router-link(:to="{ name: 'ListView', params: { id: citygroup.key }}" tag="li" v-for="(citygroup, index) in country.citygroup" :key="'city' + index" @click.native="filterCityList(citygroup.key)")
                a(href) {{ citygroup.city }}
              hr
    router-view
    .goto-write
      h2 당신의 여행 일지를 트래블러스들에게 자랑하는 공간!
      router-link(:to="{name: 'Write', params: {id: 'wirte'}}") 여행 일지 쓰기
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
    this.$store.commit('setCountryAndCityData', this.$route.params.id)
  },
  computed: {
    ...mapGetters(['getFilteredList', 'getCountryAndCityName', 'selectedFilter', 'selectedCountryFilter', 'showFilter', 'showCountry', 'showCity', 'selectedCountryKey'])
  },
  methods: {
    setAllBlogList () {
      this.$store.commit('setAllBlogList')
      this.$store.commit('makePageNumber', this.getFilteredList.length)
    },
    ...mapMutations(['gotoBlogView', 'popularListFilter', 'newListFilter', 'filterCountryList', 'filterCityList', 'toggleFilter'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/App';
.list-container {
  @extend %maxwidth;
  a {
    text-decoration: none;
  }
  .list-title{
    color: rgb(10,9,8);
  }
}
@include mobile {
  .list-container{
    padding: 56px 0 0 10px;
  }
  .list-title {
    margin: 40px 0 0 0;
  }
  .list-filter{
    margin: 24px 0 0 0;
  }
}
@include tablet {
  .list-container{
    padding: 56px 0 0 15px;
  }
  .list-title{
    margin: 50px 0 0 0;
  }
  .list-filter{
    margin: 32px 0 0 0;
  }
}
@include desktop {
  .list-container{
    padding: 56px 0 0 20px;
  }
  .list-title{
    font-size: 42px;
    margin: 117px 0 0 0;
  }
  .list-filter{
    margin: 64px 0 0 0;
  }
}
@include breakpoint(0px, 1199px){
  .list-title{
    font-size: 20px;
  }
}

</style>
