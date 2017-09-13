<template lang="pug">
  header
    .cover
      .logo_search
        h1.logo
          router-link(to="/" tag="a") 
            a(href) Traveler
        button.btn-nav.icon-hamburger(type="button" @click="onshowModal") 메뉴
        .search
          form#search-form(role="search" v-on:submit.prevent="goTofilterList")
            fieldset 
              legend.a11y-hidden 검색 폼
              label.btn-open-search.icon-search(for="search-keyword" @click="onshowSearch") 
                span 검색어 입력하세요
              .search-area(v-show="showSearch")
                .search-content
                  label.icon-search(for="search-keyword") 검색어 입력하세요
                  input#search-keyword(type="search" aria-label="검색어 입력상자" required placeholder="검색어를 입력하세요" @input="detectEventBinding('name', $event)" :value="search" :keydown.enter.prevent="searchBlogList")
                  router-link(:to="`/list/search?search=${search}`" @click.native="searchBlogList" tag="button" type="button").btn-search-inside 검색하기
                  button.btn-close.icon-delete(type="button" aria-label="닫기" @click="oncloseSearch") 닫기
                .search-background(@click="oncloseSearch")
      .log
         button.btn-start(type="button" @click="showSignModal" v-if="userStatus === 'out'") 시작하기
         button.btn-out(type="button" @click="logout" v-if="userStatus === 'in'") 로그아웃
      Sign(v-show="showSignContainer")
    Navigation(v-show="showNav")
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import Navigation from './Navigation.vue'
  import Sign from './../Sign/Sign.vue'
  export default {
    components: {
      Navigation, Sign
    },
    mounted () {
      this.$store.dispatch('checkUserExist')
      this.$store.commit('getUserUid')
    },
    data () {
      return {
        search: ''
      }
    },
    computed: {
      ...mapGetters(['showNav', 'showSearch', 'closeSearch', 'showSignContainer', 'userStatus'])
    },
    methods: {
      goTofilterList () {
        this.$router.push({name: 'ListView', params: {id: 'search'}, query: {search: this.search}})
        this.$store.commit('closeMeSearch')
        this.$store.commit('setAllBlogList', {'id': this.$route.params.id})
        this.$store.commit('filterSearchList', {'id': this.$route.params.id, 'search': this.$route.query.search})
      },
      onshowModal () {
        this.$store.commit('showMeModal')
        this.$store.commit('showUserName')
      },
      onshowSearch () {
        this.$store.commit('showMeSearch')
        this.search = ''
      },
      oncloseSearch () {
        this.$store.commit('closeMeSearch')
      },
      detectEventBinding (target, e) {
        this.search = e.target.value
      },
      searchBlogList () {
        this.$store.commit('closeMeSearch')
        this.$store.commit('setAllBlogList', {'id': this.$route.params.id})
        this.$store.commit('filterSearchList', {'id': this.$route.params.id, 'search': this.$route.query.search})
      },
      ...mapMutations(['showSignModal', 'logout'])
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/App.scss';
  .a11y-hidden {
    @extend %readable-hidden;
  }
  
  header {
    position: fixed;
    z-index: 10;
    top: 0;
    width: 100%;
    height: 54px;
    background: #fff;
    box-shadow: 0 5px 5px rgba(#000, 0.3)
  }
  
  .cover {
    display: flex;
    justify-content: space-between;
  }

  .logo_search{
    display: flex;
  }

  .logo {
    a {
      display: block;
      margin-top: 17px;
      font-size: 20px;
      font-weight: 700;
      color: $color1;
      text-decoration: none;
    }
  }
  
  .btn-nav {
    order: -1;
    overflow: hidden;
    display: block;
    width: 40px;
    height: 40px;
    margin: 7px 20px 0 20px;
    padding: 0;
    border: 0 none;
    background: none;
    &::before {
      display: block;
      width: 40px;
      height: 35px;
      line-height: 40px;
      font-size: 30px;
      padding-top: 5px;
      text-align: center;
      font-weight: bold;
    }
  }
  
  .btn-open-search {
    display: block;
    padding: 7px 10px 3px;
    margin-top: 12px;
    border: 0 none;
    background: none;
    color: #000;
    &::before {
      float: left;
      display: block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      font-size: 24px;
    }
    span {
      float: left;
      display: block;
      height: 24px;
      @extend %text-ellipsis;
    }
  }
  
  .search-area {
    @include clearfix;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    .search-content{
      width: 100%;
      height: 70px;
      padding-top: 19px;
      padding-bottom: 19px;
      background: #fff;
      box-sizing: border-box;
      box-shadow: 0 5px 5px rgba(#000, 0.3);
      label{
        overflow: hidden;
        float: left;
        display: block;
        width: 32px;
        height: 32px;
        line-height: 32px;
        font-size: 24px;
        &::before {
          display: block;
          width: 32px;
          height: 28px;
          margin-top: 4px;
          line-height: 32px;
          font-size: 32px;
        }
      }
    }
    .search-background{
      height: 80vh;
    }
    input {
      float: left;
      display: block;
      width: 70vw;
      height: 32px;
      line-height: 32px;
      background: #fff;
      border: 0 none;
    }
    .btn-search-inside{
      background: #fff;
      border: 1px solid $color1;
      border-radius: 4px;
      height: 32px;
      line-height: 32px;
      color: $color1;
      font-size: 14px;
    }
    .btn-close {
      float: right;
    }
  }
  
  .log {
    text-align: right;
    .btn-start, .btn-out {
      width: 82px;
      height: 32px;
      margin-top: 11px;
      background: #fff;
      border: 1px solid $color1;
      border-radius: 4px;
      line-height: 32px;
      color: $color1;
      font-size: 14px;
    }
  }
  @include mobile {
    .btn-open-search {
      margin-left: 10px;
    }
    .btn-nav {
      margin: 7px 10px 0 10px;
    }
    .log {
      padding: 0 10px 0 0;
    }
    .search-area {
      label {
        margin-left: 10px;
      }
      input{
        margin-left: 10px;
        width: 43vw;
      }
      .btn-search-inside{
        margin-left: 10px;
      }
      .btn-close {
        margin-right: 10px;
      }
    }
  }
  
  @include tablet {
    .btn-open-search {
      margin-left: 15px;
    }
    .btn-nav {
      margin: 7px 15px 0 15px;
    }
    .log {
      padding: 0 15px 0 0;
    }
    .search-area {
      label {
        margin-left: 15px;
        margin-right: 15px;
      }
      input{
        margin-left: 15px;
      }
      .btn-search-inside{
        margin-left: 15px;
      }
      .btn-close {
        margin-right: 15px;
      }
    }
  }
  
  @include desktop {
    .btn-open-search {
      margin-left: 20px;
    }
    .btn-nav {
      margin: 7px 20px 0 20px;
    }
    .log {
      padding: 0 20px 0 0;
    }
    .search-area {
      label {
        margin-left: 20px;
      }
      input{
        margin-left: 20px;
      }
      .btn-search-inside{
        margin-left: 20px;
      }
      .btn-close {
        margin-right: 20px;
      }
    }
  }
  
  @include breakpoint(0px, 427px) {
    .btn-open-search {
      span {
        max-width: 90px;
      }
    }
  }

  @include breakpoint(0px, 375px) {
    .btn-open-search {
      span {
        width: 1px;
        height: 1px;
        position: absolute;
        z-index: -1;
        left: -999;
        top: -999;
      }
    }
  }
</style>