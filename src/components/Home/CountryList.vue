<template lang="pug">
.country-list(:class="getScreenSize")
  .country-header.grid
    h1.country-title.col.col-m-2.col-t-2.col-d-2 어디로 갈래?
    router-link.country-more.col.col-m-1.col-m-push-1.col-t-1.col-t-push-5.col-d-2.col-d-push-8(to="/list" @click.native="setAllBlogList") 더보기 &rarr;
  v-touch(tag="ul" daraggable="true" @swipeleft="next" @swiperight="prev" :swipe-options="{ direction: 'horizontal'}").item-container.grid
    router-link.country-item.col.col-m-3.col-t-6.col-d-6(@dragstart.native="dragStart" @dragend.native="dragEnd" @click.native="filterCountryList(item.country)" to="/list" tag="li" v-for="item in getCountryListItems" :key="item.country") 
      a(href)
        img(:src="item.src" :alt="item.alt") 
        p.country-content.col {{ item.content }}
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      drag_start_point: null
    }
  },
  computed: {
    ...mapGetters(['getCountryListItems', 'getScreenSize'])
  },
  methods: {
    dragStart () {
      this.drag_start_point = event.clientX
    },
    dragEnd () {
      this.drag_start_point > event.clientX ? this.next() : this.prev()
    },
    filterCountryList (country) {
      this.$store.commit('filterCountryList', country)
    },
    setAllBlogList () {
      this.$store.commit('setAllBlogList')
    },
    next (event) {
      this.$store.commit('swipeCountryList', 'next')
    },
    prev () {
      this.$store.commit('swipeCountryList', 'prev')
    }
  }
}
</script>

<style lang="scss" scoped>
  .country-list{
    .country-title{
      font-weight: bold;
      font-size: 18px;
      color: rgb(10,9,8);
    }
    .country-more{
      text-align: right;
      color: rgba(10, 9, 8, 0.5);
      font-size: 14px;
    }
  }
  .item-container{
    display: flex;
    height: 254px;
    overflow: hidden;
    .country-item{
      position: relative;
    }
    img{
      height: 100%;
      user-drag: none; 
      user-select: none;
      -moz-user-select: none;
      -webkit-user-drag: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
    p{
      padding-top: 19px;
      position: absolute;
      height: 52px;
      bottom: 0;
      color: #fff;
      box-sizing: border-box;
    }
    .country-content{
      padding-left: 15px;
      width: 200%;
      left: 0;
      background-color: rgba(10, 9, 8, 0.4);
    }
  }
  // 사이즈 별로 다른 설정
  .mobile{
    margin: 32px 0 12px 16px;
    .item-container{
      margin: 8px 0 0 16px;
    }
    .country-more{
      padding-right: 16px;
    }
  }
  .tablet{
    margin: 44px 0 12px 24px;
    .item-container{
      margin: 6px 0 0 24px;
    }
    img{
      position: relative;
      top: -50%;
      height: 200%;
    }
    .country-content{
      padding-left: 24px;
    }
    .country-more{
      padding-right: 27px;
    }
  }
  .mobile, .tablet {
    .country-item:nth-child(2) {
      opacity: 0.4;
      z-index: -1;
    }
  }
  .desktop{
    margin: 64px 0 16px 40px;
    .item-container{
      margin: 25px 0 0 40px;
      height: 480px;
    }
    .col-d-6{
      width: 48%;
    }
    .country-title{
      font-size: 28px;
    }
    .country-item:nth-child(3) {
      opacity: 0.4;
      z-index: -1;
    }
    p{
      padding-top: 28px;
      height: 72px;
      font-size: 24px;
    }
    .country-content{
      padding-left: 40px;
    }
    .country-more{
      padding-right: 40px;
      font-size: 16px;
    }
  }
  // 공통 요소
  a {
    text-decoration: none;
  }
</style>