<template lang="pug">
  header.grid
    h1.logo.col.col-d-1.col-d-push-1.col-t-1.col-t-push-1.col-m-1.col-m-push-1
      router-link(to="/" tag="a") 
        a(href) Traveler
    .col.col-d-1.col-d-pull-1.col-t-1.col-t-pull-1.col-m-1.col-m-pull-1
      button.btn-nav.clearfix(type="button")
        span.a11y-hidden 메뉴
    .col.col-d-8.col-t-4.col-m-1
      .search
        form#search-form(role="search")
          fieldset 
            legend.a11y-hidden 검색 폼
            button.btn-open-search(type="button") 검색어를 입력하세요
            .search-area
              input#search-keyword(type="search" aria-label="검색어 입력상자" required placeholder="검색어를 입력하세요")
              button.btn-search(type="submit") 검색어를 입력하세요
    .log.col.col-d-2.col-t-2.col-m-1
      button.btn-start(type="button") 시작하기
</template>

<script>
import Navigation from './Navigation.vue'
export default {
  components: {
    Navigation
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/App.scss';
.a11y-hidden{
  @extend %readable-hidden;    
}
header{
  position: fixed;
  top: 0;
  width: 100vw;
  height: 54px;
  background: #fff;
  box-shadow: 0 5px 5px rgba(#000, 0.3)
}
.logo a{
  display: block;
  margin-top: 17px;
  font-size: 20px;
  font-weight: 700;
  color: #f4430b;
  text-decoration: none;
}
.btn-nav{
  overflow: hidden;
  display: block;
  width: 40px;
  height: 40px;
  margin: 7px 0 0 40px;
  border: 0 none;
  background: #f00;
}
.btn-open-search{
  display: block;
  padding: 5px 10px;
  margin-top: 12px;
  border: 0 none;
  background: #ff0;
  color: #000;
  &::before{
    content: "";
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 10px;
    background: #000;
    vertical-align: bottom;
  }
}
.search-area{
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  width: 100%;
  height: 54px;
  background: #ddd;
  z-index: 100;
}
.log{
  text-align: right;
  .btn-start{
    width: 82px;
    height: 32px;
    margin-top: 11px;
    background: #fff;
    border: 1px solid #f4430b;
    border-radius: 4px;
    line-height: 32px;
    color: #f4430b;
    font-size: 14px;
  }
}
@include mobile{
  .log{
    padding: 0 10px 0 0;
  }
  .btn-nav{
    margin: 7px 0 0 10px;
  }
}
@include tablet{
  .log{
    padding: 0 20px 0 0;
  }
  .btn-nav{
    margin: 7px 0 0 20px;
  }
}
@include desktop{
  .log{
    padding: 0 40px 0 0;
  }
  .btn-nav{
    margin: 7px 0 0 40px;
  }
}
</style>