<template lang="pug">
  .list-container
    ul.grid
      router-link.blog-list(v-show="defaultList" tag="li" to="/view" v-for="(list, index) in firstData" key="firstData[index].key" @click.native="gotoBlogView(firstData[index].key)" )
        a(href)
            img(:src="list.contents[0]")
            .list-item
              p.title {{ list.title }}
              p.content {{ list.write_date }} | {{ list.country_kr }} | {{ list.name}}
      router-link.blog-list(v-show="!defaultList" tag="li" to="/view" v-for="(list, index) in getFilteredList" key="getFilteredList[index].key" @click.native="gotoBlogView(getFilteredList[index].key)" )
        a(href)
            img(:src="list.contents[0]")
            .list-item
              p.title {{ list.title }}
              p.content {{ list.write_date }} | {{ list.country_kr}} | {{ list.name}}
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  mounted () {
    this.$store.dispatch('setListsData')
  },
  computed: {
    ...mapGetters(['getFilteredList', 'firstData', 'defaultList'])
  },
  methods: {
    ...mapMutations(['gotoBlogView'])
  }
}
</script>

<style lang="scss">
@import '../../sass/App';
.list-container {
  @extend %maxwidth;
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
