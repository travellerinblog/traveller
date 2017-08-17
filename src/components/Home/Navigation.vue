<template lang="pug">
  nav.gnb
    .gnb-header
      //- button.btn-start(type="button") 시작하기
      h1 싱숭생숭님
      button.btn-close.icon-delete(type="button" aria-label="닫기" @click="oncloseModal") 닫기
    ul
      router-link(to="/" tag="li" active-class="current-page" exact) 
        a(href) 어디로 갈래?
      router-link(to="/" tag="li" active-class="current-page" exact) 
        a(href) 나 여기 왔다 갔다.
      router-link(to="/" tag="li" active-class="current-page") 
        a(href) 마이페이지
    button.btn-write(type="button") 여행 일지 쓰기
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'showNav'
    ])
  },
  methods: {
    oncloseModal () {
      this.$store.commit('closeMeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/App.scss';
nav.gnb{
  position: fixed;
  z-index: 100;
  height: 100vh;
  background: #fff;
  box-shadow: 0 5px 5px rgba(#000, 0.3)
}
.gnb-header{
  @include clearfix;
  height: 56px;
  background: rgba(244,67,11, .04);
  .btn-start{
    float: left;
    display: block;
    width: 82px;
    height: 32px;
    line-height: 32px;
    margin-top: 11px;
    background: #fff;
    border: 1px solid #f4430b;
    border-radius: 4px;
    color: #f4430b;
    font-size: 14px;
  }
  h1{
    float: left;
    display: block;
    height: 32px;
    line-height: 32px;
    margin-top: 11px;
    color: #f4430b;
    font-size: 16px;
    font-weight: 700;
  }
  .btn-close{
    float: right;
    margin-top: 11px;
  }
}
ul{
  margin-top: 25px;
  li{
    a{
      display: block;
      padding: 20px 0;
      font-size: 20px;
      text-decoration: none;
      color: #000;
      &:hover{
        color: #f4430b;
      }
    }
  }
}
.btn-write{
  display: block;
  width: 133px;
  height: 36px;
  margin-top: 11px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 4px;
  line-height: 36px;
  color: #000;
  font-size: 16px;
}
@include mobile{
  nav.gnb{
    width: 100%;
  }
  .btn-start, ul, .btn-write, h1{
    margin-left: 10px;
  }
  ul{
    margin-right: 10px;
  }
  .btn-close{
    margin-right: 10px;
  }
}
@include tablet{
  nav.gnb{
    width: 330px;
  }
  .btn-start, ul, .btn-write, h1{
    margin-left: 15px;
  }
  ul{
    margin-right: 15px;
  }
  .btn-close{
    margin-right: 10px;
  }
}
@include desktop{
  nav.gnb{
    width: 330px;
  }
  .btn-start, ul, .btn-write, h1{
    margin-left: 20px;
  }
  ul{
    margin-right: 20px;
  }
  .btn-close{
    margin-right: 10px;
  }
}
</style>
