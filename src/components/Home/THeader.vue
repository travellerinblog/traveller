<template lang="pug">
  header.grid
    div.col.col-d-10.col-t-6.col-m-3.cover
      h1.logo
        router-link(to="/" tag="a") 
          a(href) Traveler
      button.btn-nav(type="button" @click="onshowModal") 메뉴
      .search
        form#search-form(role="search")
          fieldset 
            legend.a11y-hidden 검색 폼
            button.btn-open-search.icon-search24(type="button" @click="onshowSearch") 검색어를 입력하세요
            .search-area.col.col-d-12.col-t8.col-m-4(v-show="showSearch")
              label.icon-search24.btn-search(for="search-keyword") 검색어 입력하세요
              input#search-keyword(type="search" aria-label="검색어 입력상자" required placeholder="검색어를 입력하세요")
              button.btn-close.icon-delete(type="button" aria-label="닫기" @click="oncloseSearch") 닫기
    .log.col.col-d-2.col-t-2.col-m-1
      button.btn-start(type="button") 시작하기
    Navigation(v-show="showNav")
</template>

<script>
import {mapGetters} from 'vuex'
import Navigation from './Navigation.vue'
export default {
  components: {
    Navigation
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'showNav',
      'showSearch',
      'closeSearch'
    ])
  },
  methods: {
    onshowModal () {
      this.$store.commit('showMeModal')
    },
    onshowSearch () {
      this.$store.commit('showMeSearch')
    },
    oncloseSearch () {
      this.$store.commit('closeMeSearch')
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
  z-index: 10;
  top: 0;
  width: 100%;
  height: 54px;
  background: #fff;
  box-shadow: 0 5px 5px rgba(#000, 0.3)
}
.cover{
  display: flex;
}
.logo{
  a{
    display: block;
    margin-top: 17px;
    font-size: 20px;
    font-weight: 700;
    color: #f4430b;
    text-decoration: none;
  }
}
.btn-nav{
  order: -1;
  overflow: hidden;
  display: block;
  width: 40px;
  height: 40px;
  margin: 7px 20px 0 20px;
  border: 0 none;
  background: #ff0;
}
.btn-open-search{
  display: block;
  padding: 5px 10px;
  margin-top: 12px;
  border: 0 none;
  background: #fff;
  color: #000;
  &::before{
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    margin-right: 10px;
    vertical-align: bottom;
    font-size: 20px;
  }
}
.search-area{
  @include clearfix;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: 19px 0;
  background: #fff;
  z-index: 10;
  label{
    float: left;
  }
  input{
    float: left;
    display: block;
    height: 32px;
    line-height: 32px;
    background: #fff;
    border: 0 none;
  }
  .btn-close{
    float: right;
  }
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
  .btn-open-search{
    margin-left: 10px;
  }
  .btn-nav{
    margin: 7px 10px 0 10px;
  }
  .log{
    padding: 0 10px 0 0;
  }
  .search-area{
    label{
      margin-left: 10px;
      margin-right: 10px;
    }
    .btn-close{
      margin-right: 10px;
    }
  }
}
@include tablet{
  .btn-open-search{
    margin-left: 15px;
  }
  .btn-nav{
    margin: 7px 15px 0 15px;
  }
  .log{
    padding: 0 15px 0 0;
  }
  .search-area{
    label{
      margin-left: 15px;
      margin-right: 15px;
    }
    .btn-close{
      margin-right: 15px;
    }
  }
}
@include desktop{
  .btn-open-search{
    margin-left: 20px;
  }
  .btn-nav{
    margin: 7px 20px 0 20px;
  }
  .log{
    padding: 0 20px 0 0;
  }
  .search-area{
    label{
      margin-left: 20px;
      margin-right: 20px;
    }
    .btn-close{
      margin-right: 20px;
    }
  }
}

</style>