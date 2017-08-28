<template lang="pug">
  .list-view
    ul.grid
      router-link.blog-list.col.col-d-4.col-t-4(tag="li" :to="{ name: 'View', params: { id: getFilteredList[index].key }}" v-for="(list, index) in getFilteredList" v-if="startShowItem <= index && index < endShowItem" key="getFilteredList[index].key" @click.native="gotoBlogView(getFilteredList[index].key)" )
        a(href)
          figure
            img.list-img(:src="list.contents[0]")
            figcaption.list-item
              p.title {{ list.title }}
              p.content {{ list.write_date }} | {{ list.country_kr}} | {{ list.name}}
                i.icon-next
      p(v-show="listNotFound") 선택한 지역에 대한 정보가 존재하지 않습니다.
    .page
      a.first-page.page-btn(href @click.prevent="changePagePosition('first')") 처음페이지
      a.last-page.page-btn(href @click.prevent="changePagePosition('last')") 마지막페이지
      a.prev-page.page-btn(href @click.prevent="changePagePosition('prev')") 이전
      a.next-page.page-btn(href @click.prevent="changePagePosition('next')") 다음
      ul.page-number
        li(v-for="(page, index) in pageAmount" :class="{'active-page': activePage === index}") 
          a(href @click.prevent="changePageNumber(index + 1)") {{ page }}     
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'listview',
  mounted () {
    // next Tick을 통해 데이터 갱신후 UI까지 완성되었을 때, callback 함수 실행
    this.$nextTick(function () {
      // 윈도우 사이즈가 변할때 이벤트가 발생하게 연결
      window.addEventListener('resize', this.makePageNumber)
      // 접속했을 때의 윈도우 사이즈를 알아내기 위해 실행.
      this.makePageNumber()
    })
  },
  computed: {
    listNotFound () {
      return this.getFilteredList.length === 0
    },
    ...mapGetters(['getFilteredList', 'startShowItem', 'endShowItem', 'pageAmount', 'activePage'])
  },
  methods: {
    makePageNumber () {
      this.$store.commit('makePageNumber', this.getFilteredList.length)
    },
    ...mapMutations(['gotoBlogView', 'changePageNumber', 'changePagePosition'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../sass/App';
  a {
    color: inherit;
    text-decoration: none;
  }
  .blog-list {
    overflow: hidden;
  }
  figure {
    position: relative;
    overflow: hidden;
  }
  img {
    position: relative;
  }
  .list-item {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(10,9,8,0.4);
    .title{
      color: rgb(255,255,255);
      white-space : nowrap;
			overflow : hidden;
			text-overflow : ellipsis;
    }
    .content{
      font-weight: bold;
      color: rgba(255,255,255,0.7);
    }
    .icon-next{
      position: absolute;
      margin-top: 4px;
    }
  }
  .page {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    .page-btn{
      margin: 0 10px 0 0; 
      width: 50px;
      height: 50px;
      border: 1px solid rgba(10,9,8,0.4);
      overflow: hidden;
    }
    .first-page{
      order: 1;
    }
    .prev-page{
      order: 2;
    }
    .page-number{
      order: 3;
      li {
        float: left;
        margin: 0 10px 0 0; 
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: rgba(10,9,8,0.7);
        border: 1px solid rgba(10,9,8,0.4);
      }
      .active-page{
        color: rgb(244, 67, 11);
        border: 1px solid rgb(247, 123, 84);
      }
      a{
        outline: none;
      }
      a::after{
        content: '';
        position: relative;
        top: -50px;
        padding: 25px;
      }
    }
    .next-page{
      order: 4;
    }
    .last-page{
      order: 5;
    }
  }

@include mobile {
  .blog-list{
    padding: 0 0 20px 0;
  }
  figure{
    width: 100%;
    height: 254px;
  }
  img {
    transform: translateX(-10%);
    width: 130%;
    height: auto;
  }
  .list-item{
    padding: 16px;
  }
}
@include tablet {
  figure{
    width: 100%;
    height: 260px;
  }
  .blog-list{
    padding: 0 20px 20px 0;
  }
  img {
    transform: translate(-20%, -10%);
    width: 160%;
    height: auto;
  }
  .list-item{
    padding: 16px 23px 16px 16px;
  }
}
@include desktop {
  .list-view{
    margin: 48px 0 0 0;
  }
  .blog-list{
    padding: 0 20px 20px 0;
  }
  figure {
    width: 100%;
    height: 440px;
  }
  img {
    width: 200%;
    height: auto;
  }
  .list-item {
    padding: 24px;
    height: 90px;
    .title{
      padding-right: 30px;
      font-size: 22px;
    }
    .content{
      margin: 14px 0 0 0;
      font-size: 14px;
    }
    .icon-next{
      right: 70px;
      float:right;
      font-size: 20px;
    }
  }
}
@include breakpoint(0px, 1199px){
  .list-view{
    margin: 40px 0 0 0;
  }
  .list-item {
    height: 76px;
    .title{
      padding-right: 30px;
      font-size: 18px;
    }
    .content{
      margin: 13px 0 0 0;
      font-size: 12px;
    }
    .icon-next{
      right: 70px;
      float: right;
      font-size: 18px;
    }
  }
  .page-number{
    
  }
}
</style>
