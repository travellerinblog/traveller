<template lang="pug">
  .bloglist
    .bloglist-title
      h1 나 여기 왔다 갔다!
      router-link.more(tag="a" :to="{ name: 'List', params: { id: 'all' }}" @click="setAllBlogList") 더보기
        i.icon-next
    .bloglist-body
      button.btn_prev.icon-up(type="button" @click="clickBtn") 이전
      button.btn_next.icon-down(type="button" @click="clickBtn") 다음
      v-touch(tag="ul" daraggable="true" @swipeleft="listNext" @swiperight="listPrev" :swipe-options="{ direction: 'horizontal'}")
        router-link(@dragstart.native="dragStart" @dragend.native="dragEnd" @click.native="gotoBlogView(list.key)" v-for="(list, index) in get_BlogList" :index="index" :key="index" :to="{ name: 'View', params: { id: list.key }}" tag="li")
          a(href)
            figure
              div
                img(:src="list.contents[0]" :alt="list.title" title="이미지에 대한 상세 설명은 하단 내용 참조")
              figcaption
                strong {{ list.title }}
                span {{ list.write_date }}
                em {{ list.country_kr }} | {{ list.name }}
                  i.icon-next
</template>

<script scoped>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        drag_start_point: null
      }
    },
    computed: {
      ...mapGetters(['get_BlogList'])
    },
    beforeCreate () {
      this.$store.dispatch('ac_BlogList')
    },
    methods: {
      dragStart () {
        this.drag_start_point = event.clientX
      },
      dragEnd () {
        this.drag_start_point > event.clientX ? this.listNext() : this.listPrev()
      },
      clickBtn () {
        let classListString = event.target.classList.value
        if (classListString.indexOf('btn_prev') === 0) {
          return this.listPrev()
        } else if (classListString.indexOf('btn_next') === 0) {
          return this.listNext()
        }
      },
      listNext (event) {
        this.$store.commit('swipeBlogList', 'next')
      },
      listPrev () {
        this.$store.commit('swipeBlogList', 'prev')
      },
      setAllBlogList () {
        this.$store.commit('setAllBlogList')
      },
      gotoBlogView (key) {
        this.$store.commit('gotoBlogView', key)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/App';
  .bloglist {
    margin-top: 20px;
    @extend %maxwidth;
  }
  
  .bloglist-title {
    @include clearfix;
    h1 {
      float: left;
      margin-bottom: 8px;
      color: #0a0908;
      font-weight: 700;
    }
    a {
      float: right;
      display: block;
      color: rgba(#000, .5);
      text-decoration: none;
      i {
        vertical-align: -2px;
        margin-left: 8px;
      }
    }
  }
  
  .bloglist-body {
    position: relative;
    margin-bottom: 16px;
    width: 100%;
    overflow: hidden;
    .btn_prev, .btn_next{
      position: absolute;
      top: 50%;
      z-index: 1;
      overflow: hidden;
      width: 32px;
      height: 32px;
      padding: 0;
      background: none;
      border: 0 none;
      // box-shadow: 5px 5px 5px rgba(#ca3a0d, 0.3);
      &::before{
        display: block;
        width: 32px;
        height: 32px;
        line-height: 37px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        text-align: center;
        font-size: 19px;
        color: rgb(244,67,11);
        font-weight: bold;
      }
    }
    .btn_prev{
      &::before{
        transform: rotate(-90deg);
      }
    }
    .btn_next{
      &::before{
        transform: rotate(-90deg);
      }
    }
    ul {
      @include clearfix;
      li {
        box-sizing: border-box;
        float: left;
        a {
          display: block;
        }
        figure {
          position: relative;
          div {
            width: 100%;
            overflow: hidden;
            img {
              height: 100%;
              width: auto;
              user-drag: none; 
              user-select: none;
              -moz-user-select: none;
              -webkit-user-drag: none;
              -webkit-user-select: none;
              -ms-user-select: none;
            }
          }
          figcaption {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 142px;
            box-sizing: border-box;
            padding: 20px;
            background: rgba(#000, .4);
            color: #fff;
            strong {
              @extend %text-ellipsis;
              display: block;
              font-size: 22px;
            }
            span {
              font-size: 16px;
              height: 30px;
              line-height: 30px;
              margin-top: 10px;
            }
            em {
              height: 30px;
              line-height: 30px;
              font-size: 16px;
            }
            i {
              line-height: 30px;
              font-size: 14px;
              vertical-align: -2px;
            }
          }
        }
      }
    }
  }
  
  @include mobile {
    .bloglist-title {
      padding: 0 10px;
      height: 42px;
      line-height: 42px;
      h1 {
        font-size: 18px;
        height: 42px;
        line-height: 42px;
      }
      a {
        font-size: 14px;
        i {
          font-size: 12px;
        }
      }
    }
    .bloglist-body {
      height: 254px;
      .btn_prev{
        left: 15px;
      }
      .btn_next{
        right: 15px;
      }
      ul{
        padding: 0 5px;
        li {
          padding: 0 5px;
          width: 100%;
          figure {
            height: 254px;
            div {
              height: 254px;
              img {
                width: 100%;
                height: auto;
              }
            }
            figcaption {
              height: 76px;
              strong {
                font-size: 18px;
                height: 20px;
                line-height: 20px;
              }
              span {
                display: inline-block;
                font-size: 12px;
                height: 16px;
                line-height: 16px;
              }
              em {
                display: inline-block;
                font-size: 12px;
                height: 16px;
                line-height: 16px;
              }
              i {
                margin-left: 40px;
              }
            }
          }
        }
      }  
    }
  }
  
  @include tablet {
    .bloglist-title {
      padding: 0 15px;
      height: 42px;
      line-height: 42px;
      h1 {
        font-size: 18px;
        height: 42px;
        line-height: 42px;
      }
      a {
        font-size: 14px;
        i {
          font-size: 12px;
        }
      }
    }
    .bloglist-body {
      height: 340px;
      .btn_prev{
        left: 20px;
      }
      .btn_next{
        right: 20px;
      }
      ul{
        padding: 0 8px;
        li {
          padding: 0 7px;
          width: 33.3%;
          figure {
            height: 340px;
            div {
              height: 340px;
              img {
                transform: translateX(-25%);
              }
            }
            figcaption {
              height: 116px;
              strong{
                font-size: 18px;
              }
              span {
                display: block;
                font-size: 12px;
                height: 16px;
                line-height: 16px;
              }
              em {
                display: inline-block;
                font-size: 12px;
                height: 16px;
                line-height: 16px;
              }
              i {
                margin-left: 40px;
              }
            }
          }
        }
      }
    }
    
  }
  
  @include desktop {
    .bloglist-title {
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
      h1 {
        font-size: 28px;
        height: 60px;
        line-height: 60px;
      }
      a {
        font-size: 16px;
        i {
          font-size: 14px;
        }
      }
    }
    .bloglist-body {
      height: 680px;
      .btn_prev{
        left: 25px;
      }
      .btn_next{
        right: 25px;
      }
      ul{
        padding: 0 10px;
        li {
          padding: 0 10px;
          width: 25%;
          figure {
            height: 680px;
            div {
              height: 680px;
              img {
                transform: translateX(-50%);
              }
            }
            figcaption {
              height: 142px;
              span {
                display: block;
              }
              em {
                display: inline-block;
              }
              i {
                margin-left: 40px;
              }
            }
          }
        }
      }
    }
  }
</style>