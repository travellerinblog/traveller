<template lang="pug">
  nav
    .gnb
      .gnb-header
        //- button.btn-start(type="button") 시작하기
        h1 {{ userName }} 
        button.btn-start(type="button" @click="startSign" v-if="userStatus === 'out'") 시작하기
        button.btn-close.icon-delete(type="button" aria-label="닫기" @click="oncloseModal") 닫기
      ul
        //- router-link(to="/" tag="li" active-class="current-page" exact) 
        //-   a(href) 어디로 갈래?
        router-link( tag="li" :to="{ name: 'ListView', params: { id: 'all' }}" @click.native="searchBlogList" active-class="current-page" exact) 
          a(href) 나 여기 왔다 갔다.
        //- router-link(to="/" tag="li" active-class="current-page") 
        //-   a(href) 마이페이지
      router-link.btn-write(:to="{name: 'Write', query: {id: userUid}}" tag="button" v-if="userStatus === 'in'") 여행 일지 쓰기
    .nav-background(@click="oncloseModal")
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'showNav', 'userName', 'userStatus', 'userUid'
      ])
    },
    methods: {
      startSign () {
        this.$store.commit('closeMeModal')
        this.$store.commit('showSignModal')
      },
      oncloseModal () {
        this.$store.commit('closeMeModal')
      },
      searchBlogList () {
        this.$store.commit('closeMeModal')
        this.$store.commit('setAllBlogList')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/App.scss';
  .gnb {
    position: fixed;
    z-index: 100;
    height: 100vh;
    background: #fff;
    box-shadow: 0 5px 5px rgba(#181818, 0.3)
  }
  .nav-background{
    position: absolute;
    z-index: 99;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
  }
  .gnb-header {
    @include clearfix;
    height: 56px;
    background: rgba(#181818, .04);
    .btn-start {
      float: left;
      display: block;
      width: 82px;
      height: 32px;
      line-height: 32px;
      margin-top: 11px;
      background: #fff;
      border: 1px solid $color1;
      border-radius: 4px;
      color: $color1;
      font-size: 14px;
      cursor: pointer;
    }
    h1 {
      float: left;
      display: block;
      height: 32px;
      line-height: 32px;
      margin-top: 11px;
      color: $color1;
      font-size: 16px;
      font-weight: 700;
    }
    .btn-close {
      float: right;
      margin-top: 11px;
    }
  }
  
  ul {
    margin-top: 25px;
    li {
      a {
        display: block;
        padding: 20px 0;
        font-size: 20px;
        text-decoration: none;
        color: #181818;
        &:hover {
          color: $color1;
        }
      }
    }
  }
  
  .btn-write {
    display: block;
    width: 133px;
    height: 36px;
    padding: 0;
    margin-top: 11px;
    background: #fff;
    border: 1px solid #181818;
    border-radius: 4px;
    line-height: 36px;
    color: #181818;
    font-size: 16px;
    cursor: pointer;
  }
  
  @include mobile {
    .gnb {
      width: 100%;
    }
    .btn-start,
    ul,
    .btn-write,
    h1 {
      margin-left: 10px;
    }
    ul {
      margin-right: 10px;
    }
    .btn-close {
      margin-right: 10px;
    }
  }
  
  @include tablet {
    .gnb {
      width: 330px;
    }
    .btn-start,
    ul,
    .btn-write,
    h1 {
      margin-left: 15px;
    }
    ul {
      margin-right: 15px;
    }
    .btn-close {
      margin-right: 10px;
    }
  }
  
  @include desktop {
    .gnb {
      width: 330px;
    }
    .btn-start,
    ul,
    .btn-write,
    h1 {
      margin-left: 20px;
    }
    ul {
      margin-right: 20px;
    }
    .btn-close {
      margin-right: 10px;
    }
  }
</style>
