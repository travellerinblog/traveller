<template lang="pug">
.country-list(:class="getScreenSize")
  .container
    .country-header.grid
      h1.country-title.col.col-m-1.col-t-1.col-d-1 어디로 갈래?
      router-link.country-more.col.col-m-1.col-m-push-2.col-t-1.col-t-push-6.col-d-1.col-d-push-10(to="/list") 더보기 &rarr;
    ul.item-container.grid
      router-link.country-item.col.col-m-3.col-t-6.col-d-6(to="/list" tag="li" v-for="item in getCountryListItems" :key="item.country") 
        a(href) 
          img(:src="item.src" :alt="item.alt") 
          p.country-content.col.col-m-1.col-t-1.col-d-1 {{ item.content }}
          p.country-more.col.col-m-1.col-m-push-3.col-t-1.col-t-push-7.col-d-1.col-d-push-11 &rarr;
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['getCountryListItems', 'getScreenSize'])
  }
}
</script>

<style lang="scss" scoped>
  .country-list{
    margin-top: 64px;
    .country-title{
      font-size: 18px;
      color: rgb(10,9,8);
    }
    .country-more{
      text-align: right;
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
      width: 100%;
      left: 0;
      background-color: rgba(10, 9, 8, 0.4);
    }
    .country-more{
      padding-right: 24px;
      right: 0;
      text-align: right;
    }
  }
  // 사이즈 별로 다른 설정
  .mobile{
    .item-container{
      margin: 8px 0 0 16px;
    }
  }
  .tablet{
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
  }
  .desktop{
    .item-container{
      margin: 25px 0 0 40px;
      height: 480px;
    }
    .col-d-6{
      width: 48%;
    }
    p{
      padding-top: 28px;
      height: 72px;
    }
    .country-content{
      padding-left: 40px;
    }
    .country-more{
      padding-right: 40px;
    }
  }
  // 공통 요소
  a {
    color: inherit;
    text-decoration: none;
  }
</style>