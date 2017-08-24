<template lang="pug">
  .list-container
    h1 당신의 다음 목적지는 어디인가요?
    ul.grid
      router-link.blog-list(tag="li" :to="{ name: 'View', params: { id: getFilteredList[index].key }}" v-for="(list, index) in getFilteredList" key="getFilteredList[index].key" @click.native="gotoBlogView(getFilteredList[index].key)" )
        a(href)
            img.list-img(:src="list.contents[0]")
            .list-item
              p.title {{ list.title }}
              p.content {{ list.write_date }} | {{ list.country_kr}} | {{ list.name}}
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  mounted () {
    this.$store.dispatch('setListsData', this.$route.params.id)
  },
  computed: {
    ...mapGetters(['getFilteredList'])
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
